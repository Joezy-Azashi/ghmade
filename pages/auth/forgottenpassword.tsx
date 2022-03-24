import React from "react";
import MainLayout from "../../components/MainLayout";
import {useState, useEffect, useContext} from 'react'
import { Auth } from "../../lib/endpoints";
import { useRouter } from "next/router";
import Prompt from "../../components/Prompt";
import { Store } from "../../contextStore";

function forgottenpassword() {
  const [authentication_property, setAuthenticationProperty] = useState("");  
  const router = useRouter()

  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const handleClose = () => setShow(false);
  const { dispatch } = useContext(Store);

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

const verifypassword = async (e) =>{
  e.preventDefault();
  const rs = await new Auth().verifyemail(authentication_property)
  dispatch({
    type: "SET_RESET",
    payload: authentication_property,
  });
  if(rs.access_type === "pw") {
    window.localStorage.setItem('mp-fp', "forgot")
    callPrompt(
      "Code Sent",
       "/auth/confirmaccount", 
       "Okay", 
       "Success: A code to comfirm your account has been to sent to your mail/phone. Please check"
    );
    return;
    

  } else {
    callPrompt(
      "Forgotten Password",
      "",
      "Close",
      "Check Email/Phone: Email/phone number not found"
    );
    return;
  }
  
}

  return (
    <div>
      <MainLayout>

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
          
        <div className="logincontent">
          <div style={{ textAlign: "center", paddingTop: "30%" }}>
            <h3>
              <b>Find Your Account</b>
            </h3>
            <br />
          </div>



          <form
            className="needs-validation"
            noValidate 
            onSubmit={verifypassword}
          >

            <div className="form-group">
              <label htmlFor="inputFindAccount" className="formlabel">
                Email/Phone No.
              </label>
              <input
                type="email"
                className="form-control form-rounded"
                id="InputFindEmail"
                placeholder="Please enter a valid email/phone no."
                // value=""
                onChange={(e) => setAuthenticationProperty(e.target.value)}
              />
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                id="findAccount_button"
                className="btn btn-primary btn-block  authbtn"
              >
                Continue
              </button>
            </div>
            <br />
          </form>
        </div>
      </MainLayout>
    </div>
  );
}

export default forgottenpassword;
