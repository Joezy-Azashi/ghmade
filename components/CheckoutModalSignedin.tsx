import React, { useEffect, useState, useContext, FormEvent } from "react";
import { useRouter } from "next/router";
import { Store } from "../contextStore";
import { ProductOrders, Users } from "../lib/endpoints";
import { route } from "next/dist/next-server/server/router";
import Prompt from "../components/Prompt";

function CheckoutModalSignedin({ cart }) {
  const { state, dispatch } = useContext(Store);
  const [phone, setPhone] = useState<any>("");
  const [newPhone, setNewPhone] = useState("");
  const [checked, setChecked] = useState();
  const [profile, setProfile] = useState<any>();
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [doneOrder, setDoneorder] = useState(false);
  const [cart_id, setCartid] = useState<any>();
  const router = useRouter();
  const [togglepasswordeye, setTogglePasswordeye] = useState(
    false
  );
  const [password, setPassword] = useState("");

  useEffect(() => {
    let uprofile: any = window.localStorage.getItem("user-profile");
    uprofile = JSON.parse(uprofile);
    setProfile(uprofile);
    console.log("key:", window.localStorage.getItem("cart_id"))
    if (window.localStorage.getItem("cart_id") !== null) {
      let key = window.localStorage.getItem("cart_id");
      setCartid(key);
    }
  }, []);

  useEffect(() => {
    let uprofile: any = window.localStorage.getItem("user-profile");
    uprofile = JSON.parse(uprofile);
    setProfile(uprofile);
  }, [state]);

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


  const addPhoneNumber = async () => {
    if (/^\d{10}$/.test(newPhone)) {
      //phone vaild
    } else {
      callPrompt(
        "Change Email",
        "",
        "Close",
        "Check Phone: Please enter the correct phone number"
      );
      return false;
    }

    if (newPhone.length < 1) {
      callPrompt("Change Phone Number", "", "Close", "New email field can not empty");
      return false;
    }
    if (password.length < 1) {
      callPrompt("Change Phone Number", "", "Close", "Password field can not empty");
      return false;
    }
    const response = await new Users().changePhone({
      phone_number: newPhone,
      password: password,
    });

    if (Array.isArray(response.phone_number)) {
      callPrompt("Change Phone Number", "", "Close", "User with this phone already exist");
      return false;
    }

    if (response.password) {
      // bad credentials
      callPrompt("Change Phone Number", "", "Close", "No active account found with the given credentials.");
      return false;
    }

    return true;

    // if (response.phone_number) {
    //   //
    //   setTimeout(() => {
    //     callPrompt("Change Phone Number", "", "Close", "Phone Number changed successfully");
    //   }, 1000);
    //   setPhone("");
    //   setPassword("");
    // }
  }

  const orderPlacement = async () => {
    let uprof = JSON.parse(window.localStorage.getItem("user-profile"));
    let userInfo;

    if (uprof.user.is_staff) {
      userInfo = await new Users().getAdminProfile();
    } else {
      if (uprof.user.is_organization) {
        userInfo = await new Users().getBusinessProfile();
      } else {
        userInfo = await new Users().getUserProfile();
      }
    }

    userProfile(userInfo);

    let orderdata = [];
    cart.map((item) => {
      return orderdata.push({
        id: item.product_id,
        quantity: item.qty,
      });
    });


    try {
      callPrompt(
        "Order Placement",
        "",
        "",
        "Processing your order(s)."
      );
      const newcart = await new ProductOrders().createCart()
      const rs = await new ProductOrders().placeOrderSignIn(cart_id || newcart.key);
      if (rs) {

        setDoneorder(true);
        callPrompt("Order Placement", "", "close", "Your order has been placed successfully. The business owner will call you to discuss delivery and payment terms.");
        window.localStorage.removeItem("cart_id");

        dispatch({
          type: "UPDATE_CART",
          payload: [],
        });
      }

      dispatch({ type: "SET_GUEST", payload: null });
      return true;
    } catch (error) {
      callPrompt(
        "Order Placement",
        "",
        "close",
        "Problem placing order. Please try again"
      );
      return false;

    }
  }


  const submitChangePhone = async (e) => {
    e.preventDefault();
    addPhoneNumber()

  };

  const handleClose = () => {
    if (doneOrder) {
      router.push("/market");
    } else {
      router.push("/cart");
    }
    setShow(false);
  };

  const userProfile = (userInfo) => {
    window.localStorage.setItem("user-profile", JSON.stringify(userInfo));
    dispatch({
      type: "SET_USERINFO",
      payload: userInfo,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (profile.user.phone_number != "") {
      await orderPlacement()
    } else {
      const addPhoneSuccess = await addPhoneNumber()
      if (addPhoneSuccess) {
        await orderPlacement()
      }
      else {
        
      }
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
      <div className="" >
        <div
          className="modal fade "
          id="checkout1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{ margin: "auto", width: "70%" }}>
              <div className="modal-body">
                <div className="checkoutcontent">
                  <div>
                    <h3 className="modalheading mt-5">
                      Complete your order
                    </h3>
                  </div>
                  <br />
                  <form>
                    <div className="form-group">
                      {profile &&
                        profile.user.is_organization === false &&
                        profile.user.phone_number === "" ? (
                          <>
                            <div>
                              <label htmlFor="InputEmail" className="formlabel">
                                Telephone Number
                            </label>
                              <input
                                type="tel"
                                className="form-control form-rounded"
                                id="modalnumber"
                                value={newPhone}
                                placeholder="Please enter your telephone number"
                                onChange={(e) => setNewPhone(e.target.value)}
                              />
                              <br />

                              <label htmlFor="InputEmail" className="formlabel">
                                Password
                                </label>
                              <div className="row form-group account-email-body">
                                <input
                                  type={togglepasswordeye ? "text" : "password"}
                                  id="account-input-password"
                                  className="form-control form-rounded mail-pass-input2"
                                  placeholder="Confirm number with password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
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

                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                      {profile &&
                        profile.user.is_organization &&
                        profile.user.phone_number === "" ? (
                          <>
                            <div>
                              <label htmlFor="InputEmail" className="formlabel">
                                Telephone Number
                            </label>
                              <input
                                type="number"
                                className="form-control form-rounded"
                                id="modalnumber"
                                value={newPhone}
                                placeholder="Please enter your telephone number"
                                onChange={(e) => setNewPhone(e.target.value)}
                              />
                              <br />

                              <label htmlFor="InputEmail" className="formlabel">
                                Password
                                </label>
                              <div className="row form-group account-email-body">
                                <input
                                  type={togglepasswordeye ? "text" : "password"}
                                  id="account-input-password"
                                  className="form-control form-rounded mail-pass-input2"
                                  placeholder="Confirm number with password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
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

                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                      <div className="form-group">
                        <div className="d-flex mt-5 mb-2">
                          <span className="fe fe-info mr-1" />
                          <h6>
                            Phone number provided in your profile will be used to place the order
                        </h6>
                        </div>
                        <button
                          data-dismiss="modal"
                          type="submit"
                          id="placeorder_button"
                          className="btn btn-primary btn-block authbtn"
                          onClick={handleSubmit}
                        >
                          Continue
                        </button>
                      </div>

                    </div>
                    <br />
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
export default CheckoutModalSignedin;
