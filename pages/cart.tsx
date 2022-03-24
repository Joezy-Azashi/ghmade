import React, { useEffect, useState, useContext } from "react";
import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import CheckoutModalloggedout from "../components/CheckoutModalloggedout";
import CheckoutModalSignedin from "../components/CheckoutModalSignedin";
import MainLayout from "../components/MainLayout";
import { Store } from "../contextStore";
import { ProductOrders } from "../lib/endpoints";
import Prompt from "../components/Prompt";
import { useRouter } from "next/router";

import Accounting from "accounting-js";

function cart() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [cart, setCart] = useState([]);
  const [carttotal, setCarttotal] = useState(0);
  const [isLoggedin, setIsloggedin] = useState<boolean>();
  const [profile, setProfile] = useState();
  const [quantity, setQuantity] = useState<any>(1);
  const [cart_id, setCartid] = useState<any>();
  const [removed, setRemoved] = useState(false);
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [product_id, setProductid] = useState<any>();
  const [cpa, setCpa] = useState(false);

  const [enable, setEnable] = useState<any>();

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
    if (removed) {
      // window.location.reload();
      router.push("/cart");
    }
    setShow(false);
  };

  const trashItem = async (id) => {
    let key = window.localStorage.getItem("cart_id");
    try {
      const removeItem = await new ProductOrders().removeItem(key, id);
      let cart = state.cart;
      cart.splice(
        cart.findIndex((item) => item.key === id),
        1
      );

      setCart(cart);

      if (removeItem) {
        let cart = state.cart;
        dispatch({
          type: "UPDATE_CART",
          payload: cart,
        });
        setRemoved(true);
        router.push("/cart");
        // callPrompt(
        //   "Remove from cart",
        //   "",
        //   "Close",
        //   "Success: Item has been removed from your cart! Continue shopping."
        // );
      }
    } catch (error) {
      setRemoved(false);
      callPrompt(
        "Remove from cart",
        "",
        "Okay",
        "Failed: Item removal has failed. Please try again."
      );
    }
  };

  const sumTotal = (arr) =>
    arr.reduce(
      (sum, { price, discount, quantity }) =>
        sum + (price - (discount / 100) * price) * quantity,
      0
    );

  useEffect(() => {
    if (state.cart && state.cart.length > 0) {
      setCart(state.cart);
      setCarttotal(sumTotal(state.cart));
    }
  }, [state]);

  useEffect(() => {
    setCart(state.cart);
    state.cart && state.cart.length > 0
      ? setCarttotal(sumTotal(state.cart))
      : null;
    let key = window.localStorage.getItem("cart_id");
    setCartid(key);
    let userprofile: any = JSON.parse(
      window.localStorage.getItem("user-profile")
    );

    setProfile(userprofile);
    let lStorage: any = window.localStorage.getItem("cp-a");
    lStorage = JSON.parse(lStorage);
    if (lStorage) {
      setCpa(true);
      setIsloggedin(true);
    } else {
      setIsloggedin(false);
    }
  }, []);

  const adjustQty = async (e: any, id) => {
    setProductid(id);
    setQuantity(Number(e.target.value));
    let key = window.localStorage.getItem("cart_id");

    let tempcart = state.cart;
    let ind = tempcart.map((el) => el.key).indexOf(id);
    tempcart[ind].quantity = Number(e.target.value);

    try {
      let updateQuantity = await new ProductOrders().updateQuantity(
        key,
        id,
        Number(e.target.value)
      );

      if (updateQuantity) {
        dispatch({
          type: "UPDATE_CART",
          payload: tempcart,
        });

        state.cart && state.cart.length > 0
          ? setCarttotal(sumTotal(state.cart))
          : null;
        let quantityCheck = tempcart.find((el) => el.quantity < 1);

        if (quantityCheck) {
          setEnable(true);
        } else {
          setEnable(false);
        }
      }
    } catch (error) { }
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
      <MainLayout>
        <div className="page-header">
          <h1 className="page-title">Shopping Cart</h1>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="row mb-0">
              <Card className="firstcard">
                <ListGroup variant="flush" className="mt-2 mb-2">
                  <ListGroup.Item style={{ height: "38px" }}>
                    <div className="row justify-content-between cartitemscard">
                      <div>
                        <h6
                          className="ml-2"
                          style={{ fontWeight: "bold", color: "#3F3D56" }}
                        >
                          Cart items
                        </h6>
                      </div>

                      <div style={{ marginTop: "-3px" }}>
                        <Badge
                          variant="danger"
                          className="cartitemsnumber mr-3"
                        >
                          <h6 className="cartnum">
                            {state.cart ? state.cart.length : 0}
                          </h6>
                        </Badge>
                      </div>
                    </div>
                  </ListGroup.Item>
                  {/* {cpa ? (
                    <ListGroup.Item>
                      <div className="row cartitemscard">
                        <h6
                          className="mt-2 ml-2"
                          style={{ fontWeight: "bold", color: "#3F3D56" }}
                        >
                          Shopping history
                        </h6>
                      </div>
                    </ListGroup.Item>
                  ) : (
                      <>
                        <ListGroup.Item>
                      <div className="row cartitemscard">
                        <h6
                          className="mt-2 ml-2"
                          style={{ fontWeight: "bold", color: "#818aa9" }}
                        >
                          Shopping history
                        </h6>
                      </div>
                    </ListGroup.Item>
                      </>
                    )} */}
                </ListGroup>
              </Card>
            </div>
          </div>

          <div className="col-md-8">
            <Card>
              <Card.Header className="row orderlists">
                <div className="col-5">
                  <h6 className="text-muted" style={{ fontWeight: "bold" }}>
                    Items
                  </h6>
                </div>
                <div
                  className="col-7 d-flex justify-content-between cardheadthree"
                  style={{ margin: 0, padding: 0 }}
                >
                  <div
                    className="row"
                    style={{
                      margin: 0,
                      padding: 0,
                      width: "100%",
                    }}
                  >
                    <div className="col-3 wholecolumn">
                      <h6 className="text-muted" style={{ fontWeight: "bold" }}>
                        Quantity
                      </h6>
                    </div>
                    <div
                      className="col-3 pl-3 wholecolumn "
                      style={{ margin: 0, padding: 0 }}
                    >
                      <h6 className="text-muted" style={{ fontWeight: "bold" }}>
                        Unit Price
                      </h6>
                    </div>
                    <div
                      className="col-4 pl-3 wholecolumn"
                      style={{ margin: 0, padding: 0 }}
                    >
                      <h6 className="text-muted" style={{ fontWeight: "bold" }}>
                        Total Price
                      </h6>
                    </div>
                    <div className="col-2 wholecolumn">
                      <h6
                        className="text-muted text-right"
                        style={{ fontWeight: "bold" }}
                      >
                        Action
                      </h6>
                    </div>
                  </div>
                </div>
              </Card.Header>
              <ListGroup variant="flush">
                {cart.length > 0 ? (
                  cart.map((prod: any, index: any) => {
                    return (
                      <ListGroup.Item key={index} className="tableposition">
                        <div className="row justify-content-between ">
                          <div className="col-md-5 ">
                            <div className="row">
                              <div className="col-md-3 mt-1">
                                <img
                                  className="cartimgcontainer"
                                  src={`${process.env.URL}${prod.img}`}
                                />
                              </div>

                              <div className="col-md-9 mt-5">
                                <h6 className="productname">{prod.name}</h6>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-7">
                            <div className="row justify-content-between mt-4">
                              <div className="col-md-3">
                                <input
                                  id="cartquantity"
                                  className="form-control form-rounded qtybox"
                                  type="number"
                                  placeholder="Qty"
                                  min={1}
                                  // defaultValue={prod.quantity}
                                  value={prod.quantity}
                                  onChange={(e) => adjustQty(e, prod.key)}
                                />
                              </div>

                              <div className="col-3 col-md-3 mt-2 wholecolumn ">
                                <h6>
                                  GH¢{" "}
                                  {prod.price -
                                    (prod.discount / 100) * prod.price}
                                </h6>
                              </div>

                              <div className="col-4 mt-2 itemprice">
                                <h6>
                                  <span>GH¢ </span>
                                  {Accounting.formatMoney(
                                    (prod.price -
                                      (prod.discount / 100) * prod.price) *
                                    prod.quantity,
                                    { symbol: "", format: "%v %s" }
                                  )}
                                </h6>
                              </div>

                              <div
                                className="col-2 mt-1"
                                title="Delete"
                                onClick={() => trashItem(prod.key)}
                              >
                                <i className="fe fe-trash-2 cart-delete"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ListGroup.Item>
                    );
                  })
                ) : (
                    <div className="row justify-content-center mt-6">
                      <ListGroup variant="flush" className="emptycart">
                        <div className="emptycartinfo ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="0.5" stroke-linecap="round"
                            stroke-linejoin="round" className="feather feather-shopping-cart">
                            <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        </div>
                        <div className="row emptycartMessage">
                          <p> You have no items in your cart</p>
                        </div>
                      </ListGroup>
                    </div>
                  )}
                <hr />

                {state.cart && state.cart.length > 0 ? (
                  <div className="row">
                    <div className="col-md-6"></div>

                    <div className="col-md-6 ml-0  d-flex cartfoot">
                      <Button
                        className="checkoutbtn mb-5 mt-1  ml-0 justify-content-center"
                        data-toggle="modal"
                        data-target={isLoggedin ? "#checkout1" : "#checkout2"}
                        disabled={enable}
                      >
                        Place order
                      </Button>

                      <div className="mt-3 ml-5">
                        <h6>
                          Total: GH¢ {" "}
                          {Accounting.formatMoney(carttotal, {
                            symbol: "",
                            format: "%v %s",
                          })}
                        </h6>
                      </div>
                    </div>
                  </div>
                ) : (
                    ""
                  )}
              </ListGroup>
            </Card>
          </div>
        </div>
        {/* <CheckoutModalSignedin cart={cart} uprofile={profile} /> */}
        <CheckoutModalSignedin cart={state.cart} />
        <CheckoutModalloggedout cart={state.cart} />
      </MainLayout>
    </>
  );
}

export default cart;