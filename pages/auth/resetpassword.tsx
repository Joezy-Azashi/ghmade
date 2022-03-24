import React from "react";
import { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import Prompt from "../../components/Prompt";
import { Auth } from "../../lib/endpoints/auth";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";

function resetpassword() {
  const auth_api = new Auth();

  const [authentication_property, setAuthenticationProperty] = useState("");
  const [togglenewpasswordeye, setTogglePasswordeye] = useState(false);
  const [toggleconfirmnewpasswordeye, setToggleConfirmPasswordeye] = useState(
    false
  );

  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");

  const handleClose = () => setShow(false);
  const router = useRouter();






  const resetPassword = async (e) => {
    e.preventDefault();
    // const result = await new Auth().resetPassword(authentication_property)

    // if conditions to chect the password formats
    let numbers = /[0-9]/g;
    if (!password.match(numbers)) {
      callPrompt(
        "Sign Up",
        "",
        "Okay",
        "Check Password: There should be at least one numeric character"
      );
      return;
    }

    // Validate capital letters
    let upperCaseLetters = /[A-Z]/g;
    if (!password.match(upperCaseLetters)) {
      callPrompt(
        "Sign Up",
        "",
        "Okay",
        "Check Password: There should be at least one uppercase character"
      );
      return;
    }

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

    if (password !== confirm_password) {
      callPrompt("Sign Up", "", "Close", "Password mismatch");
      return;
    }
    const rs = await auth_api.resetPassword(
      password
    );
    if (rs.status === 200) {
      callPrompt(
        "Password Reset",
        "/auth/login",
        "Click here to login",
        "Password reset successful"
      );
      setPassword("");
      setConfirmPassword("");
    }
  };

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
          <div style={{ textAlign: "center", paddingTop: "20%" }}>
            <h3>
              <b>Reset Password</b>
            </h3>
            <br />
          </div>

          <div className="form-group">
            <label htmlFor="InputPassword1" className="formlabel">
              New Password
            </label>
            <div className="input-group">
              <input
                type={togglenewpasswordeye ? "text" : "password"}
                className="form-control form-rounded"
                id="newPassword"
                placeholder="Password must be at least 8 characters"
                data-toggle="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-addon">
                <a href="#">
                  <i
                    className={`${togglenewpasswordeye ? "fe fe-eye" : "fe fe-eye-off"
                      }`}
                    onClick={() => setTogglePasswordeye(!togglenewpasswordeye)}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="InputPassword1" className="formlabel">
              Confirm Password
            </label>
            <div className="input-group">
              <input
                type={toggleconfirmnewpasswordeye ? "text" : "password"}
                className="form-control form-rounded"
                id="confirmNewPassword"
                placeholder="Re-Enter the same password as above"
                data-toggle="password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="input-group-addon">
                <a href="#">
                  <i
                    className={`${toggleconfirmnewpasswordeye
                        ? "fe fe-eye"
                        : "fe fe-eye-off"
                      }`}
                    onClick={() =>
                      setToggleConfirmPasswordeye(!toggleconfirmnewpasswordeye)
                    }
                  />
                </a>
              </div>
            </div>
          </div>

          {/* button to continue to email */}
          <div style={{ textAlign: "center", paddingRight: "10px" }}>
            <button
              type="submit"
              className="btn btn-primary btn-block authbtn"
              id="resetpassword_button"
              onClick={resetPassword}
            >
              Continue
            </button>
          </div>
          <br />
        </div>
      </MainLayout>
    </div>
  );
}

export default resetpassword;
