import Prompt from "../../components/Prompt";
import { useEffect, useState, useContext } from "react";
import MainLayout from "../../components/MainLayout";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { Store } from "../../contextStore";
import { ProductOrders } from "../../lib/endpoints";
import { PropagateLoader } from 'react-spinners';
import { Carousel } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import { Products } from "../../lib/endpoints";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { title } from "process";
import Link from "next/link";

export default function ProductPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [product, setProduct] = useState([]);
  const [description, setDesciption] = useState("");
  const [qty, setQty] = useState(1);
  const [owner, setOwner] = useState<any>({});
  const [prodid, setProdid] = useState<any>();
  const [name, setName] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [discount, setDiscount] = useState<any>();
  const [product_type, setProductType] = useState<any>();
  const [image_1, setImage1] = useState<any>();
  const [image_2, setImage2] = useState<any>();
  const [image_3, setImage3] = useState<any>();
  const [cart, setCart] = useState([]);
  const [modalImage, setModalImage] = useState("");
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [show, setShow] = useState(false);
  const [added, setAdded] = useState(false);
  const [cart_id, setCartid] = useState<any>();
  const [discountedPrice, setDiscontedPrice] = useState<any>();
  const [mainPic, setMainPic] = useState('');
  const [isReady, setIsReady] = useState(false);

  const handleClose = () => {
    // if (added) {
    //   router.push("/market");
    // }
    setShow(false);
  };
  useEffect(() => {
    async function init() {
      const data = await localStorage.getItem("cart");
      setCart(JSON.parse(data));
    }
    init();
  }, []);
  useEffect(() => {
    let discountedPrice = (price - (discount / 100) * price).toFixed(2);
    setDiscontedPrice(discountedPrice);
  }, [price, discount]);

  useEffect(() => {
    (async () => {
      const productid = window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      );
      const res = await new Products().getProductDetails(productid);

      setDiscount(res.discount);
      setName(res.name);
      setPrice(res.price);
      setProdid(res.id);
      setProductType(res.product_type);
      setDesciption(res.description);
      setOwner(res.owner);
      setMainPic(res.image_1);
      setImage1(res.image_1);
      setImage2(res.image_2);
      setImage3(res.image_3);
      setIsReady(true);

    })();

    let key = window.localStorage.getItem("cart_id");
    setCartid(key);
  }, []);

  const handleQty = (e) => {
    let _qty: any = Number(e.target.value);
    setQty(_qty);
  };



  const handleSubmit = async () => {
    // ADD TO CART
    const found = state.cart.find((item: any) => item.product == prodid);
    if (found) {
      callPrompt("Add to cart", "", "Okay", "Item already in cart.");
      return;
    }
    try {
      const addItem = await new ProductOrders().addItem(prodid, qty, cart_id);
      if (addItem) {
        dispatch({
          type: "SET_CART",
          payload: {
            discount: addItem.discount,
            key: addItem.key,
            img: addItem.img.substring(addItem.img.indexOf("/media")),
            name: addItem.name,
            price: addItem.price,
            price_total: addItem.price_total,
            product: addItem.product,
            quantity: addItem.quantity,
          },
        });
        setAdded(true);
        callPrompt(
          "Add to cart",
          "",
          "Okay",
          "Success: Item has been placed in your cart, yay! Continue shopping."
        );
      }
    } catch (error) {
      setAdded(false);
      callPrompt(
        "Add to cart",
        "",
        "Okay",
        "Failed: Please try adding to cart again."
      );
    }
  };

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
  return (
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

      {product_type != "SE" ? (
        <div className="row page-header">
          <h1 className="page-title">Product Details</h1>
        </div>
      ) : (
          <div className="row page-header">
            <h1 className="page-title">Service Details</h1>
          </div>
        )}

      {/* the left view content containing the images */}
      <div className="row">

        {
          !isReady ?
            (
              <div className="" style={{ margin: "auto", marginTop: "50px" }}>
                <PropagateLoader size={30} color="#1b98e0" loading />
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-md-6" >
                    {image_1 ?
                      <div style={{ width: "100%", overflow: "hidden", height: "350px", borderRadius: "10px" }}>
                        <img src={mainPic} data-toggle="modal" data-target=".bd-example-modal-lg" className="hoverEffect" style={{ cursor: "pointer", width: "100%", height: "350px", objectFit: "cover", borderRadius: "10px", transition: "transform .5s ease" }} alt={name} />
                      </div>
                      : <img src="/assets/images/new-default.jpg" style={{ width: "100%", height: "350px", objectFit: "cover" }} alt="default-image" />
                    }

                    <div className="row mt-4">
                      {!image_2 && !image_3 ? null :
                        <div className="col">
                          <div style={{ width: "100%", overflow: "hidden", height: "150px", borderRadius: "10px" }}>
                            <img onClick={() => { setMainPic(`${image_1}`) }} className="hoverEffect" src={image_1} style={{ cursor: "pointer", width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }} alt={name} />
                          </div>
                        </div>
                      }

                      {image_2 ?
                        <div className="col">
                          <div style={{ width: "100%", overflow: "hidden", height: "150px", borderRadius: "10px" }}>
                            <img onClick={() => { setMainPic(`${image_2}`) }} className="hoverEffect" src={image_2} style={{ cursor: "pointer", width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }} alt={name} />
                          </div>
                        </div>
                        : null}

                      {image_3 ?
                        <div className="col">
                          <div style={{ width: "100%", overflow: "hidden", height: "150px", borderRadius: "10px" }}>
                            <img onClick={() => { setMainPic(`${image_3}`) }} className="hoverEffect" src={image_3} style={{ cursor: "pointer", width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }} alt={name} />
                          </div>
                        </div>
                        : null}

                    </div>



                    {/* Modal */}
                    <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <span className="fe fe-x-circle" data-dismiss="modal" style={{float:"right",width:"10%",marginTop:"10px",marginRight:"30px",color:"white",fontSize:"40px",position:"absolute",right:"0",fontWeight:900}}></span>
                      <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">

                          {/* carousel */}
                          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                              <div className="carousel-item active">
                                <img src={image_1} alt={name} style={{ width: "100%" }} />
                              </div>

                              {image_2 ?
                                <div className="carousel-item">
                                  <img src={image_2} alt={name} style={{ width: "100%" }} />
                                </div>
                                : null}

                              {image_3 ?
                                <div className="carousel-item">
                                  <img src={image_3} alt={name} style={{ width: "100%" }} />
                                </div>
                                : null}
                            </div>

                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                              <span className="carousel-control-prev-icon" style={{ width: "100px", height: "100px" }} aria-hidden="true"></span>
                              <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                              <span className="carousel-control-next-icon" style={{ width: "100px", height: "100px" }} aria-hidden="true"></span>
                              <span className="sr-only">Next</span>
                            </a>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                  {/* end of the left view content */}

                  {/* the right view content containing product details */}
                  <div className="col-md-6">
                    <div className="row addcartfields mb-3">
                      {product_type != "SE" ? (
                        <input
                          style={{ textAlign: "center" }}
                          className="form-control quantityInput mr-2"
                          placeholder="Qty"
                          type="number"
                          name="productquantity"
                          id="productquantity"
                          defaultValue={qty}
                          onChange={handleQty}
                          min={1}
                        />
                      ) : (
                          ``
                        )}

                      <button
                        className="btn btn-primary btn-block addcart-btn"
                        onClick={handleSubmit}
                        disabled={qty < 1 || qty % 1 !== 0}
                      >
                        Add to cart
                        </button>
                    </div>
                    <div className="row ml-2">
                      <h3 className="product-Name capitalize-text">{name}</h3>
                    </div>
                    <div className="row ml-2">
                      <div className="mr-3">
                        <p className="product-Price">GH¢ {discountedPrice}</p>
                      </div>
                      {discount != 0 ? (
                        <div className="mr-3 discount-price text-muted">
                          <p className="product-Price ">GH¢ {price}</p>
                        </div>
                      ) : (
                          ``
                        )}
                      {discount != 0 ? (
                        <div className="mr-3 ml-3">
                          <span className="badge badge-primary discount-badge mt-1">
                            {discount}% off
                            </span>
                        </div>
                      ) : (
                          ``
                        )}
                    </div>
                    <div className="mt-1 ml-2 mr-3 productDescription bulletpoint">
                      <ShowMoreText
                        lines={3}
                        more="Read more"
                        less="Read less"
                        expanded={false}
                        width={600}
                      >
                        {ReactHtmlParser(description)}
                      </ShowMoreText>
                    </div>
                    <div className="row ml-1 mb-2 supplier-info">
                      <div className="col-md-12">Posted by</div>
                      <div className="row ml-2">

                         {
                          owner.slug != "" && owner.slug != "-None" ? (
                            <Link href="/shops/[shops]"
                              as={`/shops/${owner.slug}`}
                            >
                              <img
                                style={{ cursor: "pointer" }}
                                className=" businesslogo mt-4 mb-1 mr-1"
                                src={
                                  owner.image ? owner.image : "/assets/images/Profile_Icon.png"
                                }
                                alt=""
                              />
                            </Link>
                          ) : (
                              
                              <img
                                style={{ cursor: "pointer" }}
                                className=" businesslogo mt-4 mb-1 mr-1"
                                src={
                                  owner.image ? owner.image : "/assets/images/Profile_Icon.png"
                                }
                                alt=""
                              />
                            )
                        }
                        {
                          owner.slug != "" && owner.slug != "-None" ? (
                            <Link href="/shops/[shops]"
                              as={`/shops/${owner.slug}`}
                            >
                              <p className="mt-5 mb-5 ml-2 bsuiness-page" style={{ cursor: "pointer" }}>
                                {owner.title ? owner.title : "No name"}
                              </p>
                            </Link>
                          ) : (

                              <p className="mt-5 mb-5 ml-2 bsuiness-page" style={{ cursor: "pointer" }}>
                                {owner.title ? owner.title : "No name"}
                              </p>
                            )
                        } 

                      </div>

                      {owner.phone_number != "" ? (
                        <div className="col-md-12 owner-location">
                          <strong className="">Telephone:</strong> <a style={{ color: "inherit" }} href={`tel:${owner.phone_number}`}>{owner.phone_number}</a>
                        </div>
                      ) : (
                          <p className="owner-location col-md-12">
                            <strong className="">Telephone: Not provided</strong>
                          </p>
                        )}

                      {owner.city != "" ? (
                        <div className="owner-location ml-3">
                          <strong className="">Location:</strong> {owner.city},
                          {
                            owner.region === "vr" ? " Volta Region"
                              : owner.region === "wr" ? " Western Region"
                                : owner.region === "as" ? " Ashanti Region"
                                  : owner.region === "ba" ? " Brong Ahafo Region"
                                    : owner.region === "be" ? " Bong-East Region"
                                      : owner.region === "ah" ? " Ahafo Region"
                                        : owner.region === "cr" ? " Central Region"
                                          : owner.region === "er" ? " Eastern Region"
                                            : owner.region === "gr" ? " Greater Accra Region"
                                              : owner.region === "nr" ? " Northern Region"
                                                : owner.region === "sa" ? " savannah Region"
                                                  : owner.region === "ne" ? " North East Region"
                                                    : owner.region === "ue" ? " Upper East Region"
                                                      : owner.region === "uw" ? " Upper West Region"
                                                        : owner.region === "ot" ? " Oti Region"
                                                          : owner.region === "wn" ? " Western North Region"
                                                            : ""
                          }
                        </div>
                      ) : (
                          <p className="owner-location col-md-12">
                            <strong className="">Location: Not Provided</strong>
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              </>
            )
        }

      </div>


    </MainLayout >
  );
}