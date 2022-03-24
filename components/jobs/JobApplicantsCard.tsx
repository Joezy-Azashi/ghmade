import Link from "next/link";

interface IApplicants {
  setPDFLink: (str: string) => void;
  applicant: {
    key: string;
    email: string;
    image: any;
    phone_number: string;
    timestamp: string;
    is_accepted: boolean;
    cv: string;
    job: {
      category: string;
      description: string;
      expiry_date: string;
      key: string;
      location: string;
      salary_from: number;
      salary_to: number;
      timestamp: string;
      title: string;
      type: string;
    };
    user: {
      email: string;
      first_name: string;
      id: number;
      is_organization: boolean;
      last_name: string;
      phone_number: string;
    };
  };
}

const JobApplicantsCard = ({ applicant, setPDFLink }: IApplicants) => {
  return (
    <div className="row" style={{ marginTop: "-20px" }}>
      <div className="col-md-12">
        <div className="card card-hover">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="media mt-0">
                  <figure className="rounded-circle align-self-start mb-0">
                    <img
                      src={
                        `${process.env.URL}/${applicant.image}`
                          ? `${process.env.URL}/${applicant.image}`
                          : "/images/profileImage2.png"
                      }
                      alt="Generic placeholder image"
                      className="avatar brround avatar-md mr-3"
                    />
                  </figure>
                  <div className="media-body mb-2">
                    <h4 className="font-weight-semibold leading-normal">
                      {applicant.user.first_name || applicant.user.last_name
                        ? applicant.user.first_name +
                          " " +
                          applicant.user.last_name
                        : "No Name"}
                    </h4>
                    <i className="fe fe-mail fa-lg"></i>
                    <span className="ml-2" style={{ fontWeight: 600 }}>
                      { applicant.email ? <a style={{color: "inherit"}} href={`mailto:${applicant.email}`}>{applicant.email}</a> : "Not provided"}
                    </span>{" "}
                    <br />
                    <i className="fe fe-phone fa-lg"></i>
                    <a style={{color: "inherit"}} href={`tel:${applicant.user.phone_number}`}><span className="ml-2" style={{ fontWeight: 600 }}>
                      { applicant.user.phone_number }
                    </span></a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 title-viewapplicants">
                <div className="media mt-0">
                  <div className="media-body">
                    <h4 className="font-weight-bold leading-normal">
                      Job Title
                    </h4>
                    <span
                      className="capitalize-text"
                      style={{ fontWeight: 600 }}
                    >
                      {applicant.job.title}
                    </span>{" "}
                    <br />
                  </div>
                </div>
              </div>
              <div className="col-md-3 title-viewapplicants">
                <div className="media mt-0">
                  <div className="media-body">
                    <h4 className="font-weight-bold leading-normal">View CV</h4>
                    <span style={{ fontWeight: 600 }}>
                      {applicant.cv ? (
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => setPDFLink(applicant.cv)}
                        >
                          <i className="fe fe-file-text fa-lg mr-2"></i>
                          {applicant.cv.substring(
                            applicant.cv.lastIndexOf("/") + 1
                          )}
                        </a>
                      ) : (
                        "No CV attached"
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-1title-viewapplicants">
                {/* <div className="media media-body">
                  <p></p>
                  <i className="fe fe-trash-2 fa-lg title-viewapplicants" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* col end */}
    </div>
  );
};

export default JobApplicantsCard;
