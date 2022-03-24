// import AuthHeader from "../../components/auth/AuthHeader";
import Link from "next/link";
import { useState, FormEvent, useEffect, useContext } from "react";
import axios from "axios";
import Prompt from "../../components/Prompt";
import Head from "next/head";
import { Store } from "../../contextStore";
import MainLayout from "../../components/MainLayout";
import { useRouter } from "next/router";
const Signup = () => {
  const router = useRouter();
  const [authentication_property, setAuthenticationProperty] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [is_organization, setIsOrganization] = useState<boolean>();
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [togglepasswordeye, setTogglePasswordeye] = useState(false);
  const [toggleconfirmpasswordeye, setToggleConfirmPasswordeye] = useState(
    false
  );
  const { dispatch } = useContext(Store);
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
  const register = async (e: FormEvent) => {
    e.preventDefault();
    if (is_organization === undefined) {
      callPrompt(
        "Sign Up",
        "",
        "Okay",
        "Kindly select an option for either organisation or individual."
      )
      return
    }

    // let lowerCaseLetters = /[a-z]/g;
    // if (!password.match(lowerCaseLetters)) {
    //   callPrompt(
    //     "Sign Up",
    //     "",
    //     "Okay",
    //     "Check Password: There should be at least one lowercase character"
    //   );
    //   return;
    // }
    // // Validate capital letters
    // let upperCaseLetters = /[A-Z]/g;
    // if (!password.match(upperCaseLetters)) {
    //   callPrompt(
    //     "Sign Up",
    //     "",
    //     "Okay",
    //     "Check Password: There should be at least one uppercase character"
    //   );
    //   return;
    // }
    // // Validate numbers
    // let numbers = /[0-9]/g;
    // if (!password.match(numbers)) {
    //   callPrompt(
    //     "Sign Up",
    //     "",
    //     "Okay",
    //     "Check Password: There should be at least one numeric character"
    //   );
    //   return;
    // }

    // Validate length
    if (password.length < 8) {
      callPrompt(
        "Sign Up",
        "",
        "Okay",
        "Check Password: Password should be eight or more characters long"
      );
      return;
    }

    let numbers = /[0-9]/g;
    let upperCaseLetters = /[A-Z]/g;
    let lowerCaseLetters = /[a-z]/g;
    if (!password.match(numbers) || !password.match(upperCaseLetters) || !password.match(lowerCaseLetters)) {
      callPrompt(
        "Sign Up",
        "",
        "Okay",
        "Check Password: There should be at least one numeric character, an uppercase and a lowercase"
      );
      return;
    }

    if (password !== confirm_password) {
      callPrompt("Sign Up", "", "Close", "Password mismatch");
      return;
    }

    callPrompt("Sign Up", "", "", "Please wait...");
    try {
      const response = await axios.post(
        process.env.URL + "/auth/registration/",
        {
          authentication_property: authentication_property,
          password: password,
          is_organization: is_organization,
        }
      );
      if (response.status === 200 || response.statusText === "Created") {
        // go to landing page
        callPrompt(
          "Sign Up",
          "/auth/confirmaccount",
          "Confirm Account",
          "A confirmation has been sent to your email/phone number. Please retrieve the code and confirm acount"
        );
        dispatch({
          type: "SET_RESET",
          payload: authentication_property,
        });
      }
      else {
        callPrompt("Sign Up", "", "Close", "Failed to register");
      }
    } catch (err) {
      if (err.message === "Request failed with status code 400") {
        if (err.response.data.error) {
          callPrompt(
            "Sign Up",
            "",
            "Close",
            err.response.data.error
          );
        } else {
          callPrompt(
            "Sign Up",
            "",
            "Okay",
            "Email/Phone number field must not be empty."
          );
        }

      } else if (err.message === "Request failed with status code 404") {
        // bad endpoint
        callPrompt("Sign Up", "", "Close", "Request failed");
      } else if (err.message === "Network Error") {
        // bad network connection
        callPrompt(
          "Sign Up",
          "",
          "Okay",
          "Please check your network connection and try again."
        );
      }
    }


  };
  return (
    <>
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
        <div className="signupcontent">
          <div className="mb-5 center">
            <br />
            <br />
            <div>
              <b>Make the most out of your business</b>
            </div>
            <br />
            <div>
              Already on ghmade?{" "}
              <Link href="/auth/login">
                <a className="signuptext">
                  <b>Log in</b>
                </a>
              </Link>
            </div>
          </div>
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="InputEmail" className="formlabel">
                Email/Phone No.
              </label>
              <input
                type="text"
                className="form-control form-rounded"
                id="InputEmail"
                aria-describedby="emailHelp"
                placeholder="Please enter a valid email/phone no."
                value={authentication_property}
                onChange={(e) => setAuthenticationProperty(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputPassword1" className="formlabel">
                Password
              </label>
              <div className="inner-addon right-addon">
                <i className={`${togglepasswordeye ? "fe fe-eye fa-lg" : "fe fe-eye-off fa-lg"
                  }`}
                  onClick={() => setTogglePasswordeye(!togglepasswordeye)}
                  style={{ cursor: "pointer" }} />
                <input
                  type={togglepasswordeye ? "text" : "password"}
                  className="form-control form-rounded"
                  id="InputPassword1"
                  placeholder="Password must be at least 8 characters"
                  data-toggle="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="InputPassword2" className="formlabel">
                Confirm Password
              </label>
              <div className="inner-addon right-addon">
                <i className={`${toggleconfirmpasswordeye ? "fe fe-eye fa-lg" : "fe fe-eye-off fa-lg"
                  }`}
                  onClick={() =>
                    setToggleConfirmPasswordeye(!toggleconfirmpasswordeye)
                  }
                  style={{ cursor: "pointer" }}
                />
                <input
                  type={toggleconfirmpasswordeye ? "text" : "password"}
                  className="form-control form-rounded"
                  id="InputPassword2"
                  placeholder="Re-Enter the same password as above"
                  data-toggle="password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="center">
              <input
                type="radio"
                id="organization"
                name="account_type"
                defaultValue="organization"
                onChange={() => setIsOrganization(true)}
              />
              <label htmlFor="organization" className="radio_spc ml-2">
                Organization / Business
              </label>
              <span className="ml-5">
                <input
                  type="radio"
                  id="individual"
                  name="account_type"
                  defaultValue="individual"
                  className="radio_spc"
                  onChange={() => setIsOrganization(false)}
                />
                <label htmlFor="individual" className="ml-2">
                  Individual
                </label>
              </span>
            </div>
            <div className="center">
              <button
                type="submit"
                className="btn btn-primary btn-block authbtn"
                id="signup_button"
              >
                Sign Up
              </button>
            </div>
            <br />
            <div className="center">
              By clicking sign up, you agree to the ghmade
              <br />
              <b>
                <a href="/termsAndconditions" className="texthover" id="user_agreement">
                  Terms & Conditions,
                </a>
              </b>{" "}
              <b>
                <a href="/policy" className="texthover" id="privacy_policy">
                  Privacy Policy
                </a>
              </b>{" "}
              and{" "}
              <b>
                <a href="/policy" className="texthover" id="cookie_policy">
                  Cookie Policy.
                </a>
              </b>
            </div>
            <b></b>
          </form>
          <b></b>
        </div>
      </MainLayout>
    </>
  );
};
export default Signup;