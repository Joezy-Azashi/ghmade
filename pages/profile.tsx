import MainLayout from "../components/MainLayout";
import { Users } from "../lib/endpoints";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Store } from "../contextStore";
import { Card } from "react-bootstrap";


const REGIONS = [
  ["as", "Ashanti"],
  ["ba", "Brong Ahafo Region"],
  ["be", "Bono-East Region"],
  ["ah", "Ahafo Region"],
  ["cr", "Central Region"],
  ["er", "Eastern Region"],
  ["gr", "Greater Accra Region"],
  ["nr", "Northern Region"],
  ["sa", "Savannah Region"],
  ["ne", "North East Region"],
  ["ue", "Upper East Region"],
  ["uw", "Upper West Region"],
  ["ot", "Oti Region"],
  ["vr", "Volta Region"],
  ["wr", "Western Region"],
  ["wn", "Western-North Region"],
];

const PRIVACY = [
  ["me", "Me"],
  ["or", "Registered Organisation Only"],
  ["orc", "Registered Organisation and Community members"],
];

export default function Home() {
  const [profileData, setProfileData] = useState<any>({});
  const [isReady, setIsReady] = useState(false);

  const { state } = useContext<any>(Store);

  useEffect(() => {
    
    (async () => {
      const rs = await new Users().getUserProfile();
      window.localStorage.setItem("user-profile", JSON.stringify(rs))
      const rIndex = REGIONS.findIndex((r) => r[0] == rs.region);
      rs.region = rs.region?.length > 0 ? REGIONS[rIndex][1] : "";
      const pIndex = PRIVACY.findIndex((r) => r[0] == rs.privacy_level);
      rs.privacy_level = PRIVACY[pIndex][1];
      setProfileData(rs);
      setIsReady(true);
    })();
  }, []);

  return (
    <>
      <MainLayout>
        <div>
          <div className="row justify-content-between page-title-profile ml-2">
            <h3 className="mt-6 page-title">
              Profile
            </h3>
            <div className="editprofilebtn mt-6 mr-4">
              <Link href="/editprofile">
                <a
                  className="btn btn-primary btn-block editbtn"
                  id="editprofile_button/"
                >
                  Edit Profile
                  </a>
              </Link>
              <br />
            </div>
          </div>

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
              <div className="username col-md-12">
                <h3><strong>
                  {profileData?.name ? profileData.name : ""}
                </strong></h3>
              </div>
            </div>
            <div>
                <h6 className="mt-5 mb-5" style={{lineHeight: "1.5"}}>
                  <span className="mr-2" style={{color: "#1b98e0", fontWeight: "bold"}}>Note:</span>
                  To enjoy a better experience on this platform, please complete your profile</h6>
            </div>
          </div>

          <div className="col-md-9">
          <Card className="profilecard mb-4">
            <div className="row">
              <div className="col-lg-5 col-md-12">
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
                    <p>
                      {profileData?.user
                        ? profileData.user.phone_number
                        : state.phone_number
                      }
                    </p>
                  </div>
                </div>
                <div className="form-group">
                  <label className="bolder" htmlFor="form-label">
                    Date of Birth
                    </label>
                  <div className="d-flex">
                    <i className="fe fe-calendar mt-1 mr-1" />
                      <div className="input-group-date">
                        <p>{
                          profileData?.birthday ? profileData.birthday : ""
                        }
                        </p>
                      </div>
                    
                  </div>
                </div>
                <div className="form-group">
                  <label className="bolder">Privacy Level</label>
                  <div className="d-flex">
                    <i className="fe fe-lock mt-1 mr-1" />
                    <p>{
                      profileData?.privacy_level
                        ? profileData.privacy_level
                        : ""
                    }
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-1"></div>
              <div className="col-lg-5 col-md-12">
                <div className="form-group">
                  <label className="bolder">Gender</label>
                  <div className="d-flex">
                    <i className="fe fe-user mt-1 mr-1" />
                    <p>{
                      profileData?.gender
                        ? profileData.gender === "m"
                          ? "Male"
                          : profileData.gender === "f"
                            ? "Female"
                            : ""
                        : ""
                    }
                    </p>
                  </div>
                </div>
                <div className="form-group">
                  <label className="bolder">Town</label>
                  <div className="d-flex">
                    <i className="fe fe-map-pin mt-1 mr-1" />
                    <p>{
                      profileData?.street_address
                        ? profileData.street_address
                        : ""
                    }
                    </p>
                  </div>
                </div>
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
                  <label className="bolder">Digital Address</label>
                  <div className="d-flex">
                    <i className="fe fe-compass mt-1 mr-1" />
                    <p>{
                      profileData?.gps_location
                        ? profileData.gps_location
                        : ""
                    }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
