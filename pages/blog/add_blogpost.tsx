import { Editor } from '@tinymce/tinymce-react'
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import MainLayout from '../../components/MainLayout'
import Prompt from "../../components/Prompt";
import { Blog } from "../../lib/endpoints";
import moment from "moment"
import emailValidation from "../../utils/emailValidation"
import phoneValidation from "../../utils/phoneValidation"
import { useRouter } from "next/router";

const category_list = [
    { key: "GT", name: "Grants" },
    { key: "LN", name: "Loans" },
    { key: "ET", name: "Events" },
    { key: "SP", name: "Scholarships" }
]

function add_blogpost() {

    const inputRef = useRef(null);
    const [fileName, setFilename] = useState("Upload Image");
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhonenumber] = useState("")
    const [image, setImage] = useState<any>()
    const [video_url, setVideoUrl] = useState("")
    const [expiry_date, setExpiryDate] = useState<any>()
    const [external_links, setExternalLinks] = useState("")
    const [show, setShow] = useState(false)
    const [prompt_title, setPromptTitle] = useState("");
    const [prompt_body, setPromptBody] = useState("");
    const [link_to, setLinkTo] = useState("");
    const [link_text, setLinkText] = useState("");
    const [tmpFObj, setTempObj] = useState<any>();
    const [donePosted, setDoneposted] = useState(false)

    //   const [userImage, setImage] = useState("/assets/images/Profile_Icon.png");
    const [tempImage, setTempImage] = useState("");
    const [shouldUploadImage, setShouldUpalodImage] = useState(false);

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
            router.push("/blog/blog");
        }
        setShow(false);
    };

    const urltoFile = async (url, filename, mimeType) => {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], `${filename}.${mimeType}`, { type: `image/${mimeType}` }); })
        );
    }

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

    const imageUpload = (e) => {
        e.preventDefault()
        let files: any = Object.values(e.target.files);
        let arr: any = files.filter((el: any) => el.type.includes("image"));
        if (arr < 1) {
            callPrompt("Image Upload", "", "Okay", "Please upload only images");
        }
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
            )
            .map((file: any) => {
                return URL.createObjectURL(file);
            });

        let generatedFile
        let xhr = new XMLHttpRequest
        xhr.responseType = 'blob'
        xhr.onload = () => {
            let recoveredBlob = xhr.response
            let reader = new FileReader
            reader.onload = async () => {
                let blobAsDataUrl = reader.result
                const urltoFile = async (url, filename, mimeType) => {
                    return (fetch(url)
                        .then(function (res) { return res.arrayBuffer(); })
                        .then(function (buf) { return new File([buf], `${filename}.${mimeType}`, { type: `image/${mimeType}` }); })
                    );
                }
                generatedFile = await urltoFile(blobAsDataUrl, "blogImage", await base64MimeType(blobAsDataUrl))
                setTempObj(generatedFile);
            }
            reader.readAsDataURL(recoveredBlob)
        }
        xhr.open("GET", imgSrc)
        xhr.send()

    }

    const saveImage = async () => {
        const lStorage: any = JSON.parse(window.localStorage.getItem("cp-a"));
        let myHeaders: any = new Headers();
        myHeaders.append("Authorization", "Bearer " + lStorage.access);

        var formdata = new FormData();
        formdata.append("image", tempImage);

        var requestOptions: any = {
            method: "PUT",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };

        try {
            const rs = await fetch(
                process.env.URL + "/accounts/image_upload/",
                requestOptions
            );
            return rs;
        } catch (e) {
            return { error: "Failed to upload image" };
        }
    };

    const handleEmail = (e) => {
        e.preventDefault()
        if (emailValidation(e.target.value) === true) {
            setEmail(e.target.value)
        }
    }

    const handlePhone = (e) => {
        e.preventDefault()
        setPhonenumber(e.target.value)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData();

        formdata.append("title", title)
        formdata.append("description", description)
        formdata.append("category", category)

        formdata.append("phone_number", phone_number)
        formdata.append("video_url", video_url)
        formdata.append("external_links", external_links)

        if (email) {
            formdata.append("email", email)
        }

        if (expiry_date) {
            formdata.append("expiry_date", moment(expiry_date).format('YYYY-MM-DDThh:mm'))
        }

        if (tmpFObj) {
            formdata.append('media', tmpFObj, 'blogPic.jpg');
        }


        if (email.length <= 0 && phone_number.length <= 0) {
            callPrompt("Add Blog", "", "Okay", "Please provide either a valid email or phone number");
            return;
        }


        if (phone_number.length > 10) {
            callPrompt("Add Blog", "", "Okay", "Please provide a valid phone number");
            return;
        }

        if (phone_number.length < 10 && phone_number.length > 0) {
            callPrompt("Add Blog", "", "Okay", "Please provide a valid phone number");
            return;
        }

        if (new Date(expiry_date) < new Date()) {
            callPrompt(
                "Post A Blog",
                "",
                "Okay",
                "Please select a date that is after today"
            );
            return;
        } else if (category.length <= 0 || category === "Select Category") {
            callPrompt("Add Request", "", "Okay", "Please select a Blog Type");
            return;
        }
        else {

            try {
                callPrompt("Add Blog", "", "", "Please wait...");
                let rs = await new Blog().createBlog(formdata)
                if (rs.key) {
                    setDoneposted(true)
                    callPrompt("Blog Post", "/blog/viewmyblogpost", "Close", "Blog succesfully posted, pending approval.");
                }

                if (rs.email.includes("Enter a valid email address.")) {
                    callPrompt("Blog Post", "", "Okay", "Please provide a valid email address.");
                }


            } catch (error) {
                callPrompt("Blog Post", "", "Okay", "Error posting blog. Please try again.");
            }
            if (description.length < 1) {
                callPrompt(
                    "Post A Blog",
                    "/blog/add_blogpost",
                    "Okay",
                    "Please provide a proper blog description"
                );
                return;
            }

        }
    }

    return (
        <>
            <MainLayout title="Add Blog Post" pageTitle="">
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
                    <h1 className="page-title">Add Blog Post</h1>
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
                                    onChange={(e: any) => {
                                        setTitle(e.target.value)
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ fontWeight: "bolder" }}>
                                    Category <span style={{ color: "red" }}>*</span>
                                </label>
                                <select
                                    id="blog_category"
                                    className="form-control form-rounded add_job_formleft"
                                    value={category}
                                    onChange={(e: any) => {
                                        e.preventDefault()
                                        setCategory(e.target.value)
                                    }}
                                >
                                    <option>Select Category</option>
                                    {category_list.map((ctg: any, index: number) => {
                                        return (
                                            <option
                                                className="dropdown-item"
                                                key={index}
                                                value={ctg.key}
                                            >{ctg.name}</option>
                                        )
                                    })}

                                </select>
                            </div>

                            <div className="form-group">
                                <div
                                    className="input-group-data add_job_formright"
                                    id="blog_description_txt"
                                >
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
                                        apiKey='jnq6bu3a3gvvn2nvdtz5e65m7ffttui7jqw5pgo6wvksdzo1'
                                        init={{
                                            placeholder: "What's on your mind?",
                                            height: 200,
                                            force_br_newlines: false,
                                            force_p_newlines: false,
                                            forced_root_block: '',
                                            branding: false,
                                            menubar: false,
                                            resize: false,
                                            statusbar: false,
                                            fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code wordcount emoticons link'
                                            ],
                                            toolbar:
                                                '  bold  italic | backcolor |  emoticons \
                                | link | alignleft  aligncenter  alignright  alignjustify | bullist | numlist \
                                | fontsizeselect '
                                        }}
                                        onEditorChange={value => setDescription(value)}
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
                                    placeholder="Email"
                                    onChange={handleEmail}
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
                                    onChange={handlePhone}
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ fontWeight: "bolder" }}>
                                    Expiry Date
                        </label>
                                <input
                                    type="date"
                                    id="expiry_date"
                                    value={expiry_date}
                                    className="form-control form-rounded add_job_formleft"
                                    onChange={(e) => {
                                        setExpiryDate(e.target.value)
                                    }}
                                />
                            </div>



                            <div className="form-group">
                                <label style={{ fontWeight: "bolder" }}>
                                    Attach Video URL
                        </label>
                                <input
                                    type="url"
                                    id="blog_topic"
                                    className="form-control form-rounded add_job_formleft"
                                    placeholder="eg. http://www.youtube.com/GhncGh"
                                    onChange={(e) =>
                                        setVideoUrl(e.target.value)
                                    }
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
                                Post
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
    )
}

export default add_blogpost