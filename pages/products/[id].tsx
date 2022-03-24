import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { Badge } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import { Products } from "../../lib/endpoints";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Prompt from "../../components/Prompt";

export default function ProductPage() {
  const router = useRouter();

  const [product, setProduct] = useState([]);
  const [owner, setOwner] = useState<any>({});
  const [name, setName] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [image, setImage] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [show, setShow] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [galleryList, setGalleryList] = useState<any>();
  const [id, setId] = useState<any>();
  const [discount, setDiscount] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [image_1, setImage1] = useState<any>();
  const [image_2, setImage2] = useState<any>();
  const [image_3, setImage3] = useState<any>();
  const [mainPic, setMainPic] = useState('');

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

  const onClickNext = () => {
    if (imgIndex + 1 === galleryList.length) {
      setImgIndex(0);
    } else {
      setImgIndex(imgIndex + 1);
    }
  };

  const onClickPrevious = () => {
    if (imgIndex - 1 === -1) {
      setImgIndex(galleryList.length - 1);
    } else {
      setImgIndex(imgIndex - 1);
    }
  };

  const removeProducts = async () => {
    try {
      callPrompt("Edit Product", "", "", "Please wait...");
      let result = await new Products().removeProduct(id)
      callPrompt(
        "Add Product",
        "/products/viewmyproducts",
        "Close",
        "Product Deleted Successfully"
      );
    } catch (error) {

    }
  }

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    (async () => {
      const productid = window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      );
      const res = await new Products().getProductDetails(productid);
      setGalleryList([res.image_1, res.image_2, res.image_3]);

      setDescription(res.description);
      setName(res.name);
      setPrice(res.price);
      setDiscount(res.discount);
      setId(res.id);
      setMainPic(res.image_1);
      setImage1(res.image_1);
      setImage2(res.image_2);
      setImage3(res.image_3);
    })();
  }, []);

  return (
    <MainLayout title={name}>
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
      <div className="page-header">
        <h1 className="page-title">My Products & Services</h1>
      </div>

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
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">

                {/* carousel */}
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src={image_1} alt={name} style={{ width: "100" }} />
                    </div>

                    {image_2 ?
                      <div className="carousel-item">
                        <img src={image_2} alt={name} style={{ width: "100" }} />
                      </div>
                      : null}

                    {image_3 ?
                      <div className="carousel-item">
                        <img src={image_3} alt={name} style={{ width: "100" }} />
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

        <div className="col-md-6">
          <div className="mb-4 row">
            <div className="col-md-6">
              <Link href="/products/edit/[id]" as={`/products/edit/${id}`}>
                <button className="btn btn-primary btn-lg edit-button-position">
                  Edit
              </button>
              </Link>
            </div>

            <div className="col-md-6">
              <button onClick={() => removeProducts()} className="btn btn-primary btn-lg edit-button-position">
                Delete
              </button>
            </div>
          </div>

          <div className="ml-5">
            <div className="row">
              <h1 className="product_name">
                <b>{name} </b>
              </h1>
            </div>

            <div className="row">
              <span className="add_product_details mb-5">
                <div>
                  <h5 className="product_details">
                    GH¢ {(price - (discount / 100) * price).toFixed(2)}
                  </h5>
                </div>

                {discount != 0 ? (
                  <div>
                    <h5 className="disabled">GH¢ {price}</h5>
                  </div>
                ) : (
                    ``
                  )}

                {discount != 0 ? (
                  <div>
                    <Badge
                      className="btn btn-primary btn-sm mb-2"
                      style={{
                        marginLeft: "10px",
                        borderRadius: "8px",
                        width: "60px",
                      }}
                    >
                      {discount}% off
                    </Badge>
                  </div>
                ) : (
                    ``
                  )}
              </span>
            </div>

            <p className="myproductDescription bulletpoint">
              <ShowMoreText
                lines={3}
                more="Read more"
                less="Read less"
                expanded={false}
                width={520}
              >
                {ReactHtmlParser(description)}
              </ShowMoreText>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// const { publicRuntimeConfig } = getConfig()

// export async function getServerSideProps(context) {
//   const { id } = context.query
//   const API_URL = process.env.URL;
//   // const res = await fetch(`${publicRuntimeConfig.API_URL}/marketplace/products/${id}`)
//   const res = await fetch(`${process.env.URL}/marketplace/products/${id}/`)
//   const data = await res.json()
//   return {
//     props: {
//       productData: data
//     }
//   }
// }
