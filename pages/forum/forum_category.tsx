import React, { useState, useContext, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import AdminSidebar from "../../components/admin-sidebar";
import Prompt from "../../components/Prompt";
import { Forum } from "../../lib/endpoints/forum";
import { Store } from "../../contextStore";
import UpdateFormSub from "../../components/Forum/UpdateForumSub";
import AddForumSub from "../../components/Forum/AddForumSub";

export default function forumCategory() {
  const [forumSub, setForumSub] = useState<any>([]);
  const { state, dispatch } = useContext(Store);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [show, setShow] = useState(false);
  const [editForumSub, setEditForumSub] = useState(null);

    //Get Forum Categories
    useEffect(() => {
      const getForumSub = async () => {
        try{
        const rs = await new Forum().getForumCategories();
        setForumSub(rs.results);
  
        if (getForumSub) {
          dispatch({
            type: "UPDATE_FORUM_CATEGORY",
            payload: rs.results,
          });
        }
      }
      catch(error){
        callPrompt("Forum Sub", "", "Okay", "Sorry, an error occured");
      }
      };
      getForumSub();
    }, []);

  const findItem = id => {
    const item = forumSub.find(cat => cat.key === id)

    setEditForumSub(item);
  }

  const editCateg = (title, id) => {
    const newCateg = forumSub.map(cat => (cat.id === id ? {title, id}: cat))

    setForumSub(newCateg);
  }

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

  const trashItem = async (id) => {
    try {
      const removeForumSub = await new Forum().deleteForumSub(id);
      let forumSub = state.forumSub;

      forumSub.splice(
        forumSub.findIndex((item) => item.key === id),
        1
      );

      if (removeForumSub) {
        dispatch({
          type: "UPDATE_FORUM_CATEGORY",
          payload: forumSub,
        });
        callPrompt("Success", "", "Close", "Successfully Deleted Forum Subscription");
      }
    } catch (error) {
      callPrompt("Delete Forum Sub", "", "Close", "Sorry, an error occured");
    }
  };


  return (
    <MainLayout>
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
      <AdminSidebar handleList={() => {}} />
      <div id="main">
        <div className="page-header">
          <h1 className="page-title page-title-userlist" id="page-title">
            Forum Category
          </h1>
        </div>

        <div className="row">
          {forumSub.map((category) => {
            return (
              <div key={category.key} className="col-md-4 mb-5">
                  <div className="categorybtn mr-3 row justify-content-between">
                    <div>
                    <h6 className="categorylabel capitalize-text category-name">
                      {category.title}
                      </h6>
                      </div>
                      <div>
                      <span className="categoryicons">
                        <i
                          onClick={()=>findItem(category.key)}
                          className="fe fe-edit mr-1"
                        />
                        <i
                          onClick={() => trashItem(category.key)}
                          className="fe fe-trash-2"
                        />
                      </span>
                      </div>
                    
                  </div>
              </div>
            );
          })}
          {editForumSub ? 
          <UpdateFormSub editForumSub={editForumSub} setEditForumSub={setEditForumSub} editCateg={editCateg} data={forumSub}/>
        : <AddForumSub />}
          
        </div>
      </div>
    </MainLayout>
  );
}