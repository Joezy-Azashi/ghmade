import MainLayout from "../components/MainLayout";
import { Users } from "../lib/endpoints";
import { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import { Store } from "../contextStore";
import Link from "next/link";
import { REGIONS, CATEGORY } from "../public/assets/js/customData";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function Home() {
  const [profileData, setProfileData] = useState<any>({});
  const [isReady, setIsReady] = useState(false);
  const { state } = useContext<any>(Store);

  useEffect(() => {
    (async () => {
      const rs = await new Users().getBusinessProfile();
      const rIndex = REGIONS.findIndex((r) => r[0] == rs.region);
      rs.region = rs.region?.length > 0 ? REGIONS[rIndex][1] : "";
      const cIndex = CATEGORY.findIndex((r) => r[0] == rs.category);
      rs.category = rs.category?.length > 0 ? CATEGORY[cIndex][1] : "";
      setProfileData(rs);
      setIsReady(true);

      // let upr
      window.localStorage.setItem("user-profile", JSON.stringify(rs));      
    })();
  }, []);

  return (
    <>
      <MainLayout>
        {!isReady ? (
          <h3>Loading...</h3>
        ) : (
          <div>
            {/* page-header */}
            <div className="row justify-content-between page-title-profile ml-2">
                <h3 className="page-title mt-6">Profile</h3>
                <div className="editprofilebtn mt-6 mr-4">
                    <Link href="/editbusinessprofile">
                      <a
                        className="btn btn-primary btn-block editbtn"
                        
                      >
                        Edit Profile
                      </a>
                    </Link>
                  <br />
              </div>
            </div>
            {/* End page-header */}

            
            
          <div className="row">

            <div className="col-md-3">
                <div className="row justify-content-center">
                  <img
                    src={
                      profileData.image
                        ? profileData.image
                        : "/assets/images/Profile_Icon.png"
                    }
                    className="defbdraduis"
                    alt=""
                    width={200}
                    height={200}
                  />
                  <div className="username col-md-12" style={{whiteSpace: "normal"}}>
                  <h3><strong>
                  {profileData.title ? profileData.title : ""}
                  </strong></h3>
              </div>
                </div>
              <div>
                <h6 className="mt-5 mb-5" style={{lineHeight: "1.5"}}>
                  <span className="mr-2" style={{color: "#1B98E0", fontWeight: "bold"}}>Note:</span>
                  To enjoy a better experience on this platform, please complete your profile</h6>
              </div>
              </div>

            <div className="col-md-9">
            <Card className="profilecard mb-4">
            <div className="row">
              <div className="col-lg-4 col-md-4">
              <div className="form-group">
                  <label className="bolder">Email Address</label>
                  <div className="d-flex">
                    <i className="fe fe-mail mt-1 mr-1" />
                    <p >{
                          profileData?.user
                            ? profileData.user.email
                            : state.emailaddress
                        }
                    </p>
                  </div>
                </div>
                <div className="form-group">
                  <label className="bolder">Phone Number</label>
                  <div className="d-flex">
                    <i className="fe fe-phone mt-1 mr-1" />
                    <p >{
                          profileData?.user
                           ? profileData.user.phone_number
                           : state.phone_number
                        }
                    </p>
                  </div>
                </div>
                <div className="form-group">
                  <label className="bolder">Digital Address</label>
                  <div className="d-flex">
                    <i className="fe fe-compass mt-1 mr-1" />
                    <p>{
                          profileData?.location ? profileData.location : "Not provided"
                        }
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
                <div className="form-group">
                    <label className="bolder">Website</label>
                    <div className="d-flex">
                      <i className="fe fe-globe mt-1 mr-1" />
                      <p>{
                            profileData?.website ? <a href={`${profileData.website}`} target="blank" style={{color: "#1b98e0"}}>{profileData.website}</a> : "Not provided"
                          }
                      </p>
                    </div>
                  </div>
                  <div className="form-group">
                  <label className="bolder">Town</label>
                  <div className="d-flex">
                    <i className="fe fe-map-pin mt-1 mr-1" />
                    <p>{profileData?.city ? profileData.city : "Not provided"}</p>
                  </div>
                </div>
                {profileData.title != "" ? 
                <div className="form-group">
                  <label className="bolder">Business Page</label>
                  <div className="d-flex">
                    <i className="fe fe-globe mt-1 mr-1" />
                    <Link href="/shops/[shops]"
                      as={`/shops/${profileData.slug}`}
                    >
                    <p>
                    <a style={{color: "#1b98e0"}} href={"/shops/" + `${profileData.slug}`} target="_blank"> {"ghmade.com/shops/"}{profileData.slug}</a>
                    </p>
                    </Link>
                    <CopyToClipboard text={"ghmade.com/shops/" + `${profileData.slug}`}>
                      <i title="copy link" className="fe fe-copy copybtn ml-3" onClick={() => copy()}/>
                    </CopyToClipboard>
                  </div>
                  <p id="copymsg">
                      Copied <i className="fe fe-check"/>
                    </p>
                </div>
                : null
                }
              </div>

              <div className="col-lg-4 col-md-4">
                <div className="form-group">
                  <label className="bolder">Region</label>
                  <div className="d-flex">
                    <i className="fe fe-map mt-1 mr-1" />
                    <p>{
                          profileData?.region ? profileData.region : ""
                        }
                    </p>
                  </div>
                </div>
                <div className="form-group">
                  <label className="bolder">Category</label>
                  <div className="d-flex">
                    <i className="fe fe-grid mt-1 mr-1" />
                    <p>{
                         profileData?.category ? profileData.category : ""
                        }
                    </p>
                  </div>
                </div>
                <div className="form-group ">
                    
                </div>
                </div>
            </div>
            </Card>
            

            <Card className="profilecard mb-4">
            <div className="form-group">
                  <label className="bolder">Description</label>
                    <p>{
                              profileData?.description
                                ? profileData.description
                                : "Not provided"
                            }
                    </p>
                </div>
            </Card>
            </div>
            </div>
          </div>
        )}
      </MainLayout>
    </>
  );
}


function copy() {
  document.getElementById("copymsg").style.display = "block";
}