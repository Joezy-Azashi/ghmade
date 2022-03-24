import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const JobCard = ({ job, owner, setCheckedList, setCheck }) => {
  return (
    <div className="col-md-6 ">
      <div className="myjobscardmain card">
        <div className="row ">
          ​
          <div className="col-md-12 d-flex justify-content-between">
          <div className="mt-4">
            <h5 className="ml-2 capitalize-text"> <strong>{ job.title }</strong></h5>
          </div>
          ​
          <div className="d-flex">
              <div className="mr-2">
                <input
                  className="mt-4"
                  type="checkbox"
                  checked={job.checked}
                  onChange={(e) => {
                    setCheck(job.key);
                    if (e.target.checked) {
                      setCheckedList((prev) => [...prev, job.key]);
                    } else {
                      setCheckedList((prev) => {
                        prev.splice(
                          prev.findIndex((i) => i == job.key),
                          1
                        );
                        return prev;
                      });
                    }
                  }}
                />
              </div>
              <div style={{marginTop: "13.5px"}}>
                  <Link href="/jobs/edit/[jobid]" as={`/jobs/edit/${job.key}`}><i className="fe fe-edit-2"></i></Link>
              </div>
          </div>
          </div>
        </div>
        ​
        <Link href="/jobs/edit/[jobid]" as={`/jobs/edit/${job.key}`}>
          <a className="jobcard">
            <div className="row ">
              ​
              <div className="col-md-12 d-flex justify-content-evenly">
              <div className="ml-0">
                <h6 className="fe fe-map-pin ml-2">
                  <span className="ml-2 mr-2 capitalize-text">{job.location}</span>
                </h6>
              </div>
              ​
              <div>
                <h6 className="ml-5 fe fe-clock">
                  <span className="ml-2 mr-2 capitalize-text">{moment(job.timestamp).fromNow()}</span>
                </h6>
              </div>
              </div>
            </div>
            ​
            <div className="row">
              <h5 className="ml-5 mb-0">
                <strong>Job Description</strong>
              </h5>
            </div>
            ​
            <div className="row ">
              <p className="ml-5 job-description bulletpoint"><div>{ReactHtmlParser (job.description)}</div></p>
            </div>
            <div className="">
              <span className="row">

                { job.salary_from && job.salary_to != null ?
                   <h5 className="ml-5">
                   <strong>
                     Salary range: GHS {job.salary_from} - GHS {job.salary_to}
                   </strong>
                 </h5>
              : 
                <h5 className="ml-5">
                  <strong>
                    Salary: Confidential
                  </strong>
                </h5>
              }

              </span>
            </div>
            ​
          </a>
        </Link>
      </div>
      <style jsx>{`
        a.jobcard:hover {
          color: black;
        }
      `}</style>
    </div>
  );
};

export default JobCard;