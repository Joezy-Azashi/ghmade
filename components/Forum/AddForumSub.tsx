import React, { useState, useContext, } from "react";
import { Forum } from "../../lib/endpoints/forum";
import { Store } from "../../contextStore";
import Prompt from "../../components/Prompt";

const AddForumSub = () => {
  const [title, setTitle] = useState("");
  const { dispatch } = useContext(Store);
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
    setShow(false)
  };

  const addSub = async (e) => {
    e.preventDefault()
    try {
      e.stopPropagation()
      const rs: any = await new Forum().createForumSub({
        title: title.toLowerCase(),
      });
      
      if (rs.title.includes("This field may not be blank.")) {         
        return;
      }
      if (rs.title.includes("category with this title already exists.")) {
        callPrompt("Update Subscription", "", "Close", "Forum With this Category Already exists");
        setTitle("")
        return;
      }
      dispatch({
        type: "ADD_TO_FORUM_CATEGORY",
        payload: rs,
      });
      setTitle("");
    }
    catch (error) {
      callPrompt("Add Category", "", "Close", "Sorry, an error occured");
      return;
    }
  };
  return (
    <form
      onSubmit={
        addSub     
      }
      className="col-md-4 mb-5"
    >
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
        className="addcategorybtn mr-3"
        value={title}
        placeholder="Add new forum subscription"
        onChange={(e) => setTitle(e.target.value)}
        onBlur={addSub}
      />
    </form>
  );
};

export default AddForumSub;