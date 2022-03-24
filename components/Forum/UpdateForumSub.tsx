import React, { useContext, useState, useEffect } from "react";
import { Forum } from "../../lib/endpoints/forum";
import { Store } from "../../contextStore";
import Prompt from "../../components/Prompt";

const UpdateForumSub = ({ data, editForumSub, setEditForumSub }: any) => {
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
    if (editForumSub !== null){
      setTitle(editForumSub.title)
    } else {
      setTitle("")
    }
  }, [editForumSub]);

  // const updateInfo = (name, value, id) => {
  //   let tempCat = state.data;
  //   let catIndex = findIndex(tempCat, {
  //     data.key : id
  //   })
  //   tempCat[catIndex][name] = value
  //   setData(tempCat)
  // }

  const updateForumSub = async () => {
    try{
    const res = await new Forum().updateForumSubs(editForumSub.key, { title: title });
    console.log("Response", res);
    if (res.title.includes("This field may not be blank.")) {
      callPrompt("Update Form Sub", "", "Close", "The field must not be empty");
      return;
    }
    if (res.key) {
        setEditForumSub(null)
      let forumSub = state.forumSub;
      const index = forumSub.findIndex((item) => item.key === editForumSub.key);
      forumSub[index].title = title;
      //editCateg(editCat.title, editCat.key)
      dispatch({
        type: "UPDATE_FORUM_CATEGORY",
        payload: forumSub,
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
        updateForumSub();
      }}
      onBlur={() => updateForumSub()}
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

export default UpdateForumSub;