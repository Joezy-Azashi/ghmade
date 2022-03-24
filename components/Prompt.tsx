import Link from "next/link";
import { useState, useEffect } from "react";

const Prompt = (props: any) => {
  const [closeBox, setCloseBox] = useState(props.show);
  useEffect(() => {
    setCloseBox(props.show);
  }, [props.show]);

  return (
    <div
      id="myModal"
      className="modal"
      style={{ display: closeBox ? "block" : "", zIndex: 9999 }}
    >
      <div
        style={{
          display: closeBox ? "block" : "",
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: 0.6,
        }}
      />
      {/* <!-- Modal content --> */}
      <div
        className="modal-content"
        style={{
          width: "400px",
          position: "absolute",
          left: "50%",
          top: "50%",
          marginLeft: "-200px",
          // marginTop: "-10px",
          verticalAlign: "middle",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {/* <p>{props.title}</p> */}
        <div style={{ fontWeight: "bold" }}> {props.children}</div>
        {props.success ? (
          <Link href={props.linkTo}>
            <a className="btn btn-primary">{props.linkText}</a>
          </Link>
        ) : 
            props.linkText.length > 0 ? 
              <div className="prompt">
              <a
                // href="#"
                type="button"
                className="btn btn-primary prompt_btn"
                onClick={() => {
                  props.handleClose();
                  // setCloseBox(false);
                }}
                style={{ fontSize: 15 }}
              >                
                {props.linkText}
              </a>
            </div> : <></>   
        }
      </div>
    </div>
  );
};

export default Prompt;
