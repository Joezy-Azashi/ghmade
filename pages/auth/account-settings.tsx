import MainLayout from "../../components/MainLayout";
import { Accordion, Card } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { Users, Auth } from "../../lib/endpoints";
import Prompt from "../../components/Prompt";
import Link from "next/link";
import { Store } from "../../contextStore";

const Acount = () => {
  const [newEmail, setNewEmail] = useState("");
  const [mailpassword, setMailPassword] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [phonepassword, setPhonePassword] = useState("");
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [doneUpdate, setDoneUpdate] = useState(false);
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmnewpassword, setConfirmNewPassword] = useState("");

  const [togglemailpasswordeye, setToggleMailPasswordeye] = useState(false);
  const [togglphonepasswordeye, setTogglePhonePasswordeye] = useState(false);
  const [togglepasswordeye, setTogglePasswordeye] = useState(false);
  const [togglenewpasswordeye, setToggleNewPasswordeye] = useState(
    false
  );
  const [toggleconfirmpasswordeye, setToggleConfirmPasswordeye] = useState(
    false
  );


  const { dispatch } = useContext(Store);
  const auth_api = new Auth();

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

  const submitChangeEmail = async (e) => {
    e.preventDefault();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)) {
      //email vaild
    } else {
      callPrompt(
        "Change Email",
        "",
        "Okay",
        "Check E-mail: Please enter the correct email address"
      );
      return;
    }

    // if (newEmail.length < 1) {
    //   callPrompt("Change Email", "", "Close", "New email field can not empty");
    //   return;
    // }

    if (mailpassword.length < 1) {
      callPrompt("Change Password", "", "Okay", "Password field can not be empty");
      return;
    }
    const response = await new Users().changeEmail({
      email: newEmail,
      password: mailpassword,
    });

    if (Array.isArray(response.email)) {
      callPrompt("Change Email", "", "Close", "User with this email already exist");
      return;
    }

    if (response.password) {
      // bad credentials
      callPrompt("Change Email", "", "Okay", "Password incorrect, please check and try again.");
      return;
    }

    if (response.email) {
      //
      callPrompt("Change Email", "", "Okay", "Email changed/added successfully");

      setNewEmail("");
      setMailPassword("");
    }
  };

  const submitChangePhone = async (e) => {
    e.preventDefault();
    if (/^\d{10}$/.test(newPhone)) {
      //phone vaild
    } else {
      callPrompt(
        "Change Phone Number",
        "",
        "Okay",
        "Check Phone: Please enter the correct phone number"
      );
      return;
    }

    if (newPhone.length < 1) {
      callPrompt("Change Phone Number", "", "Okay", "New email field can be not empty");
      return;
    }
    if (phonepassword.length < 1) {
      callPrompt("Change Phone Number", "", "Okay", "Password field can be not empty");
      return;
    }
    const response = await new Users().changePhone({
      phone_number: newPhone,
      password: phonepassword,
    });

    if (Array.isArray(response.phone_number)) {
      callPrompt("Change Phone Number", "", "Close", "User with this phone already exist");
      return;
    }

    if (response.password) {
      // bad credentials
      callPrompt("Change Phone Number", "", "Close", "Password incorrect, please check and try again.");
      return;
    }

    if (response.phone_number) {
      //
      callPrompt("Change Phone Number", "", "Close", "Phone Number changed/added successfully");

      setNewPhone("");
      setPhonePassword("");
    }
  };

  const submitChangePassword = async (e) => {
    e.preventDefault();
    if (password.length < 1) {
      callPrompt(
        "Change Password",
        "",
        "Okay",
        "Current password field can not be empty"
      );
      return;
    }
    if (newpassword.length < 1) {
      callPrompt(
        "Change Password",
        "",
        "Okay",
        "New password field can not be empty"
      );
      return;
    }
    if (confirmnewpassword.length < 1) {
      callPrompt(
        "Change Password",
        "",
        "Okay",
        "Confirm password field can not be empty"
      );
      return;
    }
    if (newpassword !== confirmnewpassword) {
      callPrompt("Change Password", "", "Close", "Password does not match");
      return;
    }

    let upperCaseLetters = /[A-Z]/g;
    if (!newpassword.match(upperCaseLetters)) {
      callPrompt(
        "Sign Up",
        "",
        "Okay",
        "Check Password: There should be at least one uppercase character"
      );
      return;
    }

    // Validate numbers
    let numbers = /[0-9]/g;
    if (!newpassword.match(numbers)) {
      callPrompt(
        "Sign Up",
        "",
        "Okay",
        "Check Password: There should be at least one numeric character"
      );
      return;
    }

    // Validate length
    if (newpassword.length < 8) {
      callPrompt(
        "Sign Up",
        "",
        "Okay",
        "Check Password: Password should be eight or more characters long"
      );
      return;
    }
    const result = await auth_api.changePassword(
      password,
      newpassword,
      confirmnewpassword
    );


    if (result.password) {
      callPrompt("Change Password", "", "Close", result.password);
      return;
    }


    callPrompt("Change Password", "", "Close", "Password changed successfully");
    setPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
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
        <div>
          {/* page-header */}
          <div className="page-header">
            <h1 className="page-title">Account Settings</h1>
          </div>
          {/* end of  page-header */}

          {/* content for change email and password starts from here */}
          <div>
            <Accordion>
              {/*The card for changing of email*/}
              <Card className="account-setting-card card-hover">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="email-toggle"
                  className="account-header"
                >
                  <div className="mt-3 mb-1">
                    <span className="account-title">
                      <strong>Add/Change Email</strong>
                    </span>
                    <p className="account-para">Link your account to a new email address, click edit.</p>
                  </div>
                  <div>
                    <span className="account-title edit-button">
                      <strong>Edit</strong>
                    </span>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="email-toggle">
                  <Card.Body>
                    <div className="row form-group account-email-body">
                      <label className="pr-2 mt-2">
                        <strong>Email Address</strong>
                      </label>
                      <input
                        type="text"
                        id="account-input-mail"
                        className="form-control form-rounded mail-pass-input1"
                        placeholder="New email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      ></input>
                    </div>
                    <div className="row form-group account-email-body">
                      <label className="pr-6 mt-2">
                        <strong>Password</strong>
                      </label>
                      <input
                        type={togglemailpasswordeye ? "text" : "password"}
                        id="account-input-password"
                        className="form-control form-rounded mail-pass-input"
                        placeholder="Confirm change with password"
                        value={mailpassword}
                        onChange={(e) => setMailPassword(e.target.value)}
                      >

                      </input>
                      <div className="input-group-addon">
                        <a href="#">
                          <i
                            className={`${togglemailpasswordeye ? "fe fe-eye" : "fe fe-eye-off"
                              }`}
                            onClick={() => setToggleMailPasswordeye(!togglemailpasswordeye)}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="row account-email-body-buttons pl-9  mb-2">
                      {/*  <AccountPasswordPopup /> */}
                      <button
                        className="btn btn-primary mail-pass-buttons"
                        id="account-mail-save"
                        onClick={submitChangeEmail}
                      >
                        Save
                      </button>
                    </div>
                    <div className="account-email-body">
                      <p className="pl-5">
                        <strong>Note:</strong> Your email address is linked to
                        your account. <br />
                        By changing/adding your email address, you can no longer log
                        in with your old email
                      </p>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              {/*The card for changing of email ends here*/}

              {/* The card for changing of phone number starts from here */}

              <Card className="account-setting-card card-hover">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="phone-toggle"
                  className="account-header"
                >
                  <div className="mt-3 mb-1">
                    <span className="account-title">
                      <strong>Add/Change Phone No.</strong>
                    </span>
                    <p className="account-para">Link your account to a new phone number, click edit.</p>
                  </div>
                  <div>
                    <span className="account-title edit-button">
                      <strong>Edit</strong>
                    </span>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="phone-toggle">
                  <Card.Body>
                    <div className="row form-group account-email-body">
                      <label className="pr-2 mt-2">
                        <strong>Phone Number</strong>
                      </label>
                      <input
                        type="tel"
                        id="account-input-mail"
                        className="form-control form-rounded mail-pass-input1"
                        placeholder="New phone number"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                      ></input>
                    </div>
                    <div className="row form-group account-email-body">
                      <label className="pr-6 mt-2">
                        <strong>Password</strong>
                      </label>
                      <input
                        type={togglphonepasswordeye ? "text" : "password"}
                        id="account-input-password"
                        className="form-control form-rounded mail-pass-input"
                        placeholder="Confirm change with password"
                        value={phonepassword}
                        onChange={(e) => setPhonePassword(e.target.value)}
                      >

                      </input>
                      <div className="input-group-addon">
                        <a href="#">
                          <i
                            className={`${togglphonepasswordeye ? "fe fe-eye" : "fe fe-eye-off"
                              }`}
                            onClick={() => setTogglePhonePasswordeye(!togglphonepasswordeye)}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="row account-email-body-buttons pl-9  mb-2">
                      {/*  <AccountPasswordPopup /> */}
                      <button
                        className="btn btn-primary mail-pass-buttons"
                        id="account-mail-save"
                        onClick={submitChangePhone}
                      >
                        Save
                      </button>
                    </div>
                    <div className="account-email-body">
                      <p className="pl-5">
                        <strong>Note:</strong> Your Phonr number is linked to
                        your account. <br />
                        By changing/adding your phone number, you can no longer log
                        in with your old phone
                      </p>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              {/* The card for changing of phone number ends here */}


              {/*The card for changing of password starts here*/}
              <Card className="account-setting-card card-hover">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="password-toggle"
                  className="account-header"
                >
                  <div className="mt-3 mb-1">
                    <span className="account-title">
                      <strong>Change Password</strong>
                    </span>
                    <p className="account-para">Keep your account secured, dont share password.</p>
                  </div>
                  <div>
                    <span className="account-title edit-button">
                      <strong>Edit</strong>
                    </span>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="password-toggle">
                  <Card.Body>
                    <div className="row form-group account-email-body">
                      <label className="pr-3 mt-2">
                        <strong>Current Password</strong>
                      </label>
                      <input
                        id="password"
                        type={togglepasswordeye ? "text" : "password"}
                        className="form-control form-rounded mail-pass-input"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      >
                      </input>
                      <div className="input-group-addon">
                        <a href="#">
                          <i
                            className={`${togglepasswordeye ? "fe fe-eye" : "fe fe-eye-off"
                              }`}
                            onClick={() => setTogglePasswordeye(!togglepasswordeye)}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="row form-group account-email-body">
                      <label className="pr-6 mt-2">
                        <strong>New Password</strong>
                      </label>
                      <input
                        id="newpassword"
                        type={togglenewpasswordeye ? "text" : "password"}
                        className="form-control form-rounded mail-pass-input"
                        placeholder="Password must be atleast 8 characters"
                        value={newpassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      ></input>
                      <div className="input-group-addon">
                        <a href="#">
                          <i
                            className={`${togglenewpasswordeye ? "fe fe-eye" : "fe fe-eye-off"
                              }`}
                            onClick={() => setToggleNewPasswordeye(!togglenewpasswordeye)}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="row form-group account-email-body">
                      <label className=" mt-2">
                        <strong>Confirm Password</strong>
                      </label>
                      <input
                        id="confirmnewpassword"
                        type={toggleconfirmpasswordeye ? "text" : "password"}
                        className="form-control form-rounded mail-pass-input"
                        placeholder="Re-enter the same password as above"
                        value={confirmnewpassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      ></input>
                      <div className="input-group-addon">
                        <a href="#">
                          <i
                            className={`${toggleconfirmpasswordeye ? "fe fe-eye" : "fe fe-eye-off"
                              }`}
                            onClick={() => setToggleConfirmPasswordeye(!toggleconfirmpasswordeye)}
                          />
                        </a>
                      </div>
                    </div>
                    {/*Buttons for saving of password starts here*/}

                    <div className="row account-email-body-buttons pl-9 mt-5  mb-2">
                      <button
                        type="submit"
                        id="account-pass-save"
                        className="btn btn-primary pass-buttons mr-1 mb-2 "
                        onClick={submitChangePassword}
                      >
                        Save
                      </button>
                    </div>
                    {/*Buttons for saving of password ends here*/}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              {/*The card for changing of password ends here*/}
            </Accordion>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Acount;