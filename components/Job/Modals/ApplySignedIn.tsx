import React, { FormEvent, useState, useContext, useEffect } from "react";
import { Job } from "../../../lib/endpoints/job";
import { Users } from "../../../lib/endpoints/users";
import { Store } from "../../../contextStore";
import { useRouter } from "next/router";
import Prompt from "../../Prompt";

function ApplySignedIn({ cv, filename, job_id }) {
  const { dispatch } = useContext(Store);
  const [phone, setPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [doneApply, setDoneApply] = useState(false);
  const [cv_id, setcvid] = useState<any>();
  const [profile, setProfile] = useState<any>();
  const [checked, setChecked] = useState();
  const [togglepasswordeye, setTogglePasswordeye] = useState(
    false
  );
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    let uprofile: any = window.localStorage.getItem("cp-a");
    uprofile = JSON.parse(uprofile);
    setProfile(uprofile);
    if (window.localStorage.getItem("cv_id") !== null) {
      let key = window.localStorage.getItem("cv_id");
      setcvid(key);
    }
  }, []);

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

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

  const handleClose = () => {
    if (doneApply) {
      router.push("/jobs");
    }
    setShow(false);
  };

  // const userProfile = (userInfo) => {
  //   window.localStorage.setItem("user-profile", JSON.stringify(userInfo));
  //   dispatch({
  //     type: "SET_USERINFO",
  //     payload: userInfo,
  //   });
  // };

  const addPhoneNumber = async () => {
    if (/^\d{10}$/.test(newPhone)) {
      //phone vaild
    } else {
      callPrompt(
        "Change Email",
        "",
        "Close",
        "Check Phone: Please enter the correct phone number"
      );
      return false;
    }

    if (newPhone.length < 1) {
      callPrompt("Phone Number", "", "Close", "Phone number field can not empty");
      return false;
    }
    if (password.length < 1) {
      callPrompt("Password", "", "Close", "Password field can not empty");
      return false;
    }
    const response = await new Users().changePhone({
      phone_number: newPhone,
      password: password,
    });

    if(Array.isArray(response.phone_number)) {
      callPrompt("Change Phone Number", "", "Close", "User with this phone already exist");
      return false;
    }
  
    if (response.password) {
      // bad credentials
      callPrompt("Change Phone Number", "", "Close", "No active account found with the given credentials.");
      return false;
    }

    return true;

  }

  const applyForJob = async () => {
    let uprof = JSON.parse(window.localStorage.getItem("cp-a"));
    let userInfo;
    
      if (uprof.user.is_staff) {
        userInfo = await new Users().getAdminProfile();
      } else {
        if (uprof.user.is_organization) {
          userInfo = await new Users().getBusinessProfile();
        } else {
          userInfo = await new Users().getUserProfile();
        }
      }

      //userProfile(userInfo);

      try {
        callPrompt("Sending Application", "", "", "Please wait...");
        const rs = await new Job().createJobApplication(cv);
        if (rs.key) {
          setDoneApply(true);
          callPrompt(
            "Job Application",
            "/jobs/viewjobsandapply",
            "close",
            "Your application has been successfully sent.The business will contact you via email/phone number if you qualify."
          );
        } else if (rs.non_field_errors.includes("The fields job, user must make a unique set.")){
          callPrompt(
            "Job Application",
            "/jobs/viewjobsandapply",
            "close",
            "You've already applied for this job"
          );
          return
        }
      } catch (error) {
        callPrompt(
          "Order Placement",
          "",
          "close",
          "Problem applying for job. Please try again"
        );
      }
    
  }

  const submitChangePhone = async (e) => {
    e.preventDefault();
    addPhoneNumber()
    
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(profile.user.phone_number != ""){
      await applyForJob()
    }else {
      const phoneSuccess = await  addPhoneNumber()
      if(phoneSuccess) {
        await applyForJob()
      }
    }
 
  };

  return (
    <div>
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
      <div className="">
        <div
          className="modal fade "
          id="applyloggedin"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="checkoutcontent">
                  <div>
                    <h3 className="modalheading mt-8">
                      Complete your <br /> application
                    </h3>
                  </div>
                  <br />
                  <form>
                    <div className="form-group">
                      {profile &&
                        profile.user &&
                        profile.user.phone_number === "" ? (
                        <>
                          <div>
                            <label htmlFor="InputEmail" className="formlabel">
                              Telephone Number
                            </label>
                            <input
                              type="number"
                              className="form-control form-rounded"
                              id="modalnumber"
                              value={newPhone}
                              placeholder="Please enter your telephone number"
                              onChange={(e) => setNewPhone(e.target.value)}
                            />
                            <br />
                          
                                <label htmlFor="InputEmail" className="formlabel">
                                    Password
                                </label>
                              <div className="row form-group account-email-body">
                                <input
                                  type={ togglepasswordeye ? "text" : "password"}
                                  id="account-input-password"
                                  className="form-control form-rounded mail-pass-input2"
                                  placeholder="Confirm number with password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                >

                                </input>
                                <div className="input-group-addon">
                                  <a href="#">
                                    <i
                                      className={`${
                                        togglepasswordeye ? "fe fe-eye" : "fe fe-eye-off"
                                      }`}
                                      onClick={() => setTogglePasswordeye(!togglepasswordeye)}
                                    />
                                  </a>
                                </div>
                               </div>
          
                          </div>
                        </>
                      )  : (
                        <></>
                      )}

                      <div className="form-group">
                        <button
                          data-dismiss="modal"
                          type="submit"
                          id="placeorder_button"
                          className="btn btn-primary btn-block authbtn"
                          onClick={handleSubmit}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ApplySignedIn;
