import React, { useContext } from "react";
import { Store } from "../contextStore";
import { Button } from "react-bootstrap";
import CheckoutModalSignedin from "./CheckoutModalSignedin";
import CheckoutModalloggedout from "./CheckoutModalloggedout";
import ReactTooltip from "react-tooltip";
import Link from "next/link";
import { useRouter } from "next/router";

function CartLogout() {
  const navFontSize = {
    fontSize: "18px",
  };

  const { state } = useContext(Store);
  const router = useRouter();

  return (
    <>
      <div className="dropdown d-md-flex header-message">
        <a
          className="nav-link icon mobile-cart-position"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <div data-tip="Shopping cart">
            <i className="fe fe-shopping-cart" />

            {state.cart.length > 0 ? (
              <span className="nav-unread badge badge-danger">
                {state.cart.length}
              </span>
            ) : (
              <></>
            )}
            <ReactTooltip effect="solid" />
          </div>
        </a>

        <div className="dropdown-menu cartdrop dropdown-menu-left">
          <ul className="cartlimit">
            {state.cart.length > 0 ? (
              <>
                {state.cart.map((item: any, index: number) => (
                  <div key={index}>
                    <div className="row border-bottom mb-3">
                        <div className="col-xl-4 col-lg-4 feature">
                          <div className="mb-3">
                            <img
                              className="imgcontainer mt-2"
                              src={`${process.env.URL}${item.img}` ? `${process.env.URL}${item.img}` : "/assets/images/new-default.jpg"}
                            />
                          </div>
                        </div>
                        <div className="col-xl-8 col-lg-8">
                          <div className="mt-1 ml-3">
                            <h6 className="font-weight-semibold">
                              {item.name}
                            </h6>
                            <p className="text-default">
                              Price:{ (parseFloat(item.price) - (parseFloat(item.discount) / 100 * parseFloat(item.price)))} <br />
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                  </div>
                ))}
                <div className="row justify-content-center">
                  <b>TOTAL PRICE: </b>{" "}
                  <span className="ml-3">
                  GH??{" "}
                    {state.cart
                      .map(
                        (item: any) => ((item.price - ((item.discount/100)*item.price)) * item.quantity)
                      )
                      .reduce((pv, cv) => pv + cv, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </>
            ) : (
              <>
                <h6 className="cartempty">Your cart is empty</h6>
              </>
            )}
          </ul>
          {state.cart.length > 0 ? (
            <div
              style={{
                alignItems: "center",
                padding: "1rem",
                borderTop: "1px solid #e9ecef",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <Link href="/cart"> */}
                <Button className="viewemptycart" onClick={()=>router.push("/cart")}>View Cart</Button>
              {/* </Link> */}
            </div>
          ) : (
            <></>
          )}
          {/* <CheckoutModalSignedin /> */}
        </div>
      </div>
    </>
  );
}

export default CartLogout;

function cartdropdown() {
  var toggle = document.getElementById("cartlist");
  toggle.style.display = toggle.style.display == "block" ? "none" : "block";
}