import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AccountPassword = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* content for change provide your password modal starts from here */}
      <Button
        className="btn btn-primary mail-pass-buttons"
        id="account-mail-save"
        variant="primary"
        onClick={handleShow}
      >
        Save
      </Button>

      <Modal
        className="password-modal-popup"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <span>Confirm change</span>
          </Modal.Title>
        </Modal.Header>
        {/* the actual form starts from here */}
        <form>
          <Modal.Body>
            <div className="row form-group account-email-body">
              <label className="pr-3 mt-2">
                <strong>Password</strong>
              </label>
              <input
                type="text"
                id="account-modal-pass-input"
                className="form-control form-rounded mail-pass-input"
                placeholder="Enter password"
              ></input>
            </div>
          </Modal.Body>
          <Modal.Footer className="account-email-body">
            {/*Buttons for saving of password confrimation starts here*/}
            <div className="row account-email-body-buttons ">
              <Button
                id="account-modal-pass-save"
                className="btn btn-primary pass-modal-popup-button mb-2 "
                variant="primary"
              >
                Save
              </Button>
              <Button
                id="account-modal-pass-cancel"
                className="btn btn-primary pass-modal-popup-button "
                variant="primary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
            {/*Buttons for saving of password confrimation ends here*/}
          </Modal.Footer>
        </form>
        {/* the actual form ends here */}
      </Modal>
      {/* content for change provide your password modal end from here */}
    </>
  );
};

export default AccountPassword;
