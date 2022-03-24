// Be able to tell which image (position) u are deleting.
import MainLayout from "../../../components/MainLayout";
import { useState, useEffect, useRef, useContext, useReducer } from "react";
import { Products } from "../../../lib/endpoints";
import Prompt from "../../../components/Prompt";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { Store } from "../../../contextStore";
import Link from "next/link";
import { Editor } from "@tinymce/tinymce-react";
import ufetch from "../../../lib/ufetch";
import { Console } from "console";
import { setTimeout } from "timers";

const PRODUCT_TYPE = [
  ["PR", "product"],
  ["SE", "services"],
];

const CATEGORY = [
  ["FTF", "Fashion, Textiles and Fabrics"],
  ["JGP", "Jewellery, Gifts and Parcels"],
  ["SSF", "Shoes, Sandals and Footwears"],
  ["AT", "Automobile and Transport"],
  ["BOS", "Books and Office Supplies"],
  ["LFD", "Lights, Furniture and Decor"],
  ["BeL", "Beauty and Lifestyle"],
  ["BaL", "Bags and Luggage"],
  ["EGG", "Electronics, Gadgets and Garden Equipment"],
  ["TBP", "Toiletries / Baby Products"],
  ["PTC", "Phones, Tablets and Computers"],
  ["GrP", "Groceries and Provisions"],
  ["SE", "services"],
  ["ITM", "Industrial Tools and Machinery"],
  ["REP", "Real Estates and Properties"],
  ["HeP", "Health and Pharmaceuticals"],
  ["PlP", "Plastics and Rubbers"],
];

const INITIAL_STATE = {
  fileObjects: [],
};

const reducer = (image_state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "updateFileObjects":
      if (action.payload) {
        return {
          ...image_state,
          fileObjects: [...image_state.fileObjects, action.payload],
        };
      } else {
        return;
      }
    case "RESET":
      return {
        fileObjects: [],
      };
    default:
      return image_state;
  }
};

export default function Home() {
  const [image_state, image_dispatch] = useReducer(reducer, INITIAL_STATE);
  const [newFile, setNewFile] = useState<any>();
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [product_type, setProductType] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState<any>();
  const [discount, setDiscount] = useState<any>();
  const [description, setDescription] = useState();
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [id, setId] = useState<any>();
  const [doneUpdate, setDoneUpdate] = useState(false);
  const inputRef = useRef(null);
  const imageRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const [statusColor, setStatusColor] = useState("blue");
  const [file, setFile] = useState([]);
  const [fileName, setFilename] = useState("Upload Image");
  const [fileArray, setFileArray] = useState([
    "/assets/images/default-add-image.png",
  ]);
  const [fileObj, setFileObj] = useState([]);
  const [fileObjTemp, setFileObjTemp] = useState([]);
  const { state, dispatch } = useContext(Store);
  const [tmpFObj, setTempObj] = useState([]);
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

  useEffect(() => {
    image_dispatch({
      type: "updateFileObjects",
      payload: newFile,
    });
  }, [newFile]);

  const dispatchNewFile = (blob) => {
    image_dispatch({
      type: "updateFileObjects",
      payload: blob,
    });
  };

  const router = useRouter();

  const handleClose = () => {
    if (doneUpdate) {
      router.push("/products/viewmyproducts/");
    }
    setShow(false);
  };


  useEffect(() => {
    const arr = [];

    (async () => {
      const productid = window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      );
      const res = await new Products().getProductDetails(productid);
      setCategory(res.category);
      setDescription(res.description);
      setDiscount(res.discount);
      setName(res.name);
      setPrice(res.price);
      setProductType(res.product_type);
      setId(res.id);

      if (res.image_1 !== null) {
        arr.push(res.image_1);
      }
      if (res.image_2 !== null) {
        arr.push(res.image_2);
      }
      if (res.image_3 !== null) {
        arr.push(res.image_3);
      }
      setFileArray(arr);
    })();
  }, []);

  useEffect(() => {

    (async () => {
      setTempObj([]);
      if (Array.isArray(fileArray) && fileArray.length > 0) {
        for (let i = 0; i < fileArray.length; i++) {
          if (fileArray[i].includes("/assets/images/default-add-image.png")) {
            continue;
          }
          let f
          let generatedFile
          if (fileArray[i].includes("blob")) {
            f = fileArray[i].substring(fileArray[i].lastIndexOf("3000") + 4)
            let xhr = new XMLHttpRequest
            xhr.responseType = 'blob'
            xhr.onload = () => {
              let recoveredBlob = xhr.response
              let reader = new FileReader
              reader.onload = async () => {
                let blobAsDataUrl = reader.result
                const base64MimeType = async (encoded: any) => {
                  var result = null;
                  if (typeof encoded !== 'string') {
                    return result;
                  }
                  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
                  if (mime && mime.length) {
                    result = mime[1];
                  }
                  return result.substring(6,)
                }
                const urltoFile = async (url, filename, mimeType) => {
                  return (fetch(url)
                    .then(function (res) { return res.arrayBuffer(); })
                    .then(function (buf) { return new File([buf], `${filename}.${mimeType}`, { type: `image/${mimeType}` }); })
                  );
                }
                console.log("TYPE:", await base64MimeType(blobAsDataUrl))
                generatedFile = await urltoFile(blobAsDataUrl, i + 1, await base64MimeType(blobAsDataUrl))
                setTempObj((pre) => [...pre, generatedFile]);
              }
              reader.readAsDataURL(recoveredBlob)
            }
            xhr.open("GET", fileArray[i])
            xhr.send()
          } else {
            f = fileArray[i].substring(
              fileArray[i].lastIndexOf("8080") + 4
            );
            const ext = fileArray[i].substring(fileArray[i].lastIndexOf(".") + 1);
            const rs = await fetch(process.env.URL + f);
            const blob = await rs.blob();
            generatedFile = new File([blob], `${i + 1}.${ext}`, {
              type: `image/${ext}`,
            });
            setTempObj((pre) => [...pre, generatedFile]);
          }
        }
      }
    })();
  }, [fileArray]);

  useEffect(() => {
  }, [tmpFObj])

  const onChange = (e) => {
    e.preventDefault();
    let files: any = Object.values(e.target.files);
    let arr: any = files.filter((el: any) => el.type.includes("image"));

    if (arr < 1) {
      callPrompt("Image Upload", "", "Okay", "Please upload only images");
    }

    if (fileArray.includes("/assets/images/default-add-image.png")) {
      setFileArray([]);
      setFileObj([]);
    }

    if (fileArray.length < 3) {
      let imgSrc = arr
        .filter(
          (x: any) =>
            x.size < 5000000
              ? x
              : callPrompt(
                "Upload Image",
                "",
                "Okay",
                "File size too big. Upload an image less than 100KB"
              )
          //File size less than 100KB
        )
        .map((file: any) => {
          return URL.createObjectURL(file);
        });
      setFileArray((prev) => [...prev, ...imgSrc]);
      setFileObj([...fileObj, ...e.target.files]);
    } else {
      callPrompt("Image Upload", "", "", "Can't upload more than 3 images");
      setTimeout(() => setShow(false), 3000);
    }
  };

  const handleDelete = async (i) => {
    setFileArray((prev) => {
      const tmp = JSON.parse(JSON.stringify(prev));
      tmp.splice(fileArray.indexOf(i), 1);
      if (tmp.length == 0) {
        return ["/assets/images/default-add-image.png"];
      }
      return tmp;
    });
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (fileArray.length <= 0) {
      callPrompt("Image", "", "Okay", "Upload at least one image");
      return;
    }
    if (fileArray.includes("/assets/images/default-add-image.png")) {
      callPrompt("Image", "", "Okay", "Upload at least one image");
      return;
    }
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("price", price.toString());
    formdata.append("discount", discount.toString());
    formdata.append("category", category);
    formdata.append("description", description);
    formdata.append("product_type", product_type);
    // fileObj.map((f: any, index: number) => {
    //   formdata.append("image_" + (index + 1), f, f.name);
    // });
    // callPrompt("Edit Profile", "", "", "Please wait...");

    if (tmpFObj) {
      let len = tmpFObj
        .filter((f: any) => {
          if (f && f.type) return typeof f.type === "string";
        })
        .map((f: any, index: number) => {
          formdata.append("image_" + (index + 1), f);
        });

      if (len.length === 0) {
        formdata.append("image_1", "");
        formdata.append("image_2", "");
        formdata.append("image_3", "");
      } else if (len.length === 1) {
        formdata.append("image_2", "");
        formdata.append("image_3", "");
      } else if (len.length === 2) {
        formdata.append("image_3", "");
      }
    } else {
      formdata.append("image_1", "");
      formdata.append("image_2", "");
      formdata.append("image_3", "");
    }

    callPrompt("Edit Profile", "", "", "Please wait...");

    try {
      const rs: any = await new Products().updateUserProduct(id, formdata);

      if (rs.error) {
        (() => {
          callPrompt(
            "Update Product",
            "",
            "",
            "Please check your network connection and try again."
          );

          setTimeout(() => setShow(false), 4000)
        })()
      } else if (rs.id) {
        setDoneUpdate(true);
        callPrompt(
          "Update Product",
          "",
          "Close",
          "Product Updated Successfully"
        );
      }
    } catch (err) {
      if (err.message === "Request failed with status code 401") {
        // bad credentials
        callPrompt(
          "Edit Product",
          "",
          "Close",
          "You're not authorized to edit this product"
        );
      } else if (err.message === "Request failed with status code 404") {
        // bad endpoint
        callPrompt("Edit Product", "", "Close", "Request failed");
      } else if (err.message === "Network Error") {
        // bad network connection
        callPrompt(
          "Login",
          "",
          "Close",
          "Please check your network connection and try again."
        );
      } else {
        callPrompt("Edit Product", "", "Close", "Failed to Update Product.");
      }
    }
    return;
  };

  return (
    <MainLayout title={"Edit Product/Service"}>
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
      <div className="container">
        <div className="col-md-12 page-tittle ">
          <div className="page-header ml-3">
            <h1 className="page-title">Edit Product/Service</h1>
          </div>
          <div className="col-md-12 row">
            <form className=" col form-group md-12" onSubmit={submitData}>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  marginBottom: "20px",
                  borderRadius: "7px",
                }}
              >
                <div className="dashcontainer">
                  <div className="d-flex">
                    {fileArray.map((image, i) => {
                      return (
                        <div key={i} id="img-gallery" className="col">
                          <div
                            className="preview-img"
                            onClick={(i) => {
                              handleDelete(image);
                            }}
                          >
                            <div className="img-upload-container mt-6 row">
                              <img
                                key={fileArray.indexOf(fileArray[image])}
                                src={image}
                                className="mx-auto upload-image-overlay fe fe-trash-2"
                              />
                              <div className="middle">
                                <div className="delete_img fe fe-trash-2"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <input
                    type="file"
                    ref={inputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={onChange}
                    name={fileName}
                    multiple
                  />
                </div>
                <button
                  className="btn-lg btn-primary savebtn mb-4 mx-auto d-block"
                  onClick={(e) => {
                    e.preventDefault();
                    inputRef.current!.click();
                  }}
                >
                  {fileName}
                </button>
              </div>

              <div className="row justify-content-between">
                {/*from here*/}
                <div className="col-md-6">
                  {/* <div className="col"> */}
                  <div className="form-group">
                    <label className="bolder">
                      Product Name <span className="red">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder="Enter product name"
                      value={name}
                      onChange={(e: any) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="bolder">
                      Type <span className="red">*</span>
                    </label>
                    <select
                      className="form-control select2 form-rounded"
                      placeholder="Enter product name"
                      value={product_type}
                      onChange={(e: any) => setProductType(e.target.value)}
                      required
                    >
                      {PRODUCT_TYPE.map((t, i) => (
                        <option key={i} value={t[0]}>
                          {t[1]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="bolder">
                      Price <span className="red">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control form-rounded"
                      placeholder="GH¢ 50"
                      value={price}
                      onChange={(e: any) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="bolder">
                      Category <span className="red">*</span>
                    </label>
                    <select
                      className="form-control select2 form-rounded"
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      required
                    >
                      {CATEGORY.map((c, i) => (
                        <option key={i} value={c[0]}>
                          {c[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* </div>      */}
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="quantity" className="bolder">
                      Discount
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="form-control form-rounded"
                      placeholder="Add discount"
                      value={discount}
                      onChange={(e: any) => setDiscount(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="bolder">Description</label>

                    <Editor
                      apiKey="jnq6bu3a3gvvn2nvdtz5e65m7ffttui7jqw5pgo6wvksdzo1"
                      value={description}
                      init={{
                        height: 150,
                        force_br_newlines: false,
                        force_p_newlines: false,
                        forced_root_block: "",
                        branding: false,
                        resize: false,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code wordcount emoticons",
                        ],
                        toolbar:
                          "bold italic| \
                                bullist numlist | emoticons",
                      }}
                      onEditorChange={(value: any) => setDescription(value)}
                    />
                  </div>

                  <div
                    className="col-md-12 form-group justify-content-between d-flex"
                    style={{ paddingTop: "15px" }}
                  >
                    <button
                      type="submit"
                      className="btn btn-primary  addproduct-buttons btn-block mr-2 mt-3 col-md-6"
                    >
                      Update
                    </button>

                    <Link href="/products/viewmyproducts">
                      <button
                        type="submit"
                        className="btn btn-primary cancelproduct-buttons btn-block mr-2 mt-3  col-md-6"
                      >
                        Cancel
                      </button>
                    </Link>
                  </div>

                  {/* <div className="row col-md-12 justify-content-center"> */}

                  {/* </div> */}
                </div>
                {/*to here*/}

                <div
                  className="col-12"
                  style={{
                    color: statusColor,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {statusMsg}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// export async function getServerSideProps(context) {
//   const { id } = context.query
//   const res = await fetch(`${process.env.URL}/marketplace/products/${id}/`)
//   // const res = await new Products().getProductDetails(id)
//   const data = await res.json()
//   return {
//     props: {
//       productData: data
//     }
//   }
// }
