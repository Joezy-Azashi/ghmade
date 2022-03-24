import React from 'react';
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { Store } from "../contextStore";
import Prompt from "../components/Prompt";
import { useRouter } from "next/router";
import { ProductOrders } from "../lib/endpoints";
import Accounting from "accounting-js";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

const ProductCard = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [imagee, setImagee] = useState([])

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [cart_id, setCartid] = useState<any>();
  const [discountedPrice] = useState(
    (product.price - (product.discount / 100) * product.price).toFixed(2)
  );
  const [enabled, setEnabled] = useState(true)
  const [show, setShow] = useState(false);
  //hook for preloader
  const [preloaderShow, setPreloaderShow] = useState(true)

  useEffect(() => {
    
    (async () => {
      setImagee(product)
      // const newcart = await new ProductOrders().createCart();
      // setCartid(newcart.key);
      
    })()
    let key = window.localStorage.getItem("cart_id");
    setCartid(key);
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

  const handleClose = () => {
    if (added) {
      // window.location.reload();
      router.push("/market");
    }
    setShow(false);
  };

  const addTocart = async () => {

    // ADD TO CART
    const found = state.cart.find((item: any) => item.product == product.id);
    if (found) {
      callPrompt("Add to cart", "", "Close", "Item already in cart.");
      return;
    }
    try {
      const prodid = product.id;
      const addItem = await new ProductOrders().addItem(prodid, qty, cart_id);
      if (addItem) {
        dispatch({
          type: "SET_CART",
          payload: {
            discount: addItem.discount,
            // id: cart_id,
            key: addItem.key,
            // img: product.image_1.substring(product.image_1.indexOf("/media")),
            img: addItem.img.substring(addItem.img.indexOf("/media")),
            name: addItem.name,
            price: addItem.price,
            // price_total: product.price * qty,
            price_total: addItem.price_total,
            product: addItem.product,
            quantity: addItem.quantity,
          },
        });
        setAdded(true);
      }
      
    } catch (error) {
      setAdded(false);
      callPrompt(
        "Add to cart",
        "",
        "Close",
        "Failed: Please try adding to cart again."
      );
    }
  };

  return (


    <div className="col-xl-3 col-lg-4 col-md-6" id="product-card-div">
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

      <div className="card card-hover" id="product-card">
        <button
          id="cart-button"
          title="Add to cart"
          className="btn btn-info card-shopping"
          onClick={addTocart}
          disabled={(qty < 1) || ((qty % 1) !== 0)}
        >
          <i className="fe fe-shopping-cart cart-icon"></i>
        </button>

        <Link href="/market/[id]" as={`/market/${product.id}`}>

          <div style={{ width: "100%", overflow: "hidden", borderRadius: "10px 10px 0 0", height: "100%" }}>
              <img
              src={
                product.image_1
                  ? product.image_1
                  : "/assets/images/new-default.jpg"
              }
              id="product-image"
              className="card-img-top mx-auto card-image market-product-image hoverEffect"
              style={{ transition: "transform .5s ease" }}
              alt="..."
            />      

          </div>
        </Link>
        <div className="card-body" id="product-card-body" style={{ paddingBottom: "5px" }}>
          <Link href="/market/[id]" as={`/market/${product.id}`}>
            <div className="row" id="product-card__inner-row-name">
              <h5 className="market-product-name capitalize-text">{product.name}</h5>
            </div>
          </Link>

          {product.product_type === "PR" ? (
            <div className="row justify-content-between">
              <div className="row justify-content-start mt-3 market-price" id="product-card__inner-row-price">
                <div>
                  <span>
                    <p className="ml-3 bold">
                      GH¢ {" "}{Accounting.formatMoney(product.price - product.price * (product.discount / 100), { symbol: "", format: "%v %s" })}
                    </p>
                  </span>
                </div>

                {product.discount != 0 ?
                  <div>
                    <span>
                      <p className="discount-price ml-2"
                        style={{ width: "62px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                        {product.price}</p>
                    </span>
                  </div>
                  : ``}


              </div>


              <div className="mb-1">
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="form-control form-rounded cart-quantity"
                  placeholder="Qty:"
                  // defaultValue={qty}
                  onChange={(e: any) => {
                    if ((e.target.value.indexOf(".")) === -1) {
                      let _qty: any = Number(e.target.value);
                      setQty(_qty);
                    } else {
                      setQty(0)
                    }
                  }}
                ></input>
              </div>
            </div>

          ) : (
              <>
                <Link href="/market/[id]" as={`/market/${product.id}`}>
                  <div className="row mt-2 pb-1" id="product-card__inner-row-price">
                    <p className="bold read-more"> Read More </p>
                  </div>
                </Link>
              </>
            )}

          {product.owner.title != "" ?
            <div className="row">
              <h6 className="bold product-owner">By {product.owner.title}</h6>
            </div>
            :
            <div className="mt-5"></div>
          }

        </div>
      </div>

    </div>
  );
};

export default React.memo(ProductCard);