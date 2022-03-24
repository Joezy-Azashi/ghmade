import MainLayout from "../../components/MainLayout";
import React, { useState, useRef, useContext, useEffect } from "react";
import Prompt from "../../components/Prompt";
import { Products } from "../../lib/endpoints";
import Link from "next/link";
import { Editor } from "@tinymce/tinymce-react";

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

export default function addProduct() {
  const [name, setName] = useState("");
  const [product_type, setProductType] = useState("PR");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(null);
  const [category, setCategory] = useState("FTF");
  const [discount, setDiscount] = useState("");
  const [statusColor, setStatusColor] = useState("blue");
  const [statusMsg, setStatusMsg] = useState("");
  const [fileName, setFilename] = useState("Add Image");
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const inputRef = useRef(null);
  const [fileArray, setFileArray] = useState([
    "/assets/images/default-add-image.png",
  ]);
  const [fileObj, setFileObj] = useState([]);

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
    setShow(false);
  };

  const onChange = (e: any) => {
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

    if (arr.length > 3) {
      callPrompt("Image Upload", "", "Okay", "Can't upload more than 3 images");
    } else {
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
                    "File size too big. Upload an image less than 5MB"
                  )
            //File size less than 5MB
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
    }
  };

  const handleDelete = (i) => {
    setFileArray((prev) => {
      const tmp = JSON.parse(JSON.stringify(prev));
      tmp.splice(i, 1);
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
    fileObj.map((f: any, index: number) => {
      formdata.append("image_" + (index + 1), f, f.name);
    });

    callPrompt("Edit Profile", "", "", "Please wait...");
    const rs: any = await new Products().createProduct(formdata);
console.log("rs",rs)
     if (
       rs.price.includes(
         "Ensure that there are no more than 10 digits in total."
       )
     ) {
       callPrompt(
        "Add Product",
         "",
        "Okay",
       "Ensure that price is not more than 10 digits."
      );
     return;
     }
    if (
      rs.price.includes(
        "Ensure that there are no more than 8 digits before the decimal point."
      )
    ) {
      callPrompt(
        "Add Product",
        "",
        "Okay",
        "Ensure that the unit price is not more than 8 digits."
      );
      return;
    }

    if (rs) {
      setFileArray(fileArray.splice(0, fileArray.length));
      setFileArray(["/assets/images/default-add-image.png"]);
      callPrompt(
        "Add Product",
        "/products/viewmyproducts",
        "Close",
        "Product successfully posted, pending approval"
      );
    }
  };

  return (
    <div style={{ overflowY: "scroll" }}>
      <MainLayout title={"Add Product/Service"}>
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
        <div className="page-header page-tittle ml-3">
          <h1 className="page-title">Add Product/Service</h1>
        </div>

        <div className="col-md-12">
          <form className="form-group col-md-12" onSubmit={submitData}>
            <div className="img-area">
              <div className="dashcontainer">
                <div className="d-flex">
                  {fileArray.map((image, i) => {
                    return (
                      <div key={i} id="img-gallery" className="col">
                        <div
                          className="preview-img"
                          onClick={() => {
                            handleDelete(i);
                          }}
                        >
                          <div
                            title="Delete"
                            className="img-upload-container mt-6 row"
                          >
                            <img
                              key={fileArray.indexOf(fileArray[image])}
                              src={image}
                              className="mx-auto upload-image-overlay"
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
                  //value={image_1}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onChange}
                  name={fileName}
                  multiple
                />
              </div>
              <div className="d-flex mt-2">
                <span
                  title="Info"
                  className="upload-img-info fe fe-info mr-1"
                />
                <h6>Click image to delete</h6>
              </div>
              <button
                type="button"
                className=" btn-primary uploadimgbtn mb-4 mx-auto d-block"
                onClick={(e) => {
                  e.preventDefault();
                  inputRef.current.click();
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
                    onChange={(e) => setName(e.target.value)}
                    value={name}
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
                    onChange={(e) => {
                      setProductType(e.target.value);
                    }}
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
                    Unit Price <span className="red">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control form-rounded"
                    placeholder=""
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
                    onChange={(e) => setCategory(e.target.value)}
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
                    onChange={(e: any) =>
                      setDiscount(e.target.value ? e.target.value : 0)
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="bolder">Description</label>
                  {/* <textarea
                      style={{ height: "120px", resize: "none"}}
                      className="form-control form-rounded"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    /> */}

                  <Editor
                    apiKey="jnq6bu3a3gvvn2nvdtz5e65m7ffttui7jqw5pgo6wvksdzo1"
                    value={description}
                    init={{
                      placeholder: "What's on your mind?",
                      height: 200,
                      force_br_newlines: false,
                      force_p_newlines: false,
                      forced_root_block: "",
                      branding: false,
                      menubar: false,
                      resize: false,
                      statusbar: false,
                      fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code wordcount emoticons link",
                      ],
                      toolbar:
                        "  bold  italic | backcolor |  emoticons \
                               | link | alignleft  aligncenter  alignright  alignjustify | bullist | numlist \
                               | fontsizeselect",
                    }}
                    onEditorChange={(value) => setDescription(value)}
                  />
                </div>

                <div
                  className="col-md-12 form-group justify-content-between d-flex"
                  style={{ marginTop: "-18px" }}
                >
                  <button
                    type="submit"
                    className="btn btn-primary  addproduct-buttons btn-block mr-5 mt-3 col-md-6"
                    disabled={fileArray.length < 0}
                  >
                    Add
                  </button>

                  <Link href="/products/viewmyproducts">
                    <button
                      type="submit"
                      className="btn btn-primary cancelproduct-buttons btn-block mt-3  col-md-6"
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>

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
      </MainLayout>
    </div>
  );
}
