import React, { useState, useContext, useEffect } from "react";
import { Forum } from "../../lib/endpoints/forum";
import { Store } from "../../contextStore";
import Prompt from "../../components/Prompt";

export default function AddForumCommentForm({
  post,
  setCommentCount,
  setPostComments,
  postComments,
}) {
  const { state, dispatch } = useContext(Store);
  const [postComment, setPostComment] = useState("");
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [show, setShow] = useState(false);

  const callPrompt = (
    title: string,
    link: string,
    link_text: string,
    message: string
  ) => {
    setShow(true);
    setPromptTitle(title);
    setLinkText(link_text);
    setLinkTo(link);
    setPromptBody(message);
  };

  const handleClose = () => {
    setShow(false);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    const data = {
      parent: post.key,
      body: postComment,
    };
    try {
      const result = await new Forum().createPost(data);
      //setPostComments(comment => [...comment, {...result}]);
      dispatch({
        type: "UPDATE_FORUM_COMMENT",
        payload: post.comments,
      });
      dispatch({
        type: "ADD_FORUM_COMMENT",
        payload: result,
      });
      if (result.body.includes("This field may not be blank.")) {
        return;
      }
      setPostComment("");
      setCommentCount(post.comments.length);
    } catch (error) {
      callPrompt("Add Comment", "", "Close", "Sorry, an error occured");
      return;
    }
  };

  return (
    <form className="ml-3 mt-3 d-flex" onSubmit={submitComment}>
      <Prompt
        title={prompt_title}
        linkTo={link_to}
        linkText={link_text}
        show={show}
        success={link_to.length > 0 ? true : false}
        handleClose={handleClose}
      >
        <p>{prompt_body}</p>
      </Prompt>
      <input
        type="text"
        className="form-control form-rounded comment-input mr-3"
        value={postComment}
        onChange={(e) => setPostComment(e.target.value)}
      />

      <button
        className="btn btn-primary form-control comment-button"
        type="submit"
      >
        Comment
      </button>
      <button
        className="btn btn-primary form-control send-button-icon"
        style={{ height: "40px" }}
      >
        <i className="fe fe-send" />
      </button>
    </form>
  );
}
