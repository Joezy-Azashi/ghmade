import React from 'react';
import MainLayout from '../../components/MainLayout';
import ProductCard from "../../components/ProductCard";
import { Job, Products } from "../../lib/endpoints";
import { Store } from "../../contextStore";
import { useState, useEffect, useContext } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card } from 'reactstrap';
import classnames from 'classnames';
import JobListingCard from '../../components/Job/JobListingCard';
import ScrollToTop from "react-scroll-to-top";
import { PropagateLoader } from 'react-spinners';
import FooterLayout from "../../components/FooterLayout";

function shops (){

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

  const [profileData, setProfileData] = useState<any>([]);
  const [busDetails, setBusDetails] = useState<any>([]);
  const [allproducts, setAllProducts] = useState<any>([]);
  const [jobListing, setJobListing] = useState<any>([]);
  const [isReady, setIsReady] = useState(false);

  const { state } = useContext<any>(Store);

  // endpoints for fetching business products for website
  useEffect(() => {
    ( async () => {
      const productid = window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
        );
        let rs : any = await new Products().getBusinessPageProducts(productid);
        console.log("rs",rs.results);
        setAllProducts(rs.results)
        setIsReady(true);
        
    })();
  }, [])


// endpoints for fetching business jobs for website
  useEffect(() => {
    ( async () => {
      const jobid = window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      );
      let result : any = await new Job().getBusinessPageJob(jobid);
      setJobListing(result.results);
    })();
  }, [])

  // endpoints for fetching business details for website
  useEffect(() => {
    (async () => {
      const busid = window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      );
      let k : any = 0;
      let res : any = await new Products().busDetailsForWebsite(busid);
      console.log("results1", res)
      setBusDetails(res)
     
    })();
  }, [])
    

    return(
      <>
        <MainLayout title="Business Page" pageTitle="">
            <div>
            
          <div className="row mt-5">

            <div className="col-md-3">
                <div className="row justify-content-center">
                <img
                    src={
                      busDetails.image
                        ? busDetails.image
                        : "/assets/images/Profile_Icon.png"
                    }
                    className="defbdraduis"
                    alt=""
                    width={200}
                    height={200}
                  />
                  <div className="username col-md-12" style={{whiteSpace: "normal"}}>
                  <h3><strong>
                  {busDetails.title}
                  </strong></h3>
              </div>
                </div>
              </div>

            {/* business profile information card */}
            <div className="col-md-9">
            <Card className="businesspagecard mb-4">
            <div className="form-group">
                  <label className="bolder">About Us</label>
                    <p>{busDetails.description ? busDetails.description : "Not provided"}</p>
                </div>
            </Card>
            <Card className="businesspagecard mb-4">
            <div className="row">
              <div className="col-lg-4 col-md-4">
              <div className="form-group">
                  <label className="bolder">Email Address</label>
                  <div className="d-flex">
                    <i className="fe fe-mail mt-1 mr-1" />
                    {busDetails.email ? 
                    <a style={{color: "inherit"}} href={`mailto:${busDetails.email}`}>{busDetails.email}</a>
                    : "Not provided"}
                  </div>
                </div>
                <div className="form-group">
                  <label className="bolder mt-2">Phone Number</label>
                  <div className="d-flex">
                    <i className="fe fe-phone mt-1 mr-1" />
                    {busDetails.phone_number ? 
                    <a style={{color: "inherit"}} href={`tel:${busDetails.phone_number}`}>{busDetails.phone_number}</a>
                    : "Not provided"}
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
              <div className="form-group">
                  <label className="bolder">Website</label>
                  <div className="d-flex">
                    <i className="fe fe-globe mt-1 mr-1" />
                    {busDetails.website ? 
                    <a style={{color: "#1b98e0"}} href={`${busDetails.website}`} target="blank">{busDetails.website}</a>
                    : "Not provided"}
                  </div>
                </div>
                <div className="form-group">
                  <label className="bolder mt-2">Town</label>
                  <div className="d-flex">
                    <i className="fe fe-map-pin mt-1 mr-1" />
                    <p>{busDetails.city ? busDetails.city : "Not provided"}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
                <div className="form-group">
                  <label className="bolder">Region</label>
                  <div className="d-flex">
                    <i className="fe fe-map mt-1 mr-1" />
                    {
                        busDetails.region === "vr" ? " Volta Region"
                        : busDetails.region === "wr" ? " Western Region"
                        : busDetails.region === "as" ? " Ashanti Region"
                        : busDetails.region === "ba" ? " Brong Ahafo Region"
                        : busDetails.region === "be" ? " Bong-East Region"
                        : busDetails.region === "ah" ? " Ahafo Region"
                        : busDetails.region === "cr" ? " Central Region"
                        : busDetails.region === "er" ? " Eastern Region"
                        : busDetails.region === "gr" ? " Greater Accra Region"
                        : busDetails.region === "nr" ? " Northern Region"
                        : busDetails.region === "sa" ? " savannah Region"
                        : busDetails.region === "ne" ? " North East Region"
                        : busDetails.region === "ue" ? " Upper East Region"
                        : busDetails.region === "uw" ? " Upper West Region"
                        : busDetails.region === "ot" ? " Oti Region"
                        : busDetails.region === "wn" ? " Western North Region"
                        : "Not provided"
              }
                  </div>
                </div>

                <div className="form-group">
                  <label className="bolder mt-2">Category</label>
                  <div className="d-flex">
                    <i className="fe fe-grid mt-1 mr-1" />
                    {
                      busDetails.category === "AB&M" ? "Administration, Business and Management"
                      : busDetails.category ==="AF&F" ? "Agriculture, Fishing and Forestry"
                      : busDetails.category ==="CI&T" ? "Computing, IT and Telecom"
                      : busDetails.category === "C&S" ? "Consulting and Strategy"
                      : busDetails.category === "DA&C" ? "Design, Arts and Crafts"
                      : busDetails.category === "EDU&T" ? "Education and Training"
                      : busDetails.category === "ENG" ? "Engineering"
                      : busDetails.category === "EES" ? "Entertainment, Events and Sports"
                      : busDetails.category === "F&T" ? "Fashion and Textiles"
                      : busDetails.category === "FS" ? "Financial Services"
                      : busDetails.category === "GA&A" ? "Garage Services, Automotive and Aviation"
                      : busDetails.category === "H&B" ? "Hairdressing and Beauty"
                      : busDetails.category === "HP&S" ? "Health care, Pharmaceuticals and Safety"
                      : busDetails.category === "HC&T" ? "Hospitality, Catering and Tourism"
                      : busDetails.category === "L&C" ? "Legal and Court Services"
                      : busDetails.category === "M&P" ? "Manufacturing and Production"
                      : busDetails.category === "M&C" ? "Media and Communications"
                      : busDetails.category === "MIN" ? "Mining"
                      : busDetails.category === "NN&C" ? "NGO, NPO and Charity"
                      : busDetails.category === "O&G" ? "Oil and Gas"
                      : busDetails.category === "P&P" ? "Print and Publishing"
                      : busDetails.category === "M&A" ? "Marketing and Advertising"
                      : busDetails.category === "RE&PS" ? "Real Estates and Property Services"
                      : busDetails.category === "HR" ? "Recruitment"
                      : busDetails.category === "R&CS" ? "Retail and Customer Services"
                      : busDetails.category === "SU&PS" ? "Security, Uniformed and Protective Services"
                      : busDetails.category === "SW&CS" ? "Social Work and Caring Services"
                      : busDetails.category === "TD&L" ? "Transport, Distribution and Logistics"
                      : "Not provided"
                    }
                  </div>
                </div>
                </div>
            </div>
            </Card>
            </div>
            {/* End of business profile information card */}
            </div>

            <div className="row ml-1 mr-1 mb-4">
              <div className="col-md-12">

                {/* Begining of Nav tabs */}
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => { toggle('1'); }}
                    >
                      Market
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => { toggle('2'); }}
                    >
                      Jobs
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => { toggle('3'); }}
                    >
                      Partnership
                    </NavLink>
                  </NavItem> */}
                </Nav>
                {/* End of Nav tabs */}
                </div>
              </div>

              {/* Beginning of Tab content */}
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                        <div className="row">
                          {isReady && allproducts.length <= 0 ? (
                            <div className="" style={{ margin: "auto", marginTop: "50px" }}>
                              <p id="" className="no-products-found">
                                No product or services posted at the moment.
                              </p>
                              </div>
                            ) : !isReady ? (
                              <div className="" style={{ margin: "auto", marginTop: "50px" }}>
                                <PropagateLoader size={30} color="#1b98e0" loading />
                              </div>
                            ) : null}
                              {allproducts.map((product: any, index: number) => {
                                console.log("product",product)
                             if(product.approval_status === "1")
                           return <ProductCard key={index} product={product} /> 
                          })}
                        </div>
                  </TabPane>

                  <TabPane tabId="2">
                    <div className="row">
                    { jobListing.length <= 0 ? (
                      <div className="" style={{ margin: "50px auto"}}>
                        <p id="no-products" className="no-products-found">
                          No Job(s) posted at the moment
                        </p>
                      </div>
                    ) : null}
                      {jobListing.map((job: any, index: number) => {
                          return <JobListingCard key={index} job={job} />;
                        })}
                    </div>
                  </TabPane>

                  {/* <TabPane tabId="3">
                    <div className="row">
                    { partnerships.length <= 0 ? (
                      <div className="" style={{ margin: "auto", marginTop: "50px" }}>
                        <p id="no-products" className="no-products-found">
                          No Partnership request(s) posted at the moment
                        </p>
                      </div>
                    ) : null}
                      {partnerships.map((item, index) => {
                          return <PartnershipCard
                            key={index}
                            businessName={item.business.title}
                            location={item.business.city}
                            timestamp={item.timestamp}
                            description={item.description}
                            type={item.type}
                            img={item.business.image}
                            id={item.key}
                          />
                        })}
                    </div>
                  </TabPane> */}
                </TabContent>
              {/* End of Tab content */}
            
          </div>
          <ScrollToTop smooth color="#1b98e0" />
        </MainLayout>
        <FooterLayout />
        </>
    )

}

export default shops;