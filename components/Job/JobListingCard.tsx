import Link from "next/link";
import moment from "moment";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default function JobListingCard({ job }: any) {
  return (
    <div className="col-md-6">
      {/* The main card*/}
      <Link href="/jobs/details/[key]" as={`/jobs/details/${job.key}`}>
        <div className="myjobscard card card-hover">
          <div className="row justify-content-between">
            <div className="card-title job-card-title mt-4">
              <h5 className="ml-5 capitalize-text">
                <strong>{job.title}</strong>
              </h5>
            </div>
          </div>

          <div className="row">
          <div className="col-md-12 d-flex justify-content-evenly">
            <div>
              <h6 className="fe fe-map-pin ml-5">
                <span className="ml-2 capitalize-text">{job.location}</span>
              </h6>
            </div>
            <div>
              <h6 className="fe fe-clock ml-5">
                <span className="ml-2 capitalize-text">
                  {moment(job.timestamp).fromNow()}
                </span>
              </h6>
            </div>
          </div>
          </div>
          <div className="row mt-4">
            <h5 className="ml-5">
              <strong>Job Description</strong>
            </h5>
          </div>
          <div className="row">
            <p className="ml-5 jobportal-description bulletpoint">
              {ReactHtmlParser (job.description)} 
            </p>
          </div>
          <div className="row justify-content-between mb-2">
            <div className="row">
              <span>
                <img
                  className="business-image ml-6"
                  src={
                    job.owner.image
                      ? job.owner.image
                      : "/assets/images/default-add-image.png"
                  }
                  alt=""
                />
              </span>
              <span>
                <h5 className="ml-2 mt-2 jobBusinessName">
                  <strong>{job.owner.title}</strong>
                </h5>
              </span>
            </div>
            <div>
              <span className="">
                <h5 className="mr-5 mt-3">
                  {job.salary_from || job.salary_to ? (
                    <strong>
                      Salary range: GHS {job.salary_from} - GHS {job.salary_to}
                    </strong>
                  ) : (
                    <strong>Salary: Confidential</strong>
                  )}
                </h5>
              </span>
            </div>
          </div>
        </div>
      </Link>
      {/* the end main card to be looped */}
    </div>
  );
}
