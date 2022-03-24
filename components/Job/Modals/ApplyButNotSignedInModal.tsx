import React, { FormEvent, useState, useContext, useEffect } from "react";
import { Job } from "../../../lib/endpoints/job";
import { Store } from "../../../contextStore";
import { useRouter } from "next/router";
import Prompt from "../../Prompt";
import LoginforModal from "./loginModal"

function ApplyButNotSignedInModal({ cv, job_id }) {
  const { dispatch } = useContext(Store);
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [doneApply, setDoneApply] = useState(false);

  const router = useRouter();

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

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleClose = () => {
    if (doneApply) {
      router.push("/jobs/applied");
    } else {
      router.push("/jobs");
    }
    setShow(false);
  };

  //Login funtion comes here
  const applyForJob = async (e: FormEvent) => {
    e.preventDefault();
    const { uuid } = await new Job().createJobApplication({cv: cv});
    dispatch({
      type: "SET_GUEST",
      payload: uuid,
    });

    var phoneno =  /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

    if (!phone.match(phoneno)) {
      callPrompt("Checkout", "", "Close", "Invalid phone number");
    } else {
      try {
        const rs = await new Job().createJobApplication({cv: cv});
        setDoneApply(true);
        callPrompt(
          "Job Application",
          "/jobs/viewjobsandapply",
          "close",
          "You've successfully applied for this job"
        );
      } catch (error) {
        callPrompt(
          "Error",
          "",
          "close",
          "Sorry! A Problem Occurred, Please try again"
        );
      }
      router.push("/jobs/applied");
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
          id="applynotloggedIn"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="checkoutcontent">
                  <div>
                  <button type="button" className="close fe fe-x" data-dismiss="modal" aria-hidden="true"></button>
                    <h3 className="modalheading mt-5">
                      Login
                    </h3>
                    <LoginforModal />
                  </div>
                  
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ApplyButNotSignedInModal;
