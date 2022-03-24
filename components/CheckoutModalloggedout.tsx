import React, { FormEvent, useState, useContext, useEffect } from "react";
import { ProductOrders } from "../lib/endpoints";
import { Store } from "../contextStore";
import { useRouter } from "next/router";
import Prompt from "../components/Prompt";
import { Console } from "console";

function CheckoutModalloggedout({ cart }) {
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [doneOrder, setDoneorder] = useState(false);
  const [cart_id, setCartid] = useState<any>();
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem("cart_id") !== null) {
      let key = window.localStorage.getItem("cart_id");
      setCartid(key);
    }
  }, []);

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
    if (doneOrder) {
      router.push("/market");
    } else {
      router.push("/cart");
    }
    setShow(false);
  };

  const placeOrder = async (e: FormEvent) => {
    e.preventDefault();
    const { uuid } = await new ProductOrders().createGuest(phone);
    dispatch({
      type: "SET_GUEST",
      payload: uuid,
    });

    let orderdata = [];
    cart.map((item) => {
      return orderdata.push({
        id: item.prodid,
        quantity: item.qty,
      });
    });

    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

    if (!phone.match(phoneno)) {
      callPrompt("Checkout", "", "Close", "Invalid phone number");
    } else {
      try {
        callPrompt(
          "Order Placement",
          "",
          "",
          "Processing your order(s)."
        );
        const rs = await new ProductOrders().placeOrderGuest(cart_id, uuid);
        await window.localStorage.removeItem("cart_id")
        if (rs.order_products) {
          setDoneorder(true);
          callPrompt(
            "Order Placement",
            "",
            "close",
            "Your order has been placed successfully. The business owner will call you to discuss delivery and payment terms."
          );
        }        
        dispatch({type:"UPDATE_CART",payload:[]})
        dispatch({ type: "SET_GUEST", payload: null });
      } catch (error) {
        callPrompt(
          "Order Placement",
          "",
          "close",
          "Problem placing order. Please try again"
        );
      }
      router.push("/cart");
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
          id="checkout2"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{margin: "auto", width:"70%"}}>
              <div className="modal-body">
                <div className="checkoutcontent">
                  <div>
                    <h3 className="modalheading mt-5">
                      Complete your <br /> order as a guest
                    </h3>
                  </div>
                  <br />
                  <form>
                    <div className="form-group">
                      <label htmlFor="InputEmail" className="formlabel">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control form-rounded"
                        id="modalnumber2"
                        placeholder="Please enter your telephone number"
                        onChange={handlePhone}
                      />
                      <br />

                      <div className="form-group">
                        <button
                          data-dismiss="modal"
                          type="submit"
                          id="placeorder_button"
                          className="btn btn-primary btn-block authbtn"
                          onClick={placeOrder}
                        >
                          Continue
                        </button>
                      </div>
                      <div className="form-group">
                        <p className="or">
                          <b>Or</b>
                        </p>
                        <p className="or">
                          Continue with your account?
                          <a
                            data-dismiss="modal"
                            onClick={() => {
                              console.log("cart:",state.cart)
                              window.localStorage.setItem("guest_to_loggedin",JSON.stringify({cart:state.cart}))
                              window.localStorage.setItem("checkout", "guest");
                              router.push("/auth/login");
                            }}
                            className="signuptext ml-1"
                            style={{ cursor: "pointer", color: "#3964fc" }}
                          >
                            <b>Log in</b>
                          </a>
                        </p>
                      </div>
                      <div className="form-group modalmargin">
                        <p className="or">
                          Create an account?
                          <a
                            data-dismiss="modal"
                            onClick={() => {
                              window.localStorage.setItem("checkout", "guest");
                              router.push("/auth/signup");
                            }}
                            className="signuptext ml-1"
                            style={{ cursor: "pointer", color: "#3964fc" }}
                          >
                            <b>Sign up</b>
                          </a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CheckoutModalloggedout;
