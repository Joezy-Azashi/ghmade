import React, { useState, useEffect, useContext } from "react";
import ForumComment from "./ForumComment";
import AddForumCommentForm from "../../components/Forum/AddForumCommentForm";
import ShowMoreText from "react-show-more-text";
import { Forum } from "../../lib/endpoints/forum";
import moment from "moment";
import { Store } from "../../contextStore";
import { useRouter } from "next/router";
import ConfirmPrompt from "../../components/ConfirmPrompt";
import { Users } from "../../lib/endpoints/users";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import UpdateForumComment from "./UpdateForumComment";
import { Console } from "console";

function ForumPost({
  post,
  showBtns,
  setAllPosts,
  posts,
  setCurrentPost,
  setEdit,
}) {
  const [postComments, setPostComments] = useState<any>(post.comments)
  const [isLoggedin, setIsloggedin] = useState<boolean>();
  const [profile, setProfile] = useState();
  const [cpa, setCpa] = useState(false);
  const [thumpsupColor, setThumbsUpColor] = useState("#3f3d56");
  const [thumpsdownColor, setThumbsDownColor] = useState("red");
  const [editComment, setEditComment] = useState(null);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [link_text_alt, setLinkTextAlt] = useState("");
  const [show, setShow] = useState(false);
  const { state, dispatch } = useContext(Store);
  const [profileData, setProfileData] = useState<any>({});
  const [profileBusData, setProfileBusData] = useState<any>({});
  const [commentCount, setCommentCount] = useState(post.comment_count);

  const callPrompt = (
    title: string,
    link: string,
    link_text: string,
    link_text_alt: string,
    message: string
  ) => {
    setShow(true);
    setPromptTitle(title);
    setLinkText(link_text);
    setLinkTextAlt(link_text_alt);
    setLinkTo(link);
    setPromptBody(message);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (post.user_vote == true) {
      setThumbsUpColor("#1B98E0");
      setThumbsDownColor("red");
    } else if (post.user_vote == false) {
      setThumbsDownColor("red");
      setThumbsUpColor("#68667A");
    } else {
      setThumbsDownColor("");
      setThumbsUpColor("");
    }
  }, []);

  useEffect(() => {
    (async () => {
      let tempprofile = JSON.parse(window.localStorage.getItem("cp-a")).user
      if (tempprofile.is_organization === false) {
        const rs = await new Users().getUserProfile();
        setProfileData(rs);        
      } else if (tempprofile.is_organization === true) {
        const rs = await new Users().getBusinessProfile();
        setProfileBusData(rs);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const results1 = await new Users().getBusinessProfile();
  //     console.log("Bus Profile", results1);
  //     setProfileBusData(results1);
  //     window.localStorage.setItem("user-profile", JSON.stringify(results1));
  //   })();
  // }, []);

  //Check whether user is logged in
  useEffect(() => {
    let uprofile = window.localStorage.getItem("cp-a");
    if (uprofile) {
      setCpa(true);
    }

    let key = window.localStorage.getItem("cart_id");
    //setJobid(key);
    let userprofile: any = JSON.parse(
      window.localStorage.getItem("user-profile")
    );
    setProfile(userprofile);
    let lStorage: any = window.localStorage.getItem("cp-a");
    lStorage = JSON.parse(lStorage);
    if (lStorage) {
      setIsloggedin(true);
    } else {
      setIsloggedin(false);
    }
  }, []);

  const confirmDeletePost = async () => {
    callPrompt(
      "Forum Post",
      "",
      "Yes",
      "No",
      "Are you sure you want to delete this?"
    );
  };

  const deletePost = async () => {
    setShow(false);
    const result = await new Forum().deleteForumPosts(post.key);
    console.log(result);
    const allposts = posts.filter((item) => item.key != post.key);
    setAllPosts(allposts);
    dispatch({
      type: "UPDATE_FORUM_POSTS",
      payload: allposts,
    });
  };

  const upvote = async () => {
    if (post.user_vote == true) {
      return;
    }
    const posts = state.posts;
    const data = {
      post: post.key,
      is_upvote: true,
    };

    const result = await new Forum().votePost(data);
    if (result.msg) {
      if (post.user_vote == false) {
        post = {
          ...post,
          downvote_count: post.downvote_count > 0 ? post.downvote_count - 1 : 0,
        };
      }
      post = { ...post, upvote_count: post.upvote_count + 1 };
      post = { ...post, user_vote: true };

      let index = posts.findIndex((item) => item.key === post.key);
      if (index !== -1) {
        posts[index] = post;
      }

      dispatch({
        type: "UPDATE_FORUM_POSTS",
        payload: posts,
      });

      setThumbsUpColor("#1B98E0");
      setThumbsDownColor("#68667A");
    }
  };

  const downvote = async () => {
    if (post.user_vote == false) {
      return;
    }

    const posts = state.posts;
    const data = {
      post: post.key,
      is_upvote: false,
    };

    const result = await new Forum().votePost(data);
    if (result.msg) {
      if (post.user_vote == true) {
        post = {
          ...post,
          upvote_count: post.upvote_count > 0 ? post.upvote_count - 1 : 0,
        };
      }

      post = { ...post, downvote_count: post.downvote_count + 1 };
      post = { ...post, user_vote: false };

      let index = posts.findIndex((item) => item.key === post.key);
      if (index !== -1) {
        posts[index] = post;
      }

      dispatch({
        type: "UPDATE_FORUM_POSTS",
        payload: posts,
      });
      setThumbsDownColor("red");
      setThumbsUpColor("#68667A");
    }
  };

  const deleteComment = async (id) => {
    try {
      const deleteForumPost = await new Forum().deleteForumPost(id);
      //let fp = state.forumPost;

      post.comments.splice(
        post.comments.findIndex((item) => item.key === id),
        1
      );

      if (deleteForumPost) {
        dispatch({
          type: "UPDATE_FORUM_COMMENT",
          payload: post.comments,
        });
        setCommentCount(post.comments.length);
      }
    } catch (error) {
      console.log("Error deleting");
      console.log("post", post);
      //callPrompt("Delete Category", "", "Close", "Sorry, an error occured");
    }
  };

  const findItem = (id) => {
    const item = post.comments.find((comment) => comment.key === id);

    setEditComment(item);  
  };

  const setEditModalValues = () => {
    let selcats = [];
    post.categories.map((item) => selcats.push(item.key ? item.key : item));
    const currpost = { ...post, categories: selcats };
    if (currpost) {
      dispatch({
        type: "UPDATE_CURRENT_POST",
        payload: currpost,
      });
      dispatch({
        type: "UPDATE_FORUM_POST_EDIT",
        payload: true,
      });
    }
    setCurrentPost(currpost);
  };

  return (
    <div>
      <ConfirmPrompt
        title={prompt_title}
        linkTo={link_to}
        linkText={link_text}
        linkTextAlt={link_text_alt}
        show={show}
        success={link_to.length > 0 ? true : false}
        handleClose={handleClose}
        handleSuccess={deletePost}
      >
        <p>{prompt_body}</p>
      </ConfirmPrompt>
      <div id="accordion">
        <div className="card viewforum-card">
          <div className="" id="headingOne">
            <div className="mb-0">
              <div className="row mt-3">
                <div className="col-8 d-flex">
                  <div>
                    <img
                      className="avatar avatar-md brround cover-image ml-1"
                      src={
                        post.owner_image
                          ? `${process.env.URL}` + post.owner_image
                          : "/assets/images/Profile_Icon.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="mt-2">
                    <h5 className="ml-2">
                      <strong>
                        {post.owner_name ? post.owner_name : "No name"}
                      </strong>
                    </h5>
                  </div>
                </div>

                {/* test conditional rendering for edit/delete post */}

                {showBtns ? (
                  <div className="col-4 d-flex">
                    <div className="mr-2" onClick={setEditModalValues}>
                      <a data-toggle="modal" data-target="#exampleModalCenter">
                        <h6 className="ml-2 mt-2">
                          <strong>Edit</strong>
                        </h6>
                      </a>
                    </div>
                    <div>
                      <h6 className="mt-2" onClick={confirmDeletePost}>
                        <strong>Delete</strong>
                      </h6>
                    </div>
                  </div>
                ) : (
                  ``
                )}

                {/* test conditional rendering for edit/delete post */}
              </div>

              <div className="row ml-6">
                <div>
                  <span className="ml-4 d-flex fe fe-map-pin mr-4">
                    <h6 className=" text-small ml-2">
                      {post.owner_location
                        ? post.owner_location
                        : "Not Specified"}
                    </h6>
                  </span>
                </div>

                <div>
                  <span className="ml-2 d-flex fe fe-clock">
                    <h6 className=" text-small ml-2">
                      {moment(post.timestamp).format("Do MMM YY, h:mma")}
                    </h6>
                  </span>
                </div>
              </div>

              <div className="row mt-4 forum-post-topic">
                <h5>
                  <strong>{post.title}</strong>
                </h5>
              </div>
              <div className="row mb-2 ml-5 mr-2">
                <ShowMoreText
                  lines={3}
                  less="Read less"
                  more="Read more"
                  expanded={false}
                  width={540}
                >
                  <div className="bulletpoint">
                    {ReactHtmlParser(post.body)}
                  </div>
                </ShowMoreText>
              </div>

              <div className="horizontal-line-top pt-2 pb-2 d-flex">
                {isLoggedin ? (
                  <div onClick={upvote} style={{ color: thumpsupColor }}>
                    <i className="fe fe-thumbs-up ml-2 mr-2 thumbs-up-forum" />
                    <span className="mr-1 upvote-text">Upvote</span>
                    <span className="">{post.upvote_count}</span>
                  </div>
                ) : (
                  ""
                )}

                {/* down vote test */}
                {isLoggedin ? (
                  <div onClick={downvote} style={{ color: thumpsdownColor }}>
                    <i className="fe fe-thumbs-down ml-3 mr-2 thumbs-up-forum" />
                    <span className="mr-1 downvote-text">Downvote</span>
                    <span className="">{post.downvote_count}</span>
                  </div>
                ) : (
                  ""
                )}
                {/* down vote test */}

                <a
                  className="ml-5 "
                  data-toggle="collapse"
                  data-target={`#collapse${post.key}`}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <i className="fe fe-message-square mr-2 message-forum" />
                  <span className="mr-2">Comment</span>
                  <span className="">{commentCount}</span>
                </a>
              </div>

              <div
                id={`collapse${post.key}`}
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                {isLoggedin ? (
                  <div className="row mt-3 mb-3">
                    <div>
                      <img
                        className="avatar avatar-md brround cover-image ml-3 mt-2"
                        src={
                          profileData.image
                            ? profileData.image
                            : profileBusData.image
                            ? profileBusData.image
                            : "/assets/images/Profile_Icon.png"
                        }
                        alt=""
                      />
                    </div>
                    {editComment ? (
                      <UpdateForumComment
                        editComment={editComment}
                        setEditComment={setEditComment}
                        post={post}
                      />
                    ) : (
                      <AddForumCommentForm
                        post={post}
                        setCommentCount={setCommentCount}
                        setPostComments={setPostComments}
                        postComments={postComments}
                      />
                    )}
                    <div className="horizontal-line-top"></div>
                  </div>
                ) : (
                  ``
                )}
              </div>

              <div
                id={`collapse${post.key}`}
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div className="card-body comments-content ml-3">
                  {postComments
                    ? postComments.map((comment: any, index: number) => {
                        return (
                          <ForumComment
                            comment={comment}
                            //setComment={setComment}
                            key={index}
                            deleteComment={deleteComment}
                            findItem={findItem}
                            isLoggedIn={isLoggedin}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumPost;
