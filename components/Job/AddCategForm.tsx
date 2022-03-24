import React, { useState, useContext, } from "react";
import { Job } from "../../lib/endpoints/job";
import { Store } from "../../contextStore";
import Prompt from "../../components/Prompt";

const AddCategForm = () => {
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

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault()
  //     addCat
  //   }
  // }

  const addCat = async (e) => {
    e.preventDefault()
    try {
      e.stopPropagation()
      const rs: any = await new Job().createJobCategory({
        title: title.toLowerCase(),
      });
      
      if (rs.title.includes("This field may not be blank.")) {
         //callPrompt("Add Category", "", "Close", "The field must not be empty");
        return;
      }
      if (rs.title.includes("job category with this title already exists.")) {
        callPrompt("Update Category", "", "Close", "Job With this Category Already exists");
        setTitle("")
        return;
      }
      dispatch({
        type: "ADD_TO_JOB_CATEGORY",
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
        addCat     
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
        placeholder="Add new category"
        onChange={(e) => setTitle(e.target.value)}
        onBlur={addCat}
        // onKeyUp={handleKeyDown}
      />
    </form>
  );
};

export default AddCategForm;