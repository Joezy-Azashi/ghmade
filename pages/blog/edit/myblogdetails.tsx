import React from 'react'
import MainLayout from '../../../components/MainLayout'

function blogdetails() {
    return (
        <>
         <MainLayout title=" Blog Page">
            
            <div>
            
                <div className="row justify-content-between">
                    <div className="page-header">
                        <h1 className="page-title">Akfan Business Conference</h1>
                    </div>
                    <div className="">
                    <button
                        className="btn btn-primary btn-block editmyblog_btn mb-1"
                        id="blog_edit_btn"
                    >
                      Edit
                    </button>
                    </div>
                </div>

                <div className="mb-5 mr-3">
                <img src="/assets/images/jobsBannerr.jpg" alt=""/>
              </div>

              <div className="card job-detail-card pt-1 mb-5 ">
                    <div className="row mt-2 ml-3 d-flex">
                        <img src= "/assets/images/Profile_Icon.png" className="ml-3 business-image-partnershipDetail" alt=""/>
                            <div className="ml-4 mt-3 ">
                                    Amalitech Job Fair 
                            </div>
                    </div>
                    <div className="row ml-6">
                <div className="ml-3">
                  <h6 className="fe fe-map-pin ml-6">
                    <span className="ml-2 capitalize-text">
                      Anaji
                    </span>
                  </h6>
                </div>

                <div className="">
                  <h6 className="fe fe-clock ml-5">
                    <span className="ml-2 capitalize-text">
                      a minute ago
                    </span>
                  </h6>
                </div>

                </div>
                </div>
            

            <div className="card job-detail-card2">
              <div className="row ml-5 mr-5 pt-1">
                <div className="col-md-12 jobdetailtext">Business Details</div>
                <div className="col-md-4">
                    <div className="jobdetailheader">Email</div>
                        jobs.amalitech@amalitech.com
                    </div>
                <div className="col-md-4">
                  <div className="jobdetailheader">Phone</div>
                    <div>
                      0245344543
                    </div>
                </div>
                </div>
            </div>

            <div className="card job-detail-big-card d-flex justify-content-end pt-1 pb-1 pl-5 pr-5 ">
              <div className="jobDescrition-jobDetailsc col-md-12 mt-3 mb-3">
                <div className="mb-3 jobdescriptionheader jobdetailtext">
                  Description
                </div>

                <div>
                    <p className="jobdescriptiontext">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem eius voluptates assumenda asperiores. Iste enim doloribus incidunt ipsa velit excepturi ab nobis nemo eaque? Accusamus distinctio possimus quisquam ratione doloribus, nostrum vitae aperiam numquam nemo ad facilis, necessitatibus quibusdam natus in sequi! Sequi quibusdam reprehenderit, dolor ratione fuga facilis quo.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem eius voluptates assumenda asperiores. Iste enim doloribus incidunt ipsa velit excepturi ab nobis nemo eaque? Accusamus distinctio possimus quisquam ratione doloribus, nostrum vitae aperiam numquam nemo ad facilis, necessitatibus quibusdam natus in sequi! Sequi quibusdam reprehenderit, dolor ratione fuga facilis quo.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem eius voluptates assumenda asperiores. Iste enim doloribus incidunt ipsa velit excepturi ab nobis nemo eaque? Accusamus distinctio possimus quisquam ratione doloribus, nostrum vitae aperiam numquam nemo ad facilis, necessitatibus quibusdam natus in sequi! Sequi quibusdam reprehenderit, dolor ratione fuga facilis quo.
                    </p>
                </div>
              </div>
            </div>


            </div>
         
         </MainLayout>  
        </>
    )
}

export default blogdetails
