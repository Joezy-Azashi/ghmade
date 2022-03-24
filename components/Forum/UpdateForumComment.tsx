import Prompt from "../../components/Prompt";
import React, { useContext, useState, useEffect } from "react";
import { Store } from "../../contextStore";
import { Forum } from "../../lib/endpoints/forum";

function UpdateForumComment({ editComment, setEditComment, post }) {
  const [comment, setComment] = useState(
    post & post.comments ? post.comments.body : []
  );
  const { state, dispatch } = useContext(Store);
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

  useEffect(() => {
    if (editComment !== null) {
      setComment(editComment.body);
    } else {
      setComment("");
    }
  }, [editComment]);

  const handleClose = () => {
    setShow(false);
  };

  const updateComment = async () => {
    try {
      setComment("");
      const res = await new Forum().updateForumPost(editComment.key, {
        body: comment,
      });
      if (res) {
        setEditComment(null);

        const index = post.comments.findIndex(
          (item) => item.key === editComment.key
        );
        post.comments[index].body = comment;

        dispatch({
          type: "UPDATE_FORUM_COMMENT",
          payload: post.comments,
        });
      }
    } catch (error) {
      callPrompt("Update Comment", "", "Close", "Sorry, an error occured");
    }
  };

  return (
    <form className="ml-3 mt-3 d-flex">
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
        name=""
        id=""
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="btn btn-primary form-control comment-button"
        onClick={updateComment}
      >
        Update
      </button>
    </form>
  );
}

export default UpdateForumComment;
