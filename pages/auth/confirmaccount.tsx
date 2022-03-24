import Button from "react-bootstrap/Button";
// import Link from "next/link";
import { useState, FormEvent, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Prompt from "../../components/Prompt";
// import AuthHeader from "../../components/auth/AuthHeader";
import Head from "next/head";
import { Store } from "../../contextStore";
import { Users } from "../../lib/endpoints";
import MainLayout from "../../components/MainLayout";

const ConfirmAccount = () => {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [countDown, setCountDown] = useState(60);
  const [disabled, setDisabled] = useState(true);
  const code2Ref = useRef(null);
  const code3Ref = useRef(null);
  const code4Ref = useRef(null);
  const submitBtnRef = useRef(null);
  const { state } = useContext<any>(Store);
  const router = useRouter();

  const handleClose = () => setShow(false);

  // const autotab = (current, to) => {
  //   if (
  //     current.getAttribute &&
  //     current.value.length == current.getAttribute("maxlength")
  //   ) {
  //     to.focus();
  //   }
  // };

  function countdown(minutes) {
    var seconds = 60;
    var mins = minutes;

    function tick() {
      //This script expects an element with an ID = "counter". You can change that to what ever you want.

      var current_minutes = mins - 1;
      seconds--;
      const cnt: any =
        current_minutes.toString() +
        ":" +
        (seconds < 10 ? "0" : "") +
        String(seconds);
      if (seconds > 0) {
        setTimeout(tick, 1000);
      } else if (mins > 1) {
        countdown(mins - 1);
      } else {
        setDisabled(false);
      }
      setCountDown(cnt);
    }
    tick();
  }

  const callPrompt = (
    title: string,
    link: string,
    link_text: string,
    message: string
  ) => {
    if (show) setShow(false);
    setShow(true);
    setPromptTitle(title);
    setLinkText(link_text);
    setLinkTo(link);
    setPromptBody(message);
  };

  const submitCode = async (e) => {
    e.preventDefault();
    try {
      const rs: any = await axios.post(
        process.env.URL + "/auth/keyinput/",
        {
          integer_key: parseInt(`${code1}${code2}${code3}${code4}`),
        }
      );
      const isSignup = window.localStorage.getItem('mp-fp');
      if(isSignup && isSignup == "forgot") {
        let ta = {ta:rs}
        window.localStorage.setItem("ta", JSON.stringify(ta))
        callPrompt(
          "Verification",
          "/auth/resetpassword",
          "Click here to reset your password",
          "Verification successful"
        );
        window.localStorage.removeItem("mp-fp");
        
      } else {
        try{
          const checkedOut = window.localStorage.getItem("checkout")
          if (checkedOut == "guest"){
            
            window.localStorage.removeItem("checkout")
            window.localStorage.setItem("glogin", "guestlogin")
            callPrompt(
              "Verification",
              "/auth/login",
              "Login",
              "Verification successful"
            );
          }
          else{
            callPrompt(
              "Verification",
              "/auth/login",
              "Login",
              "Verification successful"
            );
          }
        }
        catch(error)
        {
          callPrompt("Redirect to Login failed", "", "", "Please wait...");
        }
      }
    
    } catch (e) {
      callPrompt("Verification", "", "Close", "Verification failed");
    }   
  };

  const requestVerificationCode = async () => {
    setCountDown(60);
    setDisabled(true);
    callPrompt("Verification", "", "", "Requesting for verification code");
    const rs = await new Users().resendToken(state.resetcredentials);
    
    if (rs.error) {
      callPrompt("Verification", "", "Close", "Code request failed");
    } else {
      callPrompt(
        "Verification",
        "",
        "Close",
        "Code request successful. Please check your email/phone"
      );
    }
    countdown(1);
  };
  useEffect(() => {
    if (countDown == 60) countdown(1);
  }, []);
  return (
    <>
      <MainLayout >
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
          <div style={{ textAlign: "center", paddingTop: "12%" }}>
            <h3>
              <b>
                Enter code for
                <br />
                verification
              </b>
            </h3>
          </div>
          <br />
          {/* <form className="needs-validation" onSubmit={submitCode}> */}
          <div className="form-group" style={{ textAlign: "center" }}>
            <input
              type="text"
              className="codebox mr-3"
              id="code1"
              maxLength={1}
              size={1}
              min={0}
              max={9}
              pattern="[0-9]{1}"
              value={code1}
              onChange={(e) => setCode1(e.target.value)}
              onKeyUp={() => code2Ref.current.focus()}
              style={{
                textAlign: "center",
              }}
            />
            <input
              type="text"
              className="codebox mr-3"
              id="code2"
              maxLength={1}
              size={1}
              min={0}
              max={9}
              pattern="[0-9]{1}"
              value={code2}
              onChange={(e) => setCode2(e.target.value)}
              style={{
                textAlign: "center",
              }}
              ref={code2Ref}
              onKeyUp={() => code3Ref.current.focus()}
            />
            <input
              type="text"
              className="codebox mr-3"
              id="code3"
              maxLength={1}
              size={1}
              min={0}
              max={9}
              pattern="[0-9]{1}"
              value={code3}
              onChange={(e) => setCode3(e.target.value)}
              style={{
                textAlign: "center",
              }}
              ref={code3Ref}
              onKeyUp={() => code4Ref.current.focus()}
            />
            <input
              type="text"
              className="codebox mr-3"
              id="code4"
              maxLength={1}
              size={1}
              min={0}
              max={9}
              pattern="[0-9]{1}"
              value={code4}
              onChange={(e) => setCode4(e.target.value)}
              style={{
                textAlign: "center",
              }}
              ref={code4Ref}
              onKeyUp={() => submitBtnRef.current.focus()}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              style={{ width: "205px" }}
              className="btn btn-primary mr-1 authbtn"
              id="continue"
              ref={submitBtnRef}
              onClick={submitCode}
            >
              Continue
            </button>
            <div style={{ textAlign: "center" }} className="mt-5">
              If you don't recieve the code within
              <br />
              1min, click below to re-send it.
            </div>
            <div style={{ marginTop: 15, textAlign: "center" }}>
              <button
                className="re-sendbtn"
                style={{ marginLeft: "-1px", color: disabled ? "grey" : "" }}
                id="re-send_code"
                onClick={requestVerificationCode}
                disabled={disabled}
              >
                Resend Code<i className="fe fe-rotate-ccw ml-3"></i>
              </button>
              <span
                style={{
                  fontWeight: "bold",
                  color: "#1B98E0",
                  marginLeft: "13px",
                }}
              >
                {countDown}
              </span>
            </div>
          </div>
          {/* </form> */}
        </div>
      </MainLayout>
    </>
  );
};

export default ConfirmAccount;
