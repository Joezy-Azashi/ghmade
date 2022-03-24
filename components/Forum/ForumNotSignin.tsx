import React, { FormEvent, useState, useContext, useEffect } from "react";
import { Store } from "../../contextStore";
import { useRouter } from "next/router";
import Prompt from "../../components/Prompt";
import LoginforModal from "../../components/Job/Modals/loginModal"

function ForumNotSignin() {
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


  const handleClose = () => {
    if (doneApply) {
      router.push("/forum/forum");
    } else {
      router.push("/market");
    }
    setShow(false);
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
          id="forumnotsignin"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="checkoutcontent">
                  <div>
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
export default ForumNotSignin;
