import React, { useRef, useEffect } from "react";
import { useState } from "react";
import MainLayout from "../../../components/MainLayout";
import { Job } from "../../../lib/endpoints/job";
import Prompt from "../../../components/Prompt";
import getConfig from "next/config";
import ApplyButNotSignedInModal from "../../../components/Job/Modals/ApplyButNotSignedInModal";
import ApplySignedIn from "../../../components/Job/Modals/ApplySignedIn";
import { Router, useRouter } from "next/router";
import moment from "moment";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Users } from "../../../lib/endpoints";
import Link from "next/link";

export default function jobDetails() {
  const CVInputRef = useRef(null);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState(
    "File size should not be more than 5MB"
  );
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [show, setShow] = useState(false);
  const [job, setJobKey] = useState(null);
  const [cpa, setCpa] = useState(false);
  //const [isLoggedin, setIsloggedin] = useState<boolean>();
  const [profile, setProfile] = useState();
  const [doneUpdate, setDoneUpdate] = useState(false);
  const [shouldUploadCV, setShouldUpalodCV] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [cv, setCV] = useState(null);
  const [jobData, setJobData] = useState<any>({});
  const [pageReady, setPageReady] = useState(false);
  const jobTypes = {
    FT: "Full-Time",
    PT: "Part-Time",
    CT: "Contract",
    DJ: "Daily Job",
  };

  //Check whether user is logged in
  useEffect(() => {
    const jobid = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    setJobKey(jobid);

    fetch(`${process.env.URL}/jobportal/detailed-job/${jobid}`)
      .then((result) => result.json())
      .then((data) => {

        setJobData(data);
        setPageReady(true);
      })
      .catch((e) => console.log("ERROR", e));

    let uprofile = window.localStorage.getItem("cp-a");
    if (uprofile) {
      setCpa(true);
    }

    const formdata = new FormData();
    formdata.append("job", jobid), setCV(formdata);
    let key = window.localStorage.getItem("cart_id");
    //setJobid(key);
    let userprofile: any = JSON.parse(
      window.localStorage.getItem("user-profile")
    );
    setProfile(userprofile);
    let lStorage: any = window.localStorage.getItem("cp-a");
    lStorage = JSON.parse(lStorage);
    if (lStorage) {
      setCpa(true);
    } else {
      setCpa(false);
    }
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

  const router = useRouter();

  const handleClose = () => {
    if (doneUpdate) {
      router.push("/jobs");
    }
    setShow(false);
  };

  const onFileUpload = (e) => {
    const formdata = new FormData();
    if (e.target.files[0].size <= 5242880) {
      formdata.append("cv", e.target.files[0], e.target.files[0].name);
    } else {
      callPrompt("CV Upload", "", "Okay", "Upload file less than 5MB");
      return;
    }
    formdata.append("job", job), setCV(formdata);
    setFile(file);
    setFileName(e.target.files[0].name);
    setShowDelete(true);
  };

  const onDelete = () => {
    const formdata = new FormData();
    formdata.append("job", job), setCV(formdata);
    setFileName("File size should not be more than 5MB");
  };

  return (
    <>
      <MainLayout title={jobData.title}>
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
        {/* page-header */}
        <div className="row ml-0 page-header">
          <h1 className="page-title">Job Details</h1>
        </div>
        {/* End page-header */}
        {pageReady ? (
          <div className="row ">
            <div className="card job-detail-card row pt-5 mb-5 ">
              <div>
                <h5 className="ml-6 jobdetailtext capitalize-text">
                  {jobData.title}
                </h5>
              </div>
              <div className="row justify-content-evenly ml-1">
                <div>
                  <h6 className="fe fe-map-pin ml-5">
                    <span className="ml-2 capitalize-text">
                      {jobData.location}
                    </span>
                  </h6>
                </div>
                <div>
                  <h6 className="fe fe-clock ml-5">
                    <span className="ml-2 capitalize-text">
                      {moment(jobData.timestamp).fromNow()}
                    </span>
                  </h6>
                </div>
              </div>
            </div>

            <div className="card job-detail-card2 row  ">
              <div className="row ml-5 mr-5 pt-1">
                <div className="col-md-12 jobdetailtext">Job Details</div>
                <div className="col-md-3">
                  <div className="jobdetailheader">Salary</div>
                  {jobData.salary_from && jobData.salary_to != null ? (
                    <div className="jobsdetailsinfo">
                      GHS <span>{jobData.salary_from}</span> - GHS
                      <span>{jobData.salary_to}</span>
                    </div>
                  ) : (
                      `Confidential`
                    )}
                </div>
                <div className="col-md-3">
                  <div className="jobdetailheader">Type</div>
                  <div>{jobTypes[jobData.type]}</div>
                </div>
                <div className="col-md-3">
                  <div className="jobdetailheader">Category</div>
                  <div className="capitalize-text">
                    {jobData.category.title}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="jobdetailheader">Expiry Date</div>
                  {jobData.expiry_date != null ? (
                    <div>{jobData.expiry_date}</div>
                  ) : (
                      `None`
                    )}
                </div>
              </div>
            </div>

            {jobData.owner.description ?
              <div className="card job-detail-big-card row d-flex justify-content-end pt-1 pb-6 pl-5 pr-5 ">
                <div className="jobDescrition-jobDetailsc col-md-12 mt-2 mb-5">
                  <div className="mb-3 jobdescriptionheader jobdetailtext">
                    Business Description
                </div>

                  <div>
                    <p className="jobdescriptiontext bulletpoint" >{ReactHtmlParser(jobData.owner.description)} </p>
                  </div>
                </div>
              </div> : null}

            <div className="card job-detail-big-card row d-flex justify-content-end pt-1 pb-6 pl-5 pr-5 ">
              <div className="jobDescrition-jobDetailsc col-md-12 mt-2 mb-5">
                <div className="mb-3 jobdescriptionheader jobdetailtext">
                  Job Description
                </div>

                <div>
                  <p className="jobdescriptiontext bulletpoint" >{ReactHtmlParser(jobData.description)} </p>
                </div>
              </div>

              <div className="col-md-12 d-flex pl-0">
                <div className="col-md-6 justify-content-start ">
                  <p>
                    <strong>Posted by </strong>
                    <Link href="/shops/[shops]"
                      as={`/shops/${jobData.owner.slug}`}
                      >
                    <img
                      className="business-image ml-4 mr-4"
                      src={
                        jobData.owner.image
                          ? jobData.owner.image
                          : "/assets/images/default-add-image.png"
                      }
                      alt=""
                    />
                    </Link>
                    <Link href="/shops/[shops]"
                      as={`/shops/${jobData.owner.slug}`}
                      >
                    <strong className="capitalize-text">
                      {jobData.owner.title}
                    </strong>
                    </Link>
                  </p>
                </div>

                <div className="col-md-6 ">
                  <div className="row jobdetailsbuttons justify-content-end">
                    <input
                      type="file"
                      ref={CVInputRef}
                      accept="application/pdf"
                      style={{ display: "none" }}
                      onChange={onFileUpload}
                    />
                    {cpa ? (
                      <button
                        className="btn btn-primary uploadcv-buttons mr-5"
                        onClick={(e) => {
                          e.preventDefault();
                          CVInputRef.current!.click();
                        }}
                      >
                        {"Upload CV"}
                      </button>
                    ) : (
                        ""
                      )}

                    <button
                      className="btn btn-primary applyjob-buttons"
                      id="apply"
                      data-toggle="modal"
                      data-target={
                        cpa ? "#applyloggedin" : "#applynotloggedIn"
                      }
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {cpa ? (
                <div className="row d-flex justify-content-end mr-2 mt-1">
                  <i className="jobdetails-file-icon mr-3 fe fe-file-text" />
                  <span className="uploaded-filename">{fileName}</span>
                  {showDelete ? (
                    <i className="fe fe-x-circle mt-1" onClick={onDelete} />
                  ) : null}
                </div>
              ) : (
                  ""
                )}
            </div>
          </div>
        ) : null}
        <ApplyButNotSignedInModal cv={file} job_id={job} />
        <ApplySignedIn cv={cv} filename={fileName} job_id={job} />
      </MainLayout>
    </>
  );
}
