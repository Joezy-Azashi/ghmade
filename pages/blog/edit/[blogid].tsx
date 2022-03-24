import { Editor } from "@tinymce/tinymce-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import MainLayout from "../../../components/MainLayout";
import Prompt from "../../../components/Prompt";
import { Blog } from "../../../lib/endpoints/blog";
import moment from "moment";
import emailValidation from "../../../utils/emailValidation";
import phoneValidation from "../../../utils/phoneValidation";
import { useRouter } from "next/router";

const category_list = [
  { key: "GT", name: "Grants" },
  { key: "LN", name: "Loans" },
  { key: "ET", name: "Events" },
  { key: "SP", name: "Scholarships" },
];

function add_blogpost() {
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [expiry_date, setExpiryDate] = useState<any>();
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [tmpFObj, setTempObj] = useState<any>();
  const [donePosted, setDoneposted] = useState(false);
  const [blog, setBlog] = useState<any>({});
  const router = useRouter();

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
    if (donePosted) {
      router.push("/blog/viewmyblogpost");
    }
    setShow(false);
  };

  const base64MimeType = async (encoded: any) => {
    var result = null;
    if (typeof encoded !== "string") {
      return result;
    }
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
      result = mime[1];
    }
    return result.substring(6);
  };

  const imageUpload = (e) => {
    e.preventDefault();
    let files: any = Object.values(e.target.files);
    let arr: any = files.filter((el: any) => el.type.includes("image"));
    if (arr < 1) {
      callPrompt("Image Upload", "", "Okay", "Please upload only images");
    }
    let imgSrc = arr
      .filter((x: any) =>
        x.size < 5000000
          ? x
          : callPrompt(
            "Upload Image",
            "",
            "Okay",
            "File size too big. Upload an image less than 5MB"
          )
      )
      .map((file: any) => {
        return URL.createObjectURL(file);
      });

    let generatedFile;
    let xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = () => {
      let recoveredBlob = xhr.response;
      let reader = new FileReader();
      reader.onload = async () => {
        let blobAsDataUrl = reader.result;
        const urltoFile = async (url, filename, mimeType) => {
          return fetch(url)
            .then(function (res) {
              return res.arrayBuffer();
            })
            .then(function (buf) {
              return new File([buf], `${filename}.${mimeType}`, {
                type: `image/${mimeType}`,
              });
            });
        };
        generatedFile = await urltoFile(
          blobAsDataUrl,
          "blogImage",
          await base64MimeType(blobAsDataUrl)
        );
        setTempObj(generatedFile);
      };
      reader.readAsDataURL(recoveredBlob);
    };
    xhr.open("GET", imgSrc);
    xhr.send();
  };


  const handleEmail = (e) => {
    e.preventDefault()
    if (emailValidation(e.target.value) === true) {
      setEmail(e.target.value)
    }
  }

  const handlePhone = (e) => {
    e.preventDefault()
    setPhone(e.target.value)

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    const formdata = new FormData();
    formdata.append("title", blog.title);
    formdata.append("description", blog.description);
    formdata.append("category", blog.category);
    formdata.append("email", blog.email);
    formdata.append("phone_number", blog.phone_number);
    formdata.append("video_url", blog.video_url);
    formdata.append("external_links", blog.external_links);

    if(blog.expiry_date && null ){
      formdata.append("expiry_date", moment(blog.expiry_date).format("YYYY-MM-DDThh:mm"));
    } else if (blog.expiry_date){
    formdata.append("expiry_date", moment(blog.expiry_date).format("YYYY-MM-DDThh:mm"));
    }

    if (tmpFObj) {
      formdata.append("media", tmpFObj, "blogPic.jpg");
    }


    if (blog.email.length <= 0 && blog.phone_number.length <= 0) {
      callPrompt("Edit Blog", "", "Okay", "Please provide either a valid email or phone number");
      return;
    }

    if (blog.phone_number.length > 10) {
      callPrompt("Edit Blog", "", "Okay", "Please provide a valid phone number");
      return;
    }

    if (blog.phone_number.length < 10 && blog.phone_number.length > 0) {
      callPrompt("Edit Blog", "", "Okay", "Please provide a valid phone number");
      return;
    }

    if (new Date(blog.expiry_date) < new Date()) {
      callPrompt(
        "Edit Blog",
        "",
        "Okay",
        "Please select a date that is after today"
      );
      return;
    } else if (
      blog.category.length <= 0 || blog.category === "Select Category"
    ) {
      callPrompt("Edit Blog", "", "Okay", "Please select a Blog Type");
      return;
    } else {
      try {
        callPrompt("Edit Blog", "", "", "Please wait...");
        const blogid = window.location.href.substring(
          window.location.href.lastIndexOf("/") + 1
        );
        let rs = await new Blog().updatePersonalBlog(blogid, formdata);
        if (rs.key) {
          setDoneposted(true);
          callPrompt(
            "Edit Blog",
            "",
            "Okay",
            "Blog succesfully updated, pending approval."
          );
        }
        if (rs.email.includes("Enter a valid email address.")) {
          callPrompt("Blog Post", "", "Okay", "Please provide a valid email address.");
        }

        if (rs.description.includes("This field may not be blank.")) {
          callPrompt("Blog Post", "", "Okay", "Please provide a blog description.");
        }

      } catch (err) {
        if (err.message === "Request failed with status code 400") {
          callPrompt(
            "Edit Blog",
            "",
            "Okay",
            "Error updating blog. Please try again....."
          );
        }
      }
      if (blog.description.length < 1) {
        callPrompt("Edit Blog", "", "Okay", "Please provide a blog description");
        return;
      }
    }
  };
  //Useeffect
  useEffect(() => {
    const blogid = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    new Blog()
      .getPersonalBlogDetails(blogid)
      .then((rs) => {
        if (rs.key) {
          rs.expiry_date = moment(rs.expiry_date).format("YYYY-MM-DDThh:mm");
          setBlog(rs);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <MainLayout title="Update Blog Post" pageTitle="">
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

        {/* post blog title page  */}
        <div className="page-header w-100">
          <h1 className="page-title">Edit Blog Post</h1>
        </div>

        <form className=" col form-group md-12" onSubmit={handleSubmit}>
          {/* the row for input field */}
          <div className="row">
            {/* the left column of the blog post page */}
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label style={{ fontWeight: "bolder" }}>
                  Blog Topic <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="blog_topic"
                  className="form-control form-rounded add_job_formleft"
                  placeholder="eg. Scholarship for Undergraduates"
                  required
                  value={blog.title}
                  onChange={(e: any) => {
                    const temp = JSON.parse(JSON.stringify(blog));
                    temp.title = e.target.value;
                    setBlog(temp);
                  }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bolder" }}>
                  Blog Type <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="blog_category"
                  className="form-control form-rounded add_job_formleft"
                  value={blog.category}
                  onChange={(e: any) => {
                    const temp = JSON.parse(JSON.stringify(blog));
                    temp.category = e.target.value;
                    setBlog(temp);
                  }}
                >
                  <option>Select Category</option>
                  {category_list.map((ctg: any, index: number) => {
                    return (
                      <option
                        className="dropdown-item"
                        key={index}
                        value={ctg.key}
                        selected={blog.category == ctg.key ? true : false}
                      >
                        {ctg.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <div
                  className="input-group-data add_job_formright"
                  id="blog_description_txt"
                >
                  <label style={{ fontWeight: "bolder" }}>
                    Description of post <span style={{ color: "red" }}>*</span>
                  </label>
                  {/* <textarea
                            style={{ resize: "none" }}
                            className="form-control form-rounded jobDescription_txt"
                            rows={4}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            ></textarea> */}

                  <Editor
                    apiKey="jnq6bu3a3gvvn2nvdtz5e65m7ffttui7jqw5pgo6wvksdzo1"
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
                                | fontsizeselect ",
                    }}
                    onEditorChange={(value) => {
                      const temp = JSON.parse(JSON.stringify(blog));
                      temp.description = value;
                      setBlog(temp);
                    }}
                    value={blog.description}
                  />
                </div>
              </div>
            </div>
            {/* the end of left column of the blog post page */}

            {/* the right column of the blog post page */}
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ fontWeight: "bolder" }}>
                  Email
                </label>
                <input
                  type="email"
                  id="blog_contact_details"
                  className="form-control form-rounded add_job_formleft"
                  placeholder="Email address"
                  value={blog.email}
                  onChange={(e: any) => {
                    const temp = JSON.parse(JSON.stringify(blog));
                    temp.email = e.target.value;
                    setBlog(temp);
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bolder" }}>
                  Phone Number
                </label>
                <input
                  type="number"
                  id="blog_contact_details"
                  className="form-control form-rounded add_job_formleft"
                  placeholder="Phone Number"
                  value={blog.phone_number}
                  onChange={(e: any) => {
                    const temp = JSON.parse(JSON.stringify(blog));
                    temp.phone_number = e.target.value;
                    setBlog(temp);
                    setPhone(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bolder" }}>Expiry Date</label>
                <input
                  type="date"
                  id="expiry_date"
                  className="form-control form-rounded add_job_formleft"
                  value={`${moment(blog.expiry_date).format("YYYY-MM-DD")}`}
                  onChange={(e: any) => {
                    const temp = JSON.parse(JSON.stringify(blog));
                    temp.expiry_date = e.target.value;
                    setBlog(temp);
                  }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bolder" }}>Attach Video URL</label>
                <input
                  type="url"
                  id="blog_topic"
                  className="form-control form-rounded add_job_formleft"
                  placeholder="eg. http://www.youtube.com/GhncGh"
                  value={blog.video_url}
                  onChange={(e: any) => {
                    const temp = JSON.parse(JSON.stringify(blog));
                    temp.video_url = e.target.value;
                    setBlog(temp);
                  }}
                />
              </div>

              <div className="form-group">
                <div className="mt-6">
                  <input
                    type="file"
                    accept="image/*"
                    className=""
                    id="blog_image"
                    onChange={imageUpload}
                  />
                </div>
              </div>
            </div>
            {/* the end of right column of the blog post page */}
          </div>
          <div className="row justify-content-center job_buttons">
            <div className="mr-3 addjob_btn">
              <button
                className="btn btn-primary btn-block addjob_save_btn mb-1 mt-5"
                id="job_save_btn"
                type="submit"
                
              >
                Update
              </button>
            </div>
            <div>
              <Link href="/blog/viewmyblogpost">
                <button
                  className="btn btn-primary btn-block addjob_cancel_btn mb-1 mt-5"
                  id="job_cancel_btn"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </MainLayout>
    </>
  );
}

export default add_blogpost;
