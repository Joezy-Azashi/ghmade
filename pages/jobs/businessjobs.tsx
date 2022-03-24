import { useEffect, useState } from "react";
import JobCard from "../../components/jobs/JobCard";
import MainLayout from "../../components/MainLayout";
import Prompt from "../../components/Prompt";
import { JobPortal } from "../../lib/endpoints/jobportal";
import Pagination from "react-paginate";
import { PropagateLoader } from "react-spinners";
import { useRouter } from "next/router";
import ScrollToTop from "react-scroll-to-top";

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
  "Bankyease",
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
// const jobSalaryRangeData = [
//   { key: "1-499", value: "1 - 499" },
//   { key: "50-999", value: "500 - 999" },
//   { key: "1000-9999", value: "1,000 - 9,999" },
//   { key: "10000-999999", value: "10,000 - 100,000" },
//   ,
// ];

function businessjobs({ currentPage }) {
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const [jobCategoryData, setJobCategoryData] = useState([]);
  const [jobTypeData] = useState([
    { key: "FT", name: "Full Time" },
    { key: "PT", name: "Part Time" },
    { key: "CT", name: "Contract" },
    { key: "DJ", name: "Daily Job" },
  ]);
  const [category, setCategory] = useState("");
  const [jobtype, setJobType] = useState("");
  const [joblocation, setJoblocation] = useState("");
  const [jobsalaryrangemin, setJobsalaryrangeMin] = useState("");
  const [jobsalaryrangemax, setJobsalaryrangeMax] = useState("");
  const [searchtext, setSearchtext] = useState("");
  const [jobs, setJobs] = useState([]);
  const [joblists, setJobLists] = useState([]);
  const [owner, setOwner] = useState({ title: "", image: "" });
  const [checkedList, setCheckedList] = useState([]);
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [pageReady, setPageReady] = useState(false);
  const router = useRouter();

  const handleClose = () => setShow(false);
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
    let filter = JSON.parse(JSON.stringify(jobs));
    if (searchtext.length > 0) {
      filter = filter.filter((job) => {
        return (
          job.title.includes(searchtext.toLowerCase()) ||
          job.category.title.toLowerCase().includes(searchtext) ||
          job.location.includes(searchtext.toLowerCase()) ||
          job.salary_from >= searchtext ||
          job.salary_to <= searchtext
        );
      });
    }
    if (category.length > 0)
      filter = filter.filter((job) => {
        return job.category.key == category;
      });

    if (jobtype.length > 0)
      filter = filter.filter((job) => {
        return job.type == jobtype;
      });

    if (joblocation.length > 0)
      filter = filter.filter((job) => {
        return job.location == joblocation;
      });

    if (parseInt(jobsalaryrangemin) > 0)
      filter = filter.filter((job) => {
        return parseInt(jobsalaryrangemin) <= parseInt(job.salary_from);
      });

    if (parseInt(jobsalaryrangemax) > 0)
      filter = filter.filter((job) => {
        return (
          parseInt(jobsalaryrangemax) >= parseInt(jobsalaryrangemin) &&
          parseInt(jobsalaryrangemax) >= parseInt(job.salary_to)
        );
      });

    // if (
    //   searchtext.length == 0 &&
    //   category.length == 0 &&
    //   jobtype.length == 0 &&
    //   joblocation.length == 0 &&
    //   parseInt(jobsalaryrangemin) == 0 &&
    //   parseInt(jobsalaryrangemax) == 0
    // ) {
    //   setFilter(JSON.parse(JSON.stringify(jobs)));
    // }
    setJobLists(filter.slice(0, 10));
  }, [
    category,
    jobtype,
    joblocation,
    jobsalaryrangemin,
    jobsalaryrangemax,
    searchtext,
  ]);

  const setCheck = (id) => {
    const t = joblists.map((j) => {
      if (j.key == id) {
        j.checked = !j.checked;
      }
      return j;
    });
    setJobLists(t);
  };

  useEffect(() => {
    const ls = JSON.parse(window.localStorage.getItem("user-profile"));
    setOwner(ls);
    new JobPortal().getjobs(currentPage).then((joblist: any) => {
      if (Array.isArray(joblist.results) && joblist.results.length > 0) {
        setJobs(joblist.results);
        setJobLists(joblist.results);
        settotalRecords(joblist.count);
        setPageReady(true);
      }
      setPageReady(true);
    });

    new JobPortal().getcategory().then((rs) => {
      setJobCategoryData(rs.results);
    });
  }, [currentPage]);

  const paginate = (page: { selected: number }) => {
    if (pageReady) {
      router.push("/jobs/businessjobs/?page=" + (page.selected + 1));
    }
  };

  return (
    <>
      <MainLayout>
        ​{/* MY JOB AND SEARCH BAR STARTS HERE */}
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
        <div className="row page-header ">
          <div>
            <h1 className="page-title">My Jobs</h1>
          </div>
          <div>
            <input
              id="printorder"
              className="form-control  form-rounded downloadordersearch"
              type="text"
              placeholder="Search by job title or location"
              value={searchtext}
              onChange={(e) => setSearchtext(e.target.value)}
            />
          </div>
        </div>
        {/* MY JOB AND SEARCH BAR ENDS HERE */}​{/* FILTERS STARTS FROM HERE */}
        <div className="d-flex filtermarketplace" id="filtersrow">
          <div id="categoryfilter__div">
            <div className="form-group mt-2 filter-dropdown-job ">
              <select
                className="form-control form-rounded"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Category</option>
                {jobCategoryData.map((category: any, index: number) => {
                  return (
                    <option
                      className="dropdown-item"
                      key={index}
                      value={category.key}
                    >
                      {category.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div id="typefilterdiv">
            <div className="form-group mt-2 filter-dropdown-job">
              <select
                className="form-control form-rounded"
                value={jobtype}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">Type</option>

                {jobTypeData.map((j) => {
                  return (
                    <option value={j.key} key={j.key}>
                      {j.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div id="minpricefilter__div">
            <div className="form-group mt-2 filter-dropdown-job">
              <input
                type="number"
                placeholder="salary minimum value"
                className="form-control form-rounded"
                value={jobsalaryrangemin}
                onChange={(e) => setJobsalaryrangeMin(e.target.value)}
              />
            </div>
          </div>
          <div id="minpricefilter__div">
            <div className="form-group mt-2 filter-dropdown-job">
              <input
                type="number"
                placeholder="salary maximum value"
                className="form-control form-rounded"
                value={jobsalaryrangemax}
                onChange={(e) => setJobsalaryrangeMax(e.target.value)}
              />
            </div>
          </div>
          ​
          <div>
            <button
              className="btn btn-primary mt-2 delete-selected-job"
              onClick={async () => {
                if (checkedList.length > 0) {
                  callPrompt("Deleting Job(s)", "", "", "Please wait...");
                  let jobs = JSON.parse(JSON.stringify(joblists));
                  for (let i = 0; i < checkedList.length; i++) {
                    const rs = await new JobPortal().deletejob(checkedList[i]);
                    jobs = jobs.filter((item) => item.key !== checkedList[i]);
                  }
                  callPrompt(
                    "Deleting Job(s)",
                    "",
                    "Close",
                    "Job deleted successfully"
                  );
                  setJobLists(jobs);
                  setCheckedList([]);
                } else {
                  callPrompt(
                    "Deleting Job(s)",
                    "",
                    "Close",
                    "Select a job or jobs to delete"
                  );
                }
              }}
            >
              Delete
            </button>
          </div>
          ​
        </div>
        ​{/* FILTERS STARTS FROM HERE */}​
        {/* CARD WITH JOB DETAILS STARTS FROM HERE */}
        <div className="row mt-3">
          {pageReady && joblists.length <= 0 ? (
            <div className="" style={{ margin: "auto", marginTop: "50px" }}>
            <p id="no-products" className="no-products-found">
              You haven't posted any job(s) yet.
            </p>
            </div>
          ) : !pageReady ? (
            <div className="" style={{ margin: "auto", marginTop: "50px" }}>
              <PropagateLoader size={30} color="#1b98e0" loading />
            </div>
          ) : null}
          {joblists.map((job: any, index: number) => {
            return (
              <JobCard
                key={index}
                job={job}
                owner={owner}
                setCheckedList={setCheckedList}
                setCheck={setCheck}
              />
            );
          })}
        </div>
        {/* CARD WITH JOB DETAILS ENDS FROM HERE */}​ ​
        <div
          className="row market-pagi"
          id="paginate-row"
          // style={{ margin: "10px"}}
        >
          <div className="col-md-12 text-right">
            <Pagination
              initialPage={parseInt(currentPage.toString()) - 1}
              onPageChange={paginate}
              pageCount={totalRecords / recordsPerPage}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              containerClassName="pagination ml-auto row d-flex justify-content-end"
              previousLabel="<<Prev"
              nextLabel="Next>>"
              activeLinkClassName="active"
              disabledClassName="pagination_next_prev_dissable"
            />
          </div>
        </div>
        {/* </div> */}
        <ScrollToTop smooth color="#1b98e0"/>
      </MainLayout>
    </>
  );
}
export default businessjobs;

export async function getServerSideProps({ query: { page = 1 } }) {
  const currentPage = page.toString();
  return {
    props: {
      // product: data,
      // page: +page
      currentPage,
    },
  };
}
