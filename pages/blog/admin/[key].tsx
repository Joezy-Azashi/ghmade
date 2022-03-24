import React, { useState, useEffect, useContext } from 'react'
import AdminSidebar from '../../../components/admin-sidebar'
import MainLayout from '../../../components/MainLayout'
import { Jumbotron } from 'reactstrap';
import moment from "moment";
import { Blog } from "../../../lib/endpoints/blog";
import Prompt from "../../../components/Prompt";
import ReactHtmlParser from "react-html-parser";
import ReactPlayer from 'react-player';

function adminblogdetails() {
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [show, setShow] = useState(false);
  const [blogData, setBlogData] = useState<any>({});
  const [pageReady, setPageReady] = useState(false);
  const [pkey, setPkey] = useState('')

  useEffect(() => {
    (async (blogid) => {
      const rs = await new Blog().getDetailedPendingBlog(blogid);
      setPkey(rs.key)
  
      setBlogData(rs);
    })();
  }, []);
  console.log(blogData)
  const approveBlog = async () => {
    let rs = await new Blog().blogApproveDelete({
      pk: pkey,
      string: "1",
    });
    callPrompt("Pending Posts", "/blog/admin/postRequests", "close", "Blog Post approved successfully");

  }

  const rejectBlog = async () => {
    let rs = new Blog().blogApproveDelete({
      pk: pkey,
      string: "2 ",
    });

    callPrompt("Pending Posts", "/blog/admin/postRequests", "close", "Blog Post rejected successfully");
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
    return (
        <>
         <MainLayout title=" Blog Page">
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
         <AdminSidebar handleList={() => { }} />
            <div id="main">
                <div className="page-header row justify-content-between">
                    <div className="blogtitle-admin">
                        <h1 className="page-title">{blogData.title}</h1>
                    </div>
                    <div className="d-flex">
                        <div className="">
                            <button 
                            onClick = {approveBlog}
                             type="submit" 
                             className="btn btn-primary mr-5 approvebtn">
                                Approve
                             </button>
                        </div>
                        <div className="">
                            <button 
                            type="submit"
                            className="btn btn-primary disapprovebtn"
                            onClick = {rejectBlog}
                            >
                                Disapprove
                             </button>
                        </div>
                    </div>
                </div>
                {blogData.media ? (
                <>
                <div className="row">
                  <Jumbotron className="mb-5 mx-auto d-block img-fluid unlock-icon">
                      <img src={blogData.media} alt=""/>
                  </Jumbotron>
                  </div>
                </>
            )
             :
             
             ""
          }
              <div className="card job-detail-card pt-1 mb-5 ">
                    <div className="row mt-2 ml-3 d-flex">
                        <img src= {blogData.business_profile != null ?  blogData.business_profile.image : "/assets/images/Profile_Icon.png" } className="ml-3 business-image-partnershipDetail" alt=""/>
                            <div className="ml-4 mt-2 blogpost-title">
                                { blogData.business_profile != null ? blogData.business_profile.title : "Admin" }
                            </div>
                    </div>
                    <div className="row mt-2">
                <div className="ml-3">
                  <h6 className="fe fe-map-pin ml-6">
                    <span className="ml-2 capitalize-text">
                      {
                       blogData.business_profile != null ? blogData.business_profile.city : "Takoradi"
                      }
                    </span>
                  </h6>
                </div>
                <div className="">
                  <h6 className="fe fe-clock ml-5">
                    <span className="ml-2 capitalize-text">
                    {moment(blogData.created_at).fromNow()}
                    </span>
                  </h6>
                </div>
                </div>
                    </div>
            <div className="card job-detail-card2">
              <div className="row ml-5 mr-5 pt-1">
                <div className="col-md-12 jobdetailtext">Contact Details</div>
                <div className="col-md-4">
                { blogData.email && blogData.phone_number ? (
                    <>
                      <p><a style={{color: "inherit"}} href={`mailto:${blogData.email}`}>
                        {blogData.email}</a></p>
                      <a style={{color: "inherit"}} href={`tel:${blogData.phone_number}`}>
                        {blogData.phone_number}</a>
                    </>
                    
                  )  :
                  blogData.email ? 
                  <a style={{color: "inherit"}} href={`mailto:${blogData.email}`}>{blogData.email}</a>
                  : blogData.phone_number ? 
                  <a style={{color: "inherit"}} href={`tel:${blogData.phone_number}`}>
                    {blogData.phone_number}</a>
                  : "Not Provided" }
                  </div>
                <div className="col-md-4">
                  
                </div>
                </div>
            </div>
            <div className="card job-detail-big-card d-flex justify-content-end pt-1 pb-1 pl-5 pr-5 ">
              <div className="jobDescrition-jobDetailsc col-md-12 mt-3 mb-3">
                <div className="mb-3 jobdescriptionheader jobdetailtext">
                  Description
                </div>
                <div>
                    <p className="jobdescriptiontext bulletpoint">
                    {ReactHtmlParser(blogData.description)}
                    </p>
                </div>

                <div>
                   {blogData.video_url ?
                   <div className="row mx-auto">
                      <ReactPlayer url={blogData.video_url} />
                   </div>
                   : ""}
                </div>

              </div>
            </div>

            </div>
         </MainLayout>  
        </>
    )
}
export default adminblogdetails