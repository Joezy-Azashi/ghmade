import MainLayout from "./../../components/MainLayout";
import React, { useState, useEffect } from "react";
import { Partnership } from "../../lib/endpoints/partnership";
import Prompt from "../../components/Prompt";
import { useRouter } from "next/router";
import Link from "next/link";
import { userInfo } from "os";
import { Editor } from '@tinymce/tinymce-react';

export default function AddRequest() {
  const [partnershipType] = useState([
    { key: "GP", value: "General Partner(Co-Owner)" },
    { key: "LP", value: "Limited Partner(Investor)" },
  ]);
  const [pType, setPType] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState <any>("");
  const [description, setDescription] = useState("");
  const [industry_type_list] = useState([
    { key: "AG", value: "Agriculture" },
    { key: "CT", value: "Construction" },
    { key: "CA", value: "Creative Arts" },
    { key: "ED", value: "Education" },
    { key: "ET", value: "Entertainment" },
    { key: "FS", value: "Financial Services" },
    { key: "HP", value: "Health and Pharmaceutical" },
    { key: "IE", value: "Import and Export" },
    { key: "IT", value: "Information Technology" },
    { key: "MF", value: "Manufacturing" },
    { key: "MN", value: "Mining" },
    { key: "OG", value: "Oil and gas" },
    { key: "RE", value: "Real Estate" },
    { key: "RW", value: "Retail and Wholesale" },
    { key: "TE", value: "Telecommunication" },
    { key: "TH", value: "Tourism and Hospitality" },
    { key: "TV", value: "Transport and Vehicle" },
    { key: "WS", value: "Water and Sewage" },
  ]);
  const [industryType, setIndustryType] = useState("");
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [owner, setOwner] = useState({ title: "", description: "", city: "", user: {email: ""} });
  const [phoneNumber, setPhoneNumber] = useState <any>("");
  const [show, setShow] = useState(false);
  const [link_text, setLinkText] = useState("");
  const [doneUpdate, setDoneUpdate] = useState(false);
  const [minDate] = useState(new Date().toString());
  const router = useRouter();
  const handleClose = () => {
    if (doneUpdate) {
      router.push("/jobs/add_jobpost");
    }
    setShow(false);
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

  useEffect(() => {
    const ls = JSON.parse(window.localStorage.getItem("user-profile"));
    setOwner(ls);
    setPhoneNumber(ls.user.phone_number);
    setEmail(ls.user.email)
  }, [])
  const submitData = async () => {
    if (industryType.length <= 0 || industryType === "Select Industry Type") {
      callPrompt("Add Request", "", "Okay", "Please select an Industry Type");
      return;
    }
    if(email.length <= 0 && phoneNumber.length <=0 ){
      callPrompt("Add Request", "", "Okay", "Please provide either an email or phone number");
      return;
    }

    if (pType.length <= 0 || pType === "Select Partnership Type") {
      callPrompt("Add Request", "", "Okay", "Please select a Partnership Type");
      return;
    }
    if (description.length < 1) {
      callPrompt(
        "Add Request",
        "",
        "Okay",
        "Please provide a Proper Job description"
      );
      return;
    }
    if (!description || !pType || !industryType) {
      callPrompt("Add Request", "", "", "Please wait ...");
      const partner_api = new Partnership();
      try {
        const result: any = await partner_api.addrequest({
          type: pType,
          industry: industryType,
          email: email,
          phone_number: phoneNumber,
          description: description,
        });
        if (result.detail) {
          callPrompt("Add Request", "", "Close", result.detail);
          return;
        }
        if (result.error) {
          callPrompt("Add Request", "", "Close", result.error);
          return;
        }
        if (!result.key) {
          callPrompt(
            "Add Request",
            "",
            "Okay",
            "An error occured, please try again"
          );
          return;
        }
      } catch (e) {
        
      }
    } else {
      callPrompt("Add Request", "", "", "Please wait ...");
      const partner_api = new Partnership();
      try {
        const result: any = await partner_api.addrequest({
          type: pType,
          industry: industryType,
          email: email,
          phone_number: phoneNumber,
          description: description,
        });
        if (result.detail) {
          callPrompt("Add Request", "", "", result.detail);
          return;
        }
        if (result.error) {
          callPrompt("Add Request", "", "Close", result.error);
          return;
        }
        if (result.email.includes("Enter a valid email address.")) {
          callPrompt(
            "Add Request",
            "",
            "Close",
            result.email
          );
          return;
        }
        if (result.error.includes("Phone number needs to be more than or equal to 10 digits")) {
          callPrompt(
            "Add Request",
            "",
            "Close",
            result.error
          );
          return;
        }
      } catch (e) {
        
      }
    }
    setDoneUpdate(true);
    
    callPrompt(
      "Add Request",
      "/partnership/mypartnerships",
      "Close",
      "Request posted successfully"
    );
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
      <div>
        {/* page-header */}
        <div className="page-header">
          <h1 className="page-title row justify-content-center">Add Request</h1>
        </div>
        {/* End page-header */}

        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label style={{ fontWeight: "bold", color: "#818AA9" }}>Business Name</label>
                <input
                style={{border: "1px solid #818AA9", color: "#818AA9", background: "#EFEFEF"}}
                  type="text"
                  className="form-control form-rounded text-field-hover"
                  placeholder="Enter the name of your business"
                  defaultValue={owner.title}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>
                  Type of Industry <span style={{ color: "red" }}>*</span>
                </label>
                <select 
                className="form-control form-rounded" required
                value={industryType}
                onChange={(e) => setIndustryType(e.target.value)}>
                  <option>Select Industry Type</option>
                  {industry_type_list.map(
                    (itype: { key: string; value: string }, index: number) => (
                      <option key={index} value={itype.key}>{itype.value}</option>
                    )
                  )}
                </select>
              </div>
              <div className="form-group">
                <label style={{ fontWeight: "bolder", color: "#818AA9" }}>
                  Location of Business
                </label>
                <input
                  style={{border: "1px solid #818AA9", color: "#818aa9" , background: "#EFEFEF"}}
                  type="text"
                  className="form-control form-rounded"
                  placeholder="eg. Anaji"
                  defaultValue={owner.city}
                  onChange={(e) => setLocation(e.target.value)}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label style={{ fontWeight: "bolder", color: "#818AA9" }} htmlFor="form-label">
                  Description of Business
                </label>
                <div className="form-group">
                  <div className="input-group-date">
                    <textarea
                      style={{ resize: "none",border: "1px solid #818AA9", color: "#818AA9", margin: "1px", backgroundColor: "#EFEFEF" }}
                      className=" form-textarea"
                      rows={4}
                      defaultValue={owner.description}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label style={{ fontWeight: "bolder" }}>
                  Type of Partnership <span style={{ color: "red" }}>*</span>
                </label>
                <select 
                className="form-control form-rounded"
                value={pType}
                onChange={(e) => setPType(e.target.value)}>
                  <option>Select Partnership type</option>
                  {partnershipType.map(
                    (ptype: { key: string; value: string }, index: number) => (
                      <option value={ptype.key}>{ptype.value}</option>
                    )
                  )}
                </select>
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bolder" }}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-rounded"
                  placeholder="Enter your email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: "bolder" }}>Phone Number</label>
                <input
                  type="number"
                  className="form-control form-rounded"
                  placeholder="eg. +233 50 000 9876"
                  pattern="/^\d{10}$/"
                  min={10}
                  max={10}
                  defaultValue={phoneNumber}
                  onChange={(e) => {setPhoneNumber(e.target.value)}}
                  required
                />
              </div>
              <div className="form-group">
                <label style={{ fontWeight: "bolder" }} htmlFor="form-label">
                  Description of Partnership{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="form-group">
                  <div className="input-group-date">
                    {/* <textarea
                      style={{ resize: "none" }}
                      className="form-textarea"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    /> */}

<Editor
                            apiKey ='jnq6bu3a3gvvn2nvdtz5e65m7ffttui7jqw5pgo6wvksdzo1'
                            value={description}
                            init={{
                              placeholder: "What's on your mind?",
                              height: 150,
                              force_br_newlines : false,
                              force_p_newlines : false,
                              forced_root_block : '',
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
                               | fontsizeselect'
                            }}
                            onEditorChange={value => setDescription(value)
                            }
                          />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6 style={{ fontSize: "12px" }}>
              Note: To edit your business name or location, update your {""}
              <Link href="/editbusinessprofile">
                <a  className="profileredirect">profile</a>
              </Link>
            </h6>
          </div>
          <div className="col justify-content-center d-flex mt-5 mb-3">
            <div className="prtsavebtn">
              <button
                className="btn btn-primary btn-block businessProfilesave"
                onClick={() => submitData()}
              >
                Post Request
              </button>
            </div>

            <div className="prtcancelbtn">
              <Link href="/partnership/mypartnerships">
                <button className="btn btn-primary btn-block businessProfileCancel">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
