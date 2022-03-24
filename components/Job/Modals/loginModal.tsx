import Head from "next/head";
import Link from "next/link";
import { useState, FormEvent, useEffect, useContext } from "react";
import { Auth, ProductOrders, Users } from "../../../lib/endpoints";
import { useRouter } from "next/router";
import Prompt from "../../Prompt";
import { Store } from "../../../contextStore";
const LoginforModal = () => {
  const [authentication_property, setAuthenticationProperty] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [togglepasswordeye, setTogglePasswordeye] = useState(false);
  const { dispatch } = useContext(Store);
  const router = useRouter();

  const userProfile = (userInfo) => {
    window.localStorage.setItem("user-profile", JSON.stringify(userInfo));
    dispatch({
      type: "SET_USERINFO",
      payload: userInfo,
    });
  };
  const handleClose = () => setShow(false);
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
  const authenticate = async (e: any) => {
    e.preventDefault();
    let userInfo: any = {};

    try {
      // callPrompt("Login", "", "", "Please wait...");
      const response = await new Auth().login(
        authentication_property,
        password
      );

      if (response.user) {
        window.localStorage.removeItem("cart_id");
        dispatch({
          type: "SET_LOGGEDIN",
          payload: true
        })
        //setLogin(true)

        window.localStorage.setItem("cp-a", JSON.stringify(response));
        if (response.user.is_staff) {
          userInfo = await new Users().getAdminProfile();
        } else {
          if (response.user.is_organization == true) {
            userInfo = await new Users().getBusinessProfile();
          } else {
            userInfo = await new Users().getUserProfile();
          }
        }
        userProfile(userInfo);
        setShow(false);

       
        if (response.user) {
          window.location.reload()
        }     
      
        } else {
          callPrompt(
            "Login",
            "",
            "Close",
            "No active account found with the given credentials."
          );
        }
      } 
        
     catch (err) {
      if (err.message === "Request failed with status code 401") {
        // bad credentials
        callPrompt(
          "Login",
          "",
          "Okay",
          "Please check your credentials and try again."
        );
      } else if (err.message === "Request failed with status code 404") {
        // bad endpoint
        callPrompt("Login", "", "Close", "Request failed");
      } else if (err.message === "Network Error") {
        // bad network connection
        callPrompt(
          "Login",
          "",
          "Okay",
          "Please check your network connection and try again."
        );
      } else {
        callPrompt("Login", "", "Close", "Login failed.");
      }
    }
  };

  return (
    <>
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
      <form className="needs-validation" noValidate>
        <label htmlFor="InputEmail" className="formlabel">
          Email
        </label>
        <input
          type="email"
          className="form-control form-rounded"
          id="InputEmail"
          placeholder="Please enter a valid email"
          value={authentication_property}
          onChange={(e) => setAuthenticationProperty(e.target.value)}
        />

        <div className="form-group">
          <label htmlFor="InputPassword1" className="formlabel">
            Password
          </label>
          <div className="inner-addon right-addon">
            <i
              className={`${
                togglepasswordeye ? "fe fe-eye fa-lg" : "fe fe-eye-off fa-lg"
              }`}
              onClick={() => setTogglePasswordeye(!togglepasswordeye)}
              style={{ cursor: "pointer" }}
            />
            <input
              id="InputPassword1"
              className="form-control form-rounded"
              type={togglepasswordeye ? "text" : "password"}
              placeholder="Password must be at least 8 characters"
              data-toggle="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="center">
          <button
            id="signin_button"
            type="submit"
            className="btn btn-primary btn-block authbtn"
            onClick={authenticate}
          >
            Login
          </button>
        </div>
        <br />
        <div className="center">
          <div>
            <a href="/auth/forgottenpassword" className="texthover">
              Forgot Password?
            </a>
          </div>
          <br />
          <div>
            Don't have an account?{" "}
            <a className="signuptext" href="/auth/signup">
              <b>Sign Up</b>
            </a>
          </div>
        </div>
      </form>
    </>
  );
};
export default LoginforModal;
