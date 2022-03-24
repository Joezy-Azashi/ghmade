import React, { useContext, useState, useEffect } from "react";
import getConfig from "next/config";
import { Job } from "../../lib/endpoints/job";
import CategoryList from "./CategoryList";
import { Store } from "../../contextStore";
import Prompt from "../../components/Prompt";
import { findIndex } from 'lodash'

const UpdateCategory = ({ data, editCat, setEditCat }: any) => {
  const [doneEdit, setDoneEdit] = useState("");
  const [title, setTitle] = useState(data.title);
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

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (editCat !== null){
      setTitle(editCat.title)
    } else {
      setTitle("")
    }
  }, [editCat]);


  const updateCateg = async () => {
    try{
    const res = await new Job().updateJobCategory(editCat.key, { title: title });
    if (res.title.includes("This field may not be blank.")) {
      callPrompt("Update Category", "", "Close", "The field must not be empty");
      return;
    }
    if (res.key) {
      setEditCat(null)
      let jobCateg = state.jobCateg;

      const index = jobCateg.findIndex((item) => item.key === editCat.key);
      jobCateg[index].title = title;

      //editCateg(editCat.title, editCat.key)

      dispatch({
        type: "UPDATE_JOB_CATEGORY",
        payload: jobCateg,
      });
    }
  } catch(error) {
    callPrompt("Update Category", "", "Close", "Sorry, an error occured");
   
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(),
        updateCateg();
      }}
      onBlur={() => updateCateg()}
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
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

export default UpdateCategory;