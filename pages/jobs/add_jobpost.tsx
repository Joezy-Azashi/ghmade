import MainLayout from "../../components/MainLayout";
import React, { useState, useEffect } from "react";
import { JobPortal } from "../../lib/endpoints";
import Prompt from "../../components/Prompt";
import { useRouter } from "next/router";
import Link from "next/link";
import { Editor } from '@tinymce/tinymce-react';


const jobLocationData = [
  "Aboadze",
  "Adiembra",
  "Adientem",
  "Airport Ridge",
  "Anaji",
  "Apollo",
  "Apowa",
  "Apremdo",
  "Assakae",
  "Beach Road",
  "Beahu",
  "BU",
  "Chapel Hill",
  "Diabene",
  "Effiakuma",
  "Essikado",
  "Essipon",
  "Fijai",
  "I Adu",
  "Inchaban",
  "Kansaworodo",
  "Kojokrom",
  "Kokompe",
  "Kwesimintsim",
  "Lagos Town",
  "Market Circle",
  "Mpatado",
  "Mpintsin",
  "New Amanful",
  "New Site",
  "New Takoradi",
  "Nkotompo",
  "Nkroful",
  "Ntankoful",
  "Sawmill",
  "Sekondi",
  "Tadisco",
  "Tanokrom",
  "Westline",
  "Whindo",
  "Windy Ridge",
];


export default function Postjob() {
  const [jobtitle, setJobTitle] = useState("");
  const [jobtype, setJobType] = useState("");
  const [salary1, setSalary1] = useState(null);
  const [salary2, setSalary2] = useState(null);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [expirydate, setExpiryDate] = useState(null);
  const [description, setDescription] = useState<string>("");
  const [category_list, setCategoryList] = useState([]);
  const [job_type_list] = useState([
    { key: "FT", value: "Full-Time" },
    { key: "PT", value: "Part-Time" },
    { key: "CT", value: "Contract" },
    { key: "DJ", value: "Daily Job" },
  ]);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [show, setShow] = useState(false);
  const [link_text, setLinkText] = useState("");
  const [doneUpdate, setDoneUpdate] = useState(false);
  const [minDate] = useState(new Date().toString());
  useEffect(() => {
    new JobPortal().getcategory().then((rs) => {
      setCategoryList(rs.results);
    });
  }, []);
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
  const submitData = async () => {
    if (jobtitle === "") {
      callPrompt("Post A Job", "", "Okay", "Please enter a Job title");
      return;
    }
    if (jobtype.length <= 0 || jobtype === "Select Job Type") {
      callPrompt("Post A Job", "", "Okay", "Please select a Job Type");
      return;
    }
    if (parseFloat(salary2) <= parseFloat(salary1)) {
      callPrompt("Post A Job", "", "Okay", "Please enter minimun salary before maximum");
      return;
    }
    if (category.length <= 0 || category === "Select Category") {
      callPrompt("Post A Job", "", "Okay", "Please select a Job Category");
      return;
    }
    if (location.length < 1) {
      callPrompt("Post A Job", "", "Okay", "Please enter a valid location");
      return;
    }
    if (description.length < 1) {
      callPrompt(
        "Post A Job",
        "",
        "Okay",
        "Please provide a Proper Job description"
      );
      return;
    }
    if (expirydate != null) {
      if (new Date(expirydate) < new Date()) {
        callPrompt(
          "Post A Job",
          "",
          "Okay",
          "Please select a date that is after today"
        );
        return;
      } else {
        callPrompt("Post A Job", "", "", "Please wait ...");
        const job_api = new JobPortal();
        try {
          const result: any = await job_api.postjob({
            title: jobtitle,
            category: category,
            expiry_date: expirydate,
            type: jobtype,
            description: description,
            salary_from: salary1,
            salary_to: salary2,
            location: location,
          });
          if (result.detail) {
            callPrompt("Post A Job", "", "Close", result.detail);
            return;
          }
          if (!result.key) {
            callPrompt(
              "Post A Job",
              "",
              "Okay",
              "An error occured, please try again"
            );
            return;
          }
        } catch (e) {
          
        }
      }
    } else {
      callPrompt("Post A Job", "", "", "Please wait ...");
      const job_api = new JobPortal();
      try {
        const result: any = await job_api.postjob({
          title: jobtitle.toLocaleLowerCase(),
          category: category,
          expiry_date: expirydate,
          type: jobtype,
          description: description,
          salary_from: salary1,
          salary_to: salary2,
          location: location.toLocaleLowerCase(),
        });
        if (result.detail) {
          callPrompt("Post A Job", "", "", result.detail);
          return;
        }
        if (!result.key) {
          callPrompt(
            "Post A Job",
            "",
            "Okay",
            "An error occured, please try again"
          );
          return;
        }
      } catch (e) {
        
      }
    }
    setDoneUpdate(true);
    callPrompt(
      "Post A Job",
      "/jobs/businessjobs",
      "Okay",
      "Job posted successfully"
    );
    clearFiled();
  };
  const clearFiled = () => {
    setJobType("");
    setCategory("");
    setJobTitle("");
    setSalary1("");
    setSalary2("");
    setCategory("");
    setLocation("");
    setExpiryDate("");
    setDescription("");
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
      <div className="page-header w-100">
        <h1 className="page-title">Add Job</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 ">
          <div className="form-group">
            <label style={{ fontWeight: "bolder" }}>
              Job Title <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="job_title_txt"
              className="form-control form-rounded add_job_formleft"
              placeholder="eg. Plumber"
              value={jobtitle}
              required
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: "bolder" }}>
              Job Type <span style={{ color: "red" }}>*</span>
            </label>
            <select
              id="job_type_txt"
              className="form-control form-rounded add_job_formleft"
              value={jobtype}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option>Select Job Type</option>
              {job_type_list.map(
                (jtype: { key: string; value: string }, index: number) => (
                  <option value={jtype.key}>{jtype.value}</option>
                )
              )}
            </select>
          </div>
          <div className="row justify-content-between">
            <div className="form-group col-md-6">
              <label style={{ fontWeight: "bolder" }}>Salary Range</label>
              <input
                type="number"
                id="job_salary1_txt"
                className="form-control form-rounded add_job_formleft1"
                placeholder="Minimum amount"
                value={salary1}
                onChange={(e) => {
                  setSalary1(e.target.value);
                }}
              />
            </div>
            <div className="form-group col-md-6">
              <input
                type="number"
                id="job_salary2_txt"
                className="form-control form-rounded add_job_formleft1"
                placeholder="Maximum amount"
                value={salary2}
                onChange={(e) => {
                  setSalary2(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group md-6">
            <label style={{ fontWeight: "bolder" }}>
              Category <span style={{ color: "red" }}>*</span>
            </label>
            <select
              id="job_type_txt"
              className="form-control form-rounded add_job_formleft"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option>Select Category</option>
              {category_list.map(
                (catlist: { key: string; title: string }, index: number) => {
                  return (
                    <option key={index} value={catlist.key} className="capitalize-text">
                      {catlist.title}
                    </option>
                  );
                }
              )}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label style={{ fontWeight: "bolder" }}>
              Location <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id=""
              className="form-control form-rounded add_job_formright"
              placeholder="Location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            {/* <select
                className="form-control form-rounded add_job_formright"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Location</option>
                {jobLocationData.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select> */}
          </div>
          <div className="form-group">
            <label style={{ fontWeight: "bolder" }}>Expiry Date</label>
            <input
              type="date"
              id="job_exdate_txt"
              className="form-control form-rounded add_job_formright"
              placeholder="29/10/2020"
              min={minDate}
              value={expirydate}
              onChange={(e) => {
                setExpiryDate(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label style={{ fontWeight: "bolder" }} htmlFor="form-label">
              Job Description <span style={{ color: "red" }}>*</span>
            </label>
            <div className="form-group">
              <div
                className="input-group-data add_job_formright"
                id="job_description_txt"
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
                  value={description}
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
      <div className="row justify-content-center job_buttons">
        <div className="mr-3 addjob_btn">
          <button
            className="btn btn-primary btn-block addjob_save_btn mb-1 mt-5"
            id="job_save_btn"
            onClick={() => submitData()}
          >
            Post Job
          </button>
        </div>
        <div>
          <Link href="/jobs/businessjobs">
            <button
              className="btn btn-primary btn-block addjob_cancel_btn mb-1 mt-5"
              id="job_cancel_btn"
              onClick={() => clearFiled()}
            >
              Cancel
          </button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
