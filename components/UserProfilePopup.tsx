import { useRouter } from "next/router";
import { Store } from "../contextStore";


const loggedInPopup = ({ loggedIn, uprofile, title, isReady = false }) => {
const router = useRouter();

  const accessible = (loggedIn, uprofile) => {
    return (
      <div className="dropdown-menu" style={{minWidth: "300px"}}>
        <div className="memberlistdropdown"
        
        >
          <div className="drop-heading">
            <img
              src={
                uprofile.image
                  ? uprofile.image
                  : "/assets/images/Profile_Icon.png"
              }
              className="brround"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <span className="ml-2">{uprofile.name}</span>
          </div>
          <div className="dropdown-divider m-0" />
          <div className="ml-3 mr-3 mt-5 mb-5">
            <p>
              <b>Telephone:</b>
              <span style={{ float: "right" }}>{uprofile.user.phone_number}</span>
            </p>
            <p>
              <b>Email:</b>
              <span style={{ float: "right" }}>{uprofile.user.email}</span>
            </p>
            <p>
              <b>Street Address:</b>
              <span
                style={{
                  float: "right",
                  textAlign: "right",
                }}
              >
                {uprofile.street_address}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const notAccesible = (loggedIn, uprofile, note) => {
    return (
      <div className="dropdown-menu" style={{minWidth: "350px"}}>
        <div className="memberlistdropdown">
          {isReady ? (
            <>
              <div className="drop-heading">
                <img
                  src={
                    uprofile.image
                      ? uprofile.image
                      : "/assets/images/Profile_Icon.png"
                  }
                  className="brround"
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
                <span className="ml-2">{uprofile.name}</span>
              </div>
              <div className="dropdown-divider m-0" />
              <div className="ml-3 mr-3 mt-5 mb-5">
                <p>
                  <b>Note:</b>
                  <span style={{ float: "right" }}>{note}</span>
                </p>
              </div>
            </>
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    );
  };

  //   if(!isReady) return
  if (loggedIn === null) {
    return notAccesible(
      loggedIn,
      uprofile,
      "Please signup for more information"
    );
  }

  if (uprofile.privacy_level === "me") {
    return notAccesible(loggedIn, uprofile, "This profile is set to private.");
  } else if (uprofile.privacy_level === "or") {
    if (loggedIn && loggedIn.user.is_organization === true) {
      return accessible(loggedIn, uprofile);
    } else if (loggedIn && loggedIn.user.is_organization === false) {
      return notAccesible(
        loggedIn,
        uprofile,
        "This user's profile can only be viewed by organizations."
      );
    } else if (!loggedIn) {
      return null
    }
  } else if (uprofile.privacy_level === "orc") {
    return accessible(loggedIn, uprofile);
  } else {
    return notAccesible(
      loggedIn,
      uprofile,
      "Please signup for more information"
    );
  }
};

export default loggedInPopup;
