import React from "react";
import FooterLayout from "../components/FooterLayout";
import AllPost from "../components/Forum/AllPost";
import MainLayout from "../components/MainLayout";
function Forum() {
  return (
    <>
    <MainLayout title="Community Project" pageTitle="Forum Page">
        <div className="row mt-4">
          <div className="col-md-3">
              <div className="card card-left-partner1">

                    <div className="mb-3">
                    <p className="partnership-all-post">All post</p> 
                    </div>

                    <div className="partnership-header mb-1">
                      <span>Subscriptions</span> 
                    </div>
                    <div>
                      <AllPost/>
                      <AllPost/>
                      <AllPost/>
                      <AllPost/>
                      <AllPost/>
                    </div>

              </div>


              <div className="card card-left-partner2">

                  <div className="partnership-header mb-1">
                      <span>Forum Policy</span> 
                  </div>

                  <div className="">
                    <div>* No Advertisement</div> 
                    <div>* Avoid using Abusive word </div> 
                    <div>* No images/videos allowed </div> 
                    <div>* No profanity</div> 
                  </div>

              </div>
          </div>

          <div className="col-md-6 ">

            <div className="card card-forum">
              <a
                className="nav-link pr-0 leading-none d-flex pt-3"
                data-toggle="dropdown"
                href="#"
              >

          <span
            className="avatar avatar-md brround cover-image"
            style={{ background: `url(/assets/images/Profile_Icon.png) center center`}}
          />

          <span
            className="ml-3"
            style={{ color: "#3f3d56", fontWeight: 700 }}
          >
            User Name 
          </span>
        </a>
        <p className="ml-4">Share your thoughts with us</p>
            </div>
         


          <div className="">
          
          <div id="accordion">
              <div className="card viewforum-card">
                <div className="" id="headingOne">
                  <div className="mb-0">

                <div className="row mt-4 ">
              <div>
                <span>
                  <img
                    className="business-image-partnership ml-4"
                    src="/assets/images/default-add-image.png"
                    alt="Business Logo"
                  />
                </span>
              </div>

              <div className="">
                <span>
                  <h5 className="ml-2 mt-3"><strong>Business Name</strong></h5>
                </span>
              <span className="d-flex">
                  <h6 className="ml-2 text-small">Location</h6>
                  <h6 className="ml-4 text-small">Time Stamp</h6>
              </span>
              </div>
            </div>

            <div className="row mt-4">
              <h5 className="ml-5">
                  <strong>Forum Topic</strong>
              </h5>
          </div>
              <div className="row mb-1">
            <p className="ml-5 mr-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam magni rerum perspiciatis aperiam odio, labore, et doloribus iure ullam ipsa cumque odit unde, voluptates temporibus aliquid culpa ad. Porro, molestias?
            </p>
          </div>
              <div className="horizontal-line d-flex">
                <i className="fe fe-thumbs-up thumbs-up-forum"></i><span className="mt-2">upvote 12</span>
                      <button className="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <i className="fe fe-message-square"></i>
                      </button>
                </div>
          </div>
                  
                </div>
              

                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                  <div className="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                  </div>
                </div>
              </div>
            </div>

            
             
          </div>

        </div>


          <div className="col-md-3">

            <div className="mb-6">
                <input
                  id="searchforum"
                  className="form-control form-rounded"
                  type="text"
                  placeholder="Search..."
                />
            </div>

                <div className="card partnership-mostpopular">

                <div className="partnership-header mb-1">
                      <span>Most Popular Topics</span> 
                  </div>

                  <div className="">
                    <div>Climate Change</div> 
                    <div>Health and Safety</div> 
                    <div>2020 Elections</div> 
                    <div>Women in tech</div> 
                    <div>Effects of deforestation on wildlife</div> 
                    <div>User centered design</div> 
                  </div>

                </div>

                <div className="card partnership-quickLinks">
                    <div className="partnership-header mb-1">
                      <span>Most Popular Topics</span> 
                  </div>

                  <div className="">
                    <div><a href="/termsandconditions">User Agreement</a></div> 
                    <div><a href="/policy">Privacy Policy</a></div> 
                  </div>
                </div>
          </div>
        </div>
    
    </MainLayout>

      <FooterLayout/>

    </>
  );
}

export default Forum;
