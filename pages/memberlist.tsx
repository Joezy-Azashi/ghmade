import MainLayout from "../components/MainLayout";
import UserProfilePopup from "../components/UserProfilePopup";
import { Users } from "../lib/endpoints";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { CSVLink, CSVDownload } from "react-csv";
import Pagination from "react-paginate";
import FooterLayout from "../components/FooterLayout";
import ScrollToTop from "react-scroll-to-top";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import { User } from "react-feather";
const disabled = {};

export default function Memberlist({ currentPage }) {
  const [userProfiles, setUserProfiles] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const [order, setOrder] = useState(false);
  const [userProfile, setUserProfile] = useState<any>();
  const [readyPopupData, setReadyPopupData] = useState(false);
  const [togglelist, setTogglelist] = useState(true);
  const [torender, setTorender] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [pageReady, setPageReady] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const [allOrdersCSV, setAllOrdersCSV] = useState([]);

  // const [rs, setRs] = useState([]);
  const [title, setTitle] = useState("Organizations");
  const [individualListPageNumber, setIndividualListPageNumber] = useState(0);
  const [businessListPageNumber, setBusinessListPageNumber] = useState(0);
  const [forcePage, setForcePage] = useState(0);

  const router = useRouter();

  const getUserDetails = async (id, uprofile) => {
    setReadyPopupData(false);
    let rs = await new Users().getUserAccountDetails(id);
    // check privacy
    
   
    setReadyPopupData(true);
 
  };
  

  const createDataForCSV = async () => {
    const memberData = [];
    allMembers.map((member: any) => {
if(toggleIndividual){
  const row = {
  
  Name:member.name,
  Location: member.street_address 
   // "Date": moment(order.timestamp).format('llll')
 };
 memberData.push(row);
}

  const row = {
  
  Name:member.title,
    Location: member.city
    // "Date": moment(order.timestamp).format('llll')
  };
  memberData.push(row);

    

    });
    setAllOrdersCSV(memberData);
  };

  useEffect(() => {
    (async () => {
      let cp = 0;
      if (togglelist) {
        cp = businessListPageNumber + 1;
        setForcePage(businessListPageNumber);
     
      } else {
        cp = individualListPageNumber + 1;
        setForcePage(individualListPageNumber);
      }
      let rs = null;
let rs2 = null;
      let uProfile = JSON.parse(window.localStorage.getItem("user-profile"));
 

      rs2= await new Users().getIndividualProfilesForAdm
      console.log("rs2",rs2.reaults)


      if (!uProfile) {
        if (togglelist) {
          rs = await new Users().getOrganizationProfilesForAdmin(cp);
         
        } else {
          rs = await new Users().getUnregisteredUsersProfile(cp);
       
          
        }
      }

      if (uProfile && uProfile.user.is_staff) {
        if (togglelist) {
          rs = await new Users().getOrganizationProfilesForAdmin(cp);
         
        } else {
          rs = await new Users().getUnregisteredUsersProfile(cp);
     
        }
      } else {
        if (uProfile && uProfile.user.is_organization) {
          if (togglelist) {
            rs = await new Users().getOrganizationProfilesForAdmin(cp);
          
            
          } else {
            rs = await new Users().getUnregisteredUsersProfile(cp);
           
          }
        } else if (uProfile && uProfile.user.is_organization === false) {
          if (togglelist) {
            rs = await new Users().getOrganizationProfilesForAdmin(cp);
            
          
          } else {
            rs = await new Users().getProfiles(cp);
            
         
          }
        }
      }

      if (rs.error) return;
setAllMembers(rs.results)

      let temp = rs.results.filter(
        (uProfile) => uProfile.user.is_staff === false
      );
      setTempList(temp);
    
      setPageReady(true);
      try {
        setUserProfiles(temp);
      } catch (e) { }
      settotalRecords(rs.count);
    })();
  }, [togglelist, currentPage]);

  useEffect(() => {
    if (window.localStorage.getItem("user-profile")) {
      setUserProfile(JSON.parse(window.localStorage.getItem("user-profile")));
    }
  }, []);



  const paginate = (page: { selected: number }) => {
    if (pageReady) {
      if (togglelist) {
        setBusinessListPageNumber(page.selected);
    
      } else {
        setIndividualListPageNumber(page.selected);
      }
      router.push("/memberlist/?page=" + (page.selected + 1));
      //setCurrentPage(page.selected + 1);
    }
  };

  const searchLocation = (e: any) => {
    const ts = tempList.filter((p) => {
      let location =
        title === "Organizations" && p.title
          ? p.title
          : title === "Individuals" && p.name
            ? p.name
            : "No Name";
      return location
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    });
    setUserProfiles(ts.slice(0, recordsPerPage));
    settotalRecords(ts.length);
  };
  const sortByName = () => {
    if (order === true) {
      setOrder(false);
    } else if (order === false) {
      setOrder(true);
    }
    const sorted = [...userProfiles];
    const sortedList = sorted.sort(function (a, b) {
      let first =
        title === "Organizations" && a.title
          ? a.title.toLocaleLowerCase()
          : title === "Individuals" && a.name
            ? a.name.toLocaleLowerCase()
            : "No Title";
      let second =
        title === "Organizations" && b.title
          ? b.title.toLocaleLowerCase()
          : title === "Individuals" && b.name
            ? b.name.toLocaleLowerCase()
            : "No Title";
      return first.localeCompare(second);
    });
    setUserProfiles([...sortedList].slice(0, recordsPerPage));
  
    settotalRecords([...sortedList].length);
  };
  const toggleIndividual = () => {
    setPageReady(true);
    router.push("/memberlist");
    setTogglelist(false);
    setTitle("Individuals");
    setTorender("Individuals");
    setDropdown("dropdown");
    setPageReady(true);
  };
  const toggleOrganization = () => {
    router.push("/memberlist");
    setTogglelist(true);
    setTitle("Organizations");
    setTorender("Organizations");
    setDropdown(null);
  };

  return (
    <>
      <MainLayout title="Memberlist Page" pageTitle="">
        {/* page-header */}
        <div>
          <div className="page-header ">
            <h1 className="page-title">Member List</h1>
            <div className="d-flex ">
              {userProfile && userProfile.user.is_staff ? (
                <CSVLink
                  filename={"order_report.csv"}
                  className="btn btn-primary printorderbtn mr-2"
                  style={{ marginTop: "0px" }}
                  type="submit"
                  id="download-btn"
                  data={allOrdersCSV}
                  asyncOnClick={true}
                  onClick={createDataForCSV}
                >
                  Download Member List
                </CSVLink>
              ) : null}

              <div className="inner-addon right-addon nopadding">
                <i className="fe fe-search fa-lg" />
                <input
                  id="searchmember"
                  className="form-control form-rounded"
                  type="text"
                  placeholder="Search..."
                  onChange={searchLocation}
                />
              </div>
            </div>
          </div>
          {/* End page-header */}
          <div className=" tabledt responsivetable">
            <div className="row">
              <h5
                className="mt-4 mb-3 ml-5 table-title"
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  marginLeft: "38px !important",
                }}
                id="toggle-title"
              >
                ghmade {title}
              </h5>

              <div className="ml-auto">
                <div className="dropdown">
                  <a
                    className="nav-link mnav-link pr-0 leading-none d-flex pt-1"
                    data-toggle="dropdown"
                  >
                    <div className="mt-3 mb-3 mr-5 table-title">
                      <span
                        style={{
                          color: "#3f3d56",
                          fontSize: "13px",
                          marginRight: "20px",
                        }}
                      >
                        Toggle List
                        <i className="fe fe-list fa-lg ml-1" />
                      </span>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow memberlisthover">
                    <a
                      className="dropdown-item header-item-style"
                      id="display-individuals"
                      onClick={toggleIndividual}
                    >
                      ghmade Individuals
                    </a>
                    <a
                      className="dropdown-item header-item-style"
                      id="display-organizations"
                      onClick={toggleOrganization}
                    >
                      ghmade Organizations
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="responsivetable">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-muted ml-5">
                      <div className="dropdown">
                        <span id="toggle-sort">
                          <span className="ml-3">Name </span>
                          <i
                            className={`fa fa-sort-amount-${order ? "asc" : "desc"
                              }`}
                          ></i>
                        </span>
                        <div className="dropdown-content ml-8">
                          <div>
                            <div className="ml-2 mt-3">
                              <span>Sort by</span>
                            </div>
                            <div className="ml-2 mt-3 tbtheadcolor">
                              <span onClick={sortByName} id="sort-by-name">
                                Name (A-Z)
                              </span>
                            </div>
                            <div className="ml-2 mt-3 mb-2 tbtheadcolor">
                              <span id="sort-by-location">Location</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                    <th scope="col" className="text-muted">
                      Location
                    </th>
                    {togglelist ? null : (
                      <>
                        <th scope="col" className="text-muted">
                          {/* Actions */}
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {userProfiles.map((uprofile: any, index: number) => {
                    
                    return (
                      <tr key={index}>
                        {uprofile.title || uprofile.name != null ? (
                          <td>
                            <div className="dropdown ddmargin pr-6">
                              <a
                                className="nav-link mnav-link"
                                data-toggle={dropdown}
                                onClick={(e) => {
                                  if (title === "Individuals") {
                                    setTorender("Individuals");
                                    setDropdown("dropdown");
                                  } else if (title === "Organizations") {
                                    setTorender("Organizations");
                                  }
                                  getUserDetails(uprofile.user.id, uprofile);
                                }}
                              >
                                <span
                                  className="avatar avatar-md brround cover-image"
                                  data-image-src="/images/blank_avatar.jpeg"
                                ></span>
                                <Link
                                  href="/shops/[shops]"
                                  as={`/shops/${uprofile.slug}`}
                                >
                                  <img
                                    src={
                                      uprofile.image
                                        ? uprofile.image
                                        : "/assets/images/Profile_Icon.png"
                                    }
                                    className="brround ddimg"
                                    alt=""
                                  />
                                </Link>
                                {title === "Individuals" &&
                                  uprofile.name === "" ? (
                                  <span
                                    className="ml-5 bolder-text"
                                    id="memberid"
                                  >
                                    No name
                                  </span>
                                ) : title === "Individuals" &&
                                  uprofile.name !== "" ? (
                                  <span
                                    className="ml-5 bolder-text "
                                    id="memberid"
                                  >
                                    {uprofile.name}
                                  </span>
                                ) : (title === "Organizations" &&
                                  uprofile.title === "") ||
                                  uprofile.title === null ? (
                                  <span
                                    className="ml-5 bolder-text"
                                    id="memberid"
                                  >
                                    No title
                                  </span>
                                ) : title === "Organizations" &&
                                  uprofile.title !== "" ? (
                                  <Link
                                    href="/shops/[shops]"
                                    as={`/shops/${uprofile.slug}`}
                                  >
                                    <span
                                      className="ml-5 bolder-text"
                                      id="memberid"
                                    >
                                      {uprofile.title}
                                    </span>
                                  </Link>
                                ) : null}
                              </a>
                              {
                                <UserProfilePopup
                                  title={torender}
                                  loggedIn={userProfile}
                                  uprofile={uprofile}
                                  isReady={readyPopupData}
                                />
                              }
                            </div>
                          </td>
                        ) : null}

                        {uprofile.title || uprofile.name != null ? (
                          <td>
                            {title === "Individuals" &&
                              uprofile.street_address === "" ? (
                              <p className="mt-3">No location</p>
                            ) : title === "Individuals" &&
                              uprofile.street_address !== "" ? (
                              <p className="mt-3">{uprofile.street_address}</p>
                            ) : (title === "Organizations" &&
                              uprofile.city === "") ||
                              uprofile.city === null ? (
                              <p className="mt-3">No location</p>
                            ) : title === "Organizations" &&
                              uprofile.city !== "" ? (
                              <p className="mt-3">{uprofile.city}</p>
                            ) : null}
                          </td>
                        ) : null}

                        {togglelist ? null : (
                          <>
                            <td>
                              {/* <p className="mt-2">
                              <i className="fe fe-alert-octagon large" />
                              <i className="fe fe-heart ml-1 large" />
                            </p> */}
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>{" "}
              </table>
              <div className="row">
                {pageReady && userProfiles.length <= 0 ? (
                  <div style={{ margin: "0 auto" }}>
                    <p id="no-products" className="no-products-found mt-3">
                      No such user on this platform.
                    </p>
                  </div>
                ) : !pageReady ? (
                  <div
                    className=""
                    style={{ margin: "auto", marginTop: "50px" }}
                  >
                    <PropagateLoader size={30} color="#1B98E0" loading />
                  </div>
                ) : null}
              </div>
            </div>
            <div
              className="row"
              style={{ margin: "10px", background: "#ffffff" }}
            >
              <Pagination
                forcePage={forcePage}
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
        </div>

        <ScrollToTop smooth color="#1b98e0" />
      </MainLayout>

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
