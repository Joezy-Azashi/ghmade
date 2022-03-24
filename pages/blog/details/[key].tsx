import { useState, useEffect } from "react";
import MainLayout from "../../../components/MainLayout";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { Blog } from "../../../lib/endpoints/blog";
import { Jumbotron } from "react-bootstrap";
import ReactPlayer from 'react-player';

function BlogDetails() {
  const [blogData, setBlogData] = useState<any>({});
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    (async () => {
    const blogid = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    const res = await new Blog().getBlogDetails(blogid);
    if(res){
      setBlogData(res)
      setPageReady(true)
    }
    else{
      console.error()
    }
  })();
  }, []);

  return (
    <>
      <MainLayout title={blogData.title}>
        {pageReady ? (
          <div className="">
            <div className="page-header col-md-12">
              <h1 className="page-title">{blogData.title}</h1>
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

            
            <div className="row">
                <div className="col-md-6">
                  <div className="card blog-detail-card">
                  <div className="row mt-2 ml-3 d-flex">
                    <img
                      src={blogData.business_profile != null ? blogData.business_profile.image : "/assets/images/Profile_Icon.png"}
                      className="ml-3 business-image-partnershipDetail"
                      alt=""
                    />
                    <div className="ml-4 mt-3">
                      <h6 className="blogbusinessname">{blogData.business_profile != null ? blogData.business_profile.title : "Admin"}</h6>
                      </div>
                  </div>

                  <div className="row justify-content-evenly ml-6">
                    <div className="ml-3">
                      <h6 className="fe fe-map-pin ml-6">
                        <span className="ml-2 capitalize-text">
                        {blogData.business_profile != null ? blogData.business_profile.city: "No Location"}
                        </span>
                      </h6>
                    </div>

                    <div>
                      <h6 className="fe fe-clock ml-5">
                        <span className="ml-2 capitalize-text">
                          {moment(blogData.created_at).fromNow()}
                        </span>
                      </h6>
                    </div>
                  </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card blog-detail-card">
                  <div className=" jobdetailtext mt-3 ml-3">Contact Details</div>
                  <div className="ml-3">
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
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card blog-detail-card">
                  <div className=" jobdetailtext mt-3 ml-3">Expiry Date</div>
                  <div className="ml-3">
                  {blogData.expiry_date ? moment(blogData.expiry_date).format("YYYY-MM-DD")   : "No expiry date" }
                  </div>
                  </div>
                </div>
            </div>

            <div className="card job-detail-big-card d-flex justify-content-end pt-1 pb-1 pl-5 pr-5 ">
              <div className="jobDescrition-jobDetailsc col-md-12 mt-3 mb-3">
                <div className="mb-3 jobdescriptionheader jobdetailtext">
                  Description
                </div>

                  <div className="">
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
        ) : null}
      </MainLayout>
    </>
  );
}

export default BlogDetails;
