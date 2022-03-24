import Link from "../../components/Link";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Store } from "../../contextStore";
import CartLogout from "../CartLogout";
import CartSignin from "../CartSignin";
import NavbarLogin from "../NavbarLogin";
import NavbarTemp from "../NavbarTemp";
import { ProductOrders } from "../../lib/endpoints";

const navFontSize = {
  fontSize: "18px",
};
const Navbar = (props) => {
  const [isAuthPages, setTempHolder] = useState(false);

  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    // FETCH CART IF EXIST
    (async () => {
      try {
        if (window.localStorage.getItem("guest_to_loggedin")) {
          let guest_to_loggedin = JSON.parse(
            window.localStorage.getItem("guest_to_loggedin")
          );

          const createcart = await new ProductOrders().createCart();
          window.localStorage.setItem("cart_id", createcart.key);

          let cpa = window.localStorage.getItem("cp-a");
          if (cpa) {
            for (let i: any = 0; i < guest_to_loggedin.cart.length; i++) {
              await new ProductOrders().addItem(
                guest_to_loggedin.cart[i].product,
                guest_to_loggedin.cart[i].quantity,
                createcart.key
              );
            }
            if (state.cart.length <= 0)
              dispatch({
                type: "UPDATE_CART",
                payload: guest_to_loggedin.cart,
              });
            window.localStorage.removeItem("guest_to_loggedin");
          }
        } else {
          if (window.localStorage.getItem("cart_id")) {
            let key = window.localStorage.getItem("cart_id");
            const getCartItems = await new ProductOrders().getItems(key);
            if (state.cart.length <= 0)
              dispatch({
                type: "UPDATE_CART",
                payload: getCartItems.shopping_cart_items,
              });
          } else {
            const createcart = await new ProductOrders().createCart();
            window.localStorage.setItem("cart_id", createcart.key);
            const getCartItems = await new ProductOrders().getItems(
              createcart.key
            );
            if (state.cart.length <= 0)
              dispatch({
                type: "UPDATE_CART",
                payload: getCartItems.shopping_cart_items,
              });
          }
        }
      } catch (error) {}
    })();

    let cpa = window.localStorage.getItem("cp-a");
    if (cpa) {
      dispatch({
        type: "SET_LOGGEDIN",
        payload: true,
      });
    } else {
      dispatch({
        type: "SET_LOGGEDIN",
        payload: false,
      });
    }
  }, []);

  useEffect(() => {
    let lStorage: any = window.localStorage.getItem("cp-a");
    lStorage = JSON.parse(lStorage);
    if (lStorage) {
      let userprofile: any = JSON.parse(
        window.localStorage.getItem("user-profile")
      );

      dispatch({
        type: "SET_USERINFO",
        payload: userprofile,
      });
    }

    if (
      router.pathname.includes("/login") ||
      router.pathname.includes("/signup") ||
      router.pathname.includes("/confirmaccount") ||
      router.pathname.includes("/forgottenpassword") ||
      router.pathname.includes("/resetpassword")
    ) {
      setTempHolder(false);
    } else {
      setTempHolder(true);
    }
  }, []);

  return (
    <div
      className="hor-header header d-flex navbar-collapse sticky sticky-pin"
      style={{
        height: "80px !important",
        zIndex: 999,
      }}
    >
      <div className="container">
        <div className="d-flex">
          <a className="animated-arrow hor-toggle horizontal-navtoggle">
            <span />
          </a>

          {/* Logo */}
          <Link href="/market">
            <a className="header-brand log">
              <img
                src="/assets/images/final_ghmade.png"
                className="header-brand-img main-logo"
                alt="logo"
                style={{ marginLeft: "0.2em", marginBottom: "10px" }}
              />
            </a>
          </Link>

          {/* Logo ends here */}

          {state.loggedin ? (
            <NavbarLogin />
          ) : isAuthPages ? (
            <NavbarTemp />
          ) : (
            <Link href="/market">
              <a className="header-brand">
                <img
                  src="/assets/images/final_ghmade.png"
                  className="header-brand-img login-logo"
                  alt="logo"
                />
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

