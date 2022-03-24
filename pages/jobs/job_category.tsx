import React, { useState, useContext, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import AdminSidebar from "../../components/admin-sidebar";
import Prompt from "../../components/Prompt";
import { Job } from "../../lib/endpoints/job";
import { Store } from "../../contextStore";
import UpdateCategory from "../../components/Job/UpdateCategory";
import AddCategForm from "../../components/Job/AddCategForm";

export default function jobCategory() {
  const [jobCategory, setJobCategory] = useState<any>([]);
  const { state, dispatch } = useContext(Store);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [show, setShow] = useState(false);
  const [editCat, setEditCat] = useState(null);

    //Get Job Categories
    useEffect(() => {
      const getCateg = async () => {
        try{
        const rs = await new Job().getJobCategoryForStaff();
        setJobCategory(rs.results);
  
        if (getCateg) {
          dispatch({
            type: "UPDATE_JOB_CATEGORY",
            payload: rs.results,
          });
        }
      }
      catch(error){
        callPrompt("Job Category", "", "Okay", "Sorry, an error occured");
      }
      };
      getCateg();
    }, []);

  const findItem = id => {
    const item = jobCategory.find(cat => cat.key === id)

    setEditCat(item);
  }

  const editCateg = (title, id) => {
    const newCateg = jobCategory.map(cat => (cat.id === id ? {title, id}: cat))

    setJobCategory(newCateg);
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
      const removeCateg = await new Job().deleteJobCategory(id);
      let jobCateg = state.jobCateg;

      jobCateg.splice(
        jobCateg.findIndex((item) => item.key === id),
        1
      );

      if (removeCateg) {
        dispatch({
          type: "UPDATE_JOB_CATEGORY",
          payload: jobCateg,
        });
        callPrompt("Success", "", "Okay", "Successfully Deleted Category");
      }
    } catch (error) {
      callPrompt("Delete Category", "", "Okay", "Sorry, an error occured");
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
            Job Category
          </h1>
        </div>

        <div className="row">
          {jobCategory.map((category) => {
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
          {editCat ? 
          <UpdateCategory editCat={editCat} setEditCat={setEditCat} editCateg={editCateg} data={jobCategory}/>
        : <AddCategForm />}
          
        </div>
      </div>
    </MainLayout>
  );
}