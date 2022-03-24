import React, { useEffect, useState, useContext } from "react";
import MainLayout from "../../components/MainLayout";
import JobListingCard from "../../components/Job/JobListingCard";
import { Job } from "../../lib/endpoints";
import FooterLayout from "../../components/FooterLayout";
import Pagination from "react-paginate";
import { PropagateLoader } from "react-spinners";
import { Router, useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";
import ScrollToTop from "react-scroll-to-top";

const jobTypeData = [
  { key: "FT", name: "Full-Time" },
  { key: "PT", name: "Part-Time" },
  { key: "CT", name: "Contract" },
  { key: "DJ", name: "Daily Job" },
];

const locationData = [
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

const salaryFilters = [
  { key: "1-500", value: "GHS1 - GHS500" },
  { key: "501-1000", value: "GHS501 - GHS1,000" },
  { key: "1000-10000000000", value: "Above GHS1,000" },
];

export default function JobListing({ currentPage }) {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryFilterName, setCategoryFilterName] = useState("All");
  const [typeFilterName, setTypeFilterName] = useState("Type");
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const [jobsalaryrange, setJobsalaryrange] = useState<any>({
    min: "",
    max: "",
  });
  const [searchTerm, setSearchterm] = useState("");
  const [tempList, setTempList] = useState([]);
  const [pageReady, setPageReady] = useState(false);
  const [jobListing, setJobListing] = useState<any>([]);
  const [filters, setFilters] = useState({
    title: "",
    key: "",
    category: {
      key: "",
      title: "",
    },
    type: "",
    salary_from: "",
    salary_to: "",
    search: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (
      categoryFilterName ||
      typeFilterName ||
      //salaryRangeName ||
      searchTerm ||
      jobsalaryrange.min ||
      jobsalaryrange.max
    ) {
      (async () => {
        try {
          const rs = await new Job().getFilteredJobs(filters);
          setTempList(rs.results);
          settotalRecords(rs.count);
        } catch (error) {}
      })();
    } else {
      (async () => {
        let rs: any = await new Job().getJobListing(currentPage);
        setTempList(rs.results);
        setJobListing(rs.results);
        settotalRecords(rs.count);
        setPageReady(true);
      })();
    }
  }, [
    categoryFilterName,
    typeFilterName,
    //salaryRangeName,
    searchTerm,
    jobsalaryrange.min,
    jobsalaryrange.max,
  ]);

  useEffect(() => {
    (async () => {
      let rs: any = await new Job().getJobListing(currentPage);
      setTempList(rs.results);
      console.log("rs.results", rs.results)
      setJobListing(rs.results);
      settotalRecords(rs.count);
      setPageReady(true);
    })();
  }, [currentPage]);

  useEffect(() => {
    const getCategoryList = async () => {
      const rs: any = await new Job().getJobCategoryList();
      setCategoryList(rs.results);
    };
    getCategoryList();
  }, []);

  useEffect(() => {
    setJobListing(tempList);
  }, [tempList]);

  const categoryFilter = async (event: any) => {
    setCategoryFilterName(event.target.value);
    filters.category.key = event.target.value;
    filters.category.title = event.target[event.target.selectedIndex].text;
    setFilters(filters);
  };

  // const locationFilter = async (event: any) => {
  //   setLocationFilterName(event.target.value);
  //   filters.location = event.target.value;
  //   setFilters(filters);
  // };

  const typeFilter = async (event: any) => {
    setTypeFilterName(event.target.value);
    filters.type = event.target.value;
    setFilters(filters);
  };

  const searchJobListing = (event: any) => {
    setSearchterm(event.target.value);
    filters.search = event.target.value;
    setFilters(filters);
    console.log("filters", filters)
  };

  const minSalaryRange = async (event: any) => {
    setJobsalaryrange({ min: event.target.value });
    filters.salary_from = event.target.value;
    setFilters(filters);
  };

  const maxSalaryRange = async (event: any) => {
    setJobsalaryrange({ max: event.target.value });
    filters.salary_to = event.target.value;
    setFilters(filters);
  };

  const paginate = (page: { selected: number }) => {
    if (pageReady) {
      router.push("/jobs/viewjobsandapply/?page=" + (page.selected + 1));
    }
  };
  return (
    <>
      <MainLayout title={"Job Listing"}>
        {/* Jobs Header Banner */}
        <div className="jobsbanner mb-5">
          <img
            className="jobsbannerimg"
            src="/assets/images/jobsBannerr.jpg"
            alt="HeaderBanner"
          />
          <div className="jobbanner-text">
            <p className="jobbanner-text-header">
              Find the perfect <br />
              job for you
            </p>
            <p className="jobbanner-text-body">
              This Jobs page provides you with access to quick jobs, <br />
              professional jobs, apprenticeship opportunities, and more.
              <br />
              Just post a job if you need a job done for you, or apply for the{" "}
              <br />
              jobs that best suit your interest.
            </p>
          </div>
        </div>
        ​{/* The search and filter */}
        <div className="searchandfilterjobs">
          {/* The search column */}
          <div className="searchjobs">
            <input
              id="searchjobs"
              className="form-control form-rounded"
              type="text"
              placeholder="Search jobs by title or location"
              onChange={searchJobListing}
            />
          </div>
        </div>
        ​{/* The filter column */}
        <div className="filterjobs">
          {/* The job category filter */}
          <div id="jobscategoryfilter__div">
            <div className="jobscategory form-group filter-dropdown-viewjobs ">
              <select
                className="form-control form-rounded"
                name="jobstypefilter"
                id="jobstypefilter"
                onChange={categoryFilter}
                value={categoryFilterName}
              >
                {/*Map Category data here*/}
                <option value="">Category</option>
                {categoryList.map((category: any) => {
                  return (
                    <option
                      className="dropdown-item"
                      key={category.key}
                      value={category.key}
                    >
                      {category.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* The end of the category filter */}​{/* The job type filter */}
          <div id="jobstypefilter__div col-md-3">
            <div className="jobstype form-group filter-dropdown-viewjobs">
              <select
                className="form-control form-rounded"
                name="jobscategoryfilter"
                id="jobscategoryfilter"
                value={typeFilterName}
                onChange={typeFilter}
              >
                <option value="">Select Job Type</option>
                {jobTypeData.map((jtype: any, index: number) => (
                  <option key={index} value={jtype.key}>
                    {jtype.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* The end of the job type filter */}​{/* The job location filter */}
          {/* The end job location filter */}​{/* The job salary filter */}
          <div id="jobscategoryfilter__div">
            <div className="jobssalary form-group filter-dropdown-viewjobs">
              <input
                type="number"
                placeholder="salary minimum value"
                className="form-control form-rounded"
                name="jobscategoryfilter"
                id="jobscategoryfilter"
                value={jobsalaryrange.min}
                onChange={minSalaryRange}
              />
            </div>
          </div>
          <div id="jobscategoryfilter__div">
            <div className="jobssalary form-group filter-dropdown-viewjobs">
              <input
                type="number"
                placeholder="salary maximum value"
                className="form-control form-rounded"
                name="jobscategoryfilter"
                id="jobscategoryfilter"
                value={jobsalaryrange.max}
                onChange={maxSalaryRange}
              />
            </div>
          </div>
          {/* The end job salary filter */}
        </div>
        {/* The end filter column */}​{/* The end search and filter */}​
        {/* The jobs posted (cards) */}
        <div className="row">
          {/* The column of card to be looped */}
          {!pageReady ? (
            <div className="" style={{ margin: "auto", marginTop: "50px" }}>
              <PropagateLoader size={30} color="#1b98e0" loading />
            </div>
          ) : jobListing.length <= 0 ? (
            <div className="" style={{ margin: "auto", marginTop: "50px" }}>
              <p id="no-products" className="no-products-found">
                No Jobs found, Please refine your search and try again
              </p>
            </div>
          ) : null}
          {jobListing.map((job: any, index: number) => {
            return <JobListingCard key={index} job={job} />;
          })}
          {/* the column of card to be looped */}
        </div>
        ​
        <div
          className="row market-pagi"
          id="paginate-row"
          // style={{ margin: "10px"}}
        >
          {totalRecords > 0 ? (
            <div className="col-md-12 text-right">
              <Pagination
                initialPage={parseInt(currentPage.toString()) - 1}
                onPageChange={paginate}
                pageCount={totalRecords / recordsPerPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                containerClassName="pagination ml-auto row justify-content-end d-flex"
                previousLabel="<<Prev"
                nextLabel="Next>>"
                activeLinkClassName="active"
                disabledClassName="pagination_next_prev_dissable"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        ​{/* The end jobs posted (cards) */}
        <ScrollToTop smooth color="#1b98e0" />
      </MainLayout>
      ​
      <FooterLayout />
    </>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const currentPage = page.toString();
  return {
    props: {
      currentPage,
    },
  };
}
