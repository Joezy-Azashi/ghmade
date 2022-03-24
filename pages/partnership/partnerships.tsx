import React, { FormEvent, useEffect, useState } from "react";
import ComingSoon from "../../components/ComingSoon";
import FooterLayout from "../../components/FooterLayout";
import MainLayout from "../../components/MainLayout";
import PartnershipCard from "../../components/Partnership/PartnershipCard";
import { useRouter } from "next/router";
import { Partnership } from "../../lib/endpoints/partnership";
import Pagination from "react-paginate";
import { PropagateLoader } from "react-spinners";
import ScrollToTop from "react-scroll-to-top";

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
  "Sekondi",
  "Tadisco",
  "Tanokrom",
  "Westline",
  "Whindo",
  "Windy Ridge",
];

function Partnerships({ currentPage }) {
  const router = useRouter();
  const [partnerships, setAllpartnerships] = useState([])
  const [searchTerm, setSearchterm] = useState("");
  const [categoryFilterName, setCategoryFilterName] = useState("");
  const [typeFilterName, setTypeFilterName] = useState("");
  const [tempList, setTemplist] = useState([])
  const [pageReady, setPageReady] = useState(false);
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const [queryString, setQuerystring] = useState("")
  const [locationFilterName, setLocationFilterName] = useState("");
  const [partnershipType] = useState([
    { key: "GP", value: "General Partner" },
    { key: "LP", value: "Limited Partner" },
  ]);
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
  const [filters, setFilters] = useState({
    business__city: "",
    search: "",
    type: "",
    industry: "",
  });

  const paginate = (page: { selected: number }) => {
    if (pageReady) {
      router.push("/userList/?page=" + (page.selected + 1));
    }
  };

  const searchFilter = async (e: any) => {
    setSearchterm(e.target.value);
    filters.search = e.target.value;
    setFilters(filters);
  }

  const locationFilter = async (event: any) => {
    setLocationFilterName(event.target.value);
    filters.business__city = event.target.value;
    setFilters(filters);
  };
  const typeFilter = async (event: any) => {
    if (event.target.value === "Partnership type") {
      setTypeFilterName("");
      filters.type = "";
      setFilters(filters);
    } else {
      setTypeFilterName(event.target.value);
      filters.type = event.target.value;
      setFilters(filters);
    }
  };

  const industryFilter = async (event: any) => {
    if (event.target.value === "Industry Type") {
      setCategoryFilterName("");
      filters.industry = "";
      setFilters(filters);
    } else {
      setCategoryFilterName(event.target.value);
      filters.industry = event.target.value;
      setFilters(filters);
    }
  };

  useEffect(() => {
    if (searchTerm || locationFilterName || categoryFilterName || typeFilterName) {
      (async () => {
        try {
          const rs = await new Partnership().filterPartnerships(filters)
          if (rs.results) {
            let temp = [...rs.results]
            let filtered: any[] = temp.slice(0, recordsPerPage)
            setAllpartnerships(rs.results.slice(0, recordsPerPage))
            setTemplist(rs.results.slice(0, recordsPerPage))
            settotalRecords(rs.results.length)
          }
        } catch (error) { }
      })();
    }
    else {
      (async () => {
        const rs: any = await new Partnership().listPartnerships(currentPage);
        setAllpartnerships(rs.results)
        setTemplist(rs.results)
        settotalRecords(rs.count)
        setPageReady(true);
      })();
    }
  }, [searchTerm, locationFilterName, categoryFilterName, typeFilterName,])

  useEffect(() => {

    (async () => {
      let rs = await new Partnership().listPartnerships(currentPage)
      if (rs.error) {
      } else if (rs.results) {
        setAllpartnerships(rs.results)
        setTemplist(rs.results)
        settotalRecords(rs.count)
        setPageReady(true);
      }
    })()
  }, [currentPage])

  return (
    <>
      <MainLayout title="Partnerships" pageTitle="Partnerships Page">
        {/*Partnerships Header banner */}
        <div className="jobsbanner mb-5">
          <img
            className="jobsbannerimg"
            src="/assets/images/Partnership-header.jpg"
            alt="HeaderBanner"
          />
          <div className="partnership-text">
            <p className="partnership-text-header">
              Find the perfect <br />
              Partnerships for your Business
            </p>
            <p className="partnership-text-body">
              This is where you get to post partnership requests should you want a partner for your business,
              <br />
              or to view requests made by other businesses, and to get right on to contacting them for prospective{" "}
              <br />
               business adventures.
            </p>
          </div>
        </div>
        {/*Partnerships Header banner */}

        <div className="row">

          {/* The partnerships search column */}
          <div className="col-sm-12 col-md-6 searchjobs mb-5">
            <input
              id="searchpartnerships"
              className="form-control form-rounded"
              type="text"
              placeholder="Search partnerships by name or location"
              onChange={searchFilter}
            />
          </div>

          <div className="col-sm-4 col-md-3 mb-5 filter-partnership">

            <select
              className="form-control form-rounded partnershipfilter"
              onChange={industryFilter}
              value={categoryFilterName}
            >
              <option>Industry Type</option>
              {industry_type_list.map(
                (itype: { key: string; value: string }, index: number) => (
                  <option key={index} value={itype.key}>{itype.value}</option>
                )
              )}
            </select>
          </div>

          <div className="col-sm-12 col-md-3 mb-5">
            <select
              className="form-control form-rounded"
              name="jobstypefilter"
              id="jobstypefilter"
              onChange={typeFilter}
              value={typeFilterName}
            >
              <option>Partnership type</option>
              {partnershipType.map(
                (ptype: { key: string; value: string }, index: number) => (
                  <option value={ptype.key}>{ptype.value}</option>
                )
              )}

            </select>
          </div>

          {/* <div className="col-sm-12 col-md-3 mb-5">
              <select
                    className="form-control form-rounded "
                    onChange={locationFilter}
                    value={locationFilterName}                
              >
                <option value="">Location</option>
              {locationData.map((location: any, index: number) => {
                return (
                  <option
                    className="dropdown-item"
                    key={index}
                    value={location}
                  >
                    {location}
                  </option>
                );         
              })}
                  
              </select>
            </div> */}

        </div>

        {/* The Partnership requested posted (cards) */}
        <div className="row">
          {pageReady && partnerships.length <= 0 ? (
            <div className="" style={{ margin: "auto", marginTop: "50px" }}>
              <p id="no-products" className="no-products-found">
                Searched/filtered item not available.
            </p>
            </div>
          ) : !pageReady ? (
            <div className="" style={{ margin: "auto", marginTop: "50px" }}>
              <PropagateLoader size={30} color="#1b98e0" loading />
            </div>
          ) : null}
          {partnerships.map((item, index) => {
            return <PartnershipCard
              key={index}
              businessName={item.business.title}
              location={item.business.city}
              timestamp={item.timestamp}
              description={item.description}
              type={item.type}
              img={item.business.image}
              id={item.key}
            />
          })}
        </div>

        <div>
          <Pagination
            // initialPage={parseInt(currentPage.toString()) - 1}
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
        <ScrollToTop smooth color="#1b98e0" />
      </MainLayout>
      <FooterLayout />
    </>
  );
}

export default Partnerships;

export async function getServerSideProps({ query: { page = 1 } }) {
  const currentPage = page.toString();
  return {
    props: {
      currentPage,
    },
  };
}