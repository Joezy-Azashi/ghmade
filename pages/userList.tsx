import React, { useContext } from "react";
import MainLayout from "../components/MainLayout";
import AdminSidebar from "../components/admin-sidebar";
import Prompt from "../components/Prompt";
import { Users } from "../lib/endpoints";
import { useEffect, useState } from "react";
import { Store } from "../contextStore";
import { useRouter } from "next/router";
import Pagination from "react-paginate";

export default function userList({ currentPage }) {
  const router = useRouter();
  const [userProfiles, setUserProfiles] = useState([]);
  const [tempprofile, setTempprofile] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const [order, setOrder] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [checkuser, setCheckuser] = useState(false);
  const [activate, setActivate] = useState(false);
  const [orglist, setOrglist] = useState([]);
  const [temporgprofile, setTemporgprofile] = useState([]);
  const [approverender, setApproverender] = useState<any>();
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [show, setShow] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [individualListPageNumber, setIndividualListPageNumber] = useState(0);
  const [businessListPageNumber, setBusinessListPageNumber] = useState(0);
  const [forcePage, setForcePage] = useState(0);

  const { state } = useContext(Store);
  const [list, setList] = useState("initial");
  const [title, setTitle] = useState("All Individual List");

  const getUserDetails = async (id) => {
    let rs = await new Users().getUserAccountDetails(id);
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

  const handleClose = () => {
    // if (doneUpdate) {
    //   router.push("/products/");
    // }
    setShow(false);
  };

  const individuals = (rs) => {
    try {
      return rs.filter((uprofile: any) => {
        return (
          uprofile.user.is_staff === false &&
          uprofile.user.is_organization === false &&
          uprofile.user.email !== state.userProfile.user.email
        );
      });
    } catch (e) { }
  };

  const organizations = (rs) => {
    return rs.filter((uprofile: any) => {
      return (
        uprofile.user.is_staff === false &&
        uprofile.user.is_organization === true &&
        uprofile.user.email !== state.userProfile.user.email
      );
    });
  };

  // const getActiveIndividuals = (rs)

  useEffect(() => {
    (async () => {
      const orgs = await new Users().getOrganizationProfilesForAdmin(
        currentPage
      )
      setTemporgprofile(orgs.results)
      settotalRecords(orgs.count);
      setPageReady(true);
    })();
  }, [currentPage]);

  useEffect(() => {
    (async () => {
      const rs = await new Users().getIndividualProfilesForAdmin(currentPage);
      
      setTempprofile(rs.results)
      const temp_active_inactive = individuals(rs.results)
      setTempList(temp_active_inactive)
      setUserProfiles(rs.results);
      settotalRecords(rs.count);
      setPageReady(true);
    })();
  }, [currentPage]);

  useEffect(() => {
    (async () => {
      let cp = 0
      let rs = null;
      if (list === "individuals") {
        cp = individualListPageNumber + 1;
        setForcePage(individualListPageNumber);
        rs = await new Users().getUnregisteredUsersProfile(cp);
      } else if (list === "organizations" || list === "organizational_requests") {
        cp = businessListPageNumber + 1;
        setForcePage(businessListPageNumber);
        rs = await new Users().getOrganizationProfilesForAdmin(cp);
      }
      if (rs && rs.error) return;
      if (rs && rs.results) {
        setPageReady(true);
        setUserProfiles(rs.results);
        settotalRecords(rs.count);
      }
    })()
  }, [list, currentPage])

  const paginate = (page: { selected: number }) => {
    if (pageReady) {
      if (list === "individuals") {
        setIndividualListPageNumber(page.selected);
      } else if (list === "organizations" || list === "organizational_requests") {
        setBusinessListPageNumber(page.selected);
      }
      router.push("/userList?page=" + (page.selected + 1));
    }
  };

  const searchLocation = (e: any) => {
    switch (list) {
      case "initial":
        const tsinit = tempList.filter((p) => {
          if (p.user.is_staff) return null;
          return (
            p.name
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase()) ||
            p.user.email
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase()) ||
            p.user.phone_number
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase()) ||
            p.street_address
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase())
          );
        });
        setUserProfiles(tsinit.slice(0, recordsPerPage));
        settotalRecords(tsinit.length);
        break;
      case "individuals":
        const ts = tempprofile.filter((p) => {
          if (p.user.is_staff) return null;
          return (
            p.name
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase()) ||
            p.user.email
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase()) ||
            p.user.phone_number
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase()) ||
            p.street_address
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase())
          );
        });

        setUserProfiles(ts.slice(0, recordsPerPage));
        settotalRecords(ts.length);
        break;
      case "organizations":
      case "organizationalrequests":
        const tsorg = temporgprofile.filter((p) => {
          return (
            (p.title !== null &&
              p.title
                .toLocaleLowerCase()
                .includes(e.target.value.toLocaleLowerCase())) ||
            (p.email &&
              p.user.email
                .toLocaleLowerCase()
                .includes(e.target.value.toLocaleLowerCase())) ||
            (p.user.phone_number &&
              p.user.phone_number
                .toLocaleLowerCase()
                .includes(e.target.value.toLocaleLowerCase())) ||
            (p.location &&
              p.location
                .toLocaleLowerCase()
                .includes(e.target.value.toLocaleLowerCase()))
          );
        });
        setUserProfiles(tsorg.slice(0, recordsPerPage));
        settotalRecords(tsorg.length);
        break;
      case "deactivated_organizations":
        const dtsorg = temporgprofile.filter((p) => {
          if (p.user.is_active) return null;
          return (
            (p.title !== null &&
              p.title
                .toLocaleLowerCase()
                .includes(e.target.value.toLocaleLowerCase())) ||
            (p.email &&
              p.user.email
                .toLocaleLowerCase()
                .includes(e.target.value.toLocaleLowerCase())) ||
            (p.user.phone_number &&
              p.user.phone_number
                .toLocaleLowerCase()
                .includes(e.target.value.toLocaleLowerCase())) ||
            (p.location &&
              p.location
                .toLocaleLowerCase()
                .includes(e.target.value.toLocaleLowerCase()))
          );
        });
        setUserProfiles(dtsorg.slice(0, recordsPerPage));
        settotalRecords(dtsorg.length);
        break;
      case "deactivated_users":
        const dts = tempprofile.filter((p) => {
          if (p.user.is_active) return null;
          return (
            p.name
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase()) ||
            p.user.email
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase()) ||
            p.user.phone_number
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase()) ||
            p.street_address
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase())
          );
        });
        setUserProfiles(dts.slice(0, recordsPerPage));
        settotalRecords(dts.length);
        break;
    }
  };

  const sortByName = () => {
    if (order === true) {
      setOrder(false);
    } else if (order === false) {
      setOrder(true);
    }
    const sorted = [...userProfiles];
    setUserProfiles([...sorted].reverse());
  };

  const approve = async (id) => {
    let rs = await new Users().activateDeactivate({
      pk: id,
      active: true,
    });
  };

  const disapprove = async (id) => {
    let rs = await new Users().activateDeactivate({
      pk: id,
      active: false,
    });
  };

  const activateDeactivate = async () => {
    let active: any;
    if (list === "individuals" || list === "organizations") {
      active = false;
    } else if (
      list === "deactivated_users" ||
      list === "deactivated_organizations"
    ) {
      active = true;
    }
    for (let i = 0; i < checkedUsers.length; i++) {
      let rs = await new Users().activateDeactivate({
        pk: checkedUsers[i],
        active,
      });
    }
    handleList(list);
    callPrompt("Done", "", "close", "Action performed successfully");
  };

  const handleList = (str) => {
    setList(str);
    setCheckuser(false);
    //setCurrentPage(1);
    let temp: any;
    switch (str) {
      case "individuals":
        temp = individuals(tempprofile).filter((uprofile: any) => {
          return uprofile.user.is_active === true;
        });
        setTitle("Individual List");

        setUserProfiles(temp.slice(0, recordsPerPage));
        settotalRecords(temp.length);
        break;
      case "organizations":
        temp = organizations(temporgprofile).filter((uprofile: any) => {
          return uprofile.user.is_active === true;
        });
        setTitle("Organization List");
        setUserProfiles(temp.slice(0, recordsPerPage));
        settotalRecords(temp.length);
        break;
      case "deactivated_users":
        temp = individuals(tempprofile).filter((uprofile: any) => {
          return uprofile.user.is_active === false;
        });
        setTitle("Deactivated Users ");
        setUserProfiles(temp.slice(0, recordsPerPage));
        settotalRecords(temp.length);
        break;
      case "organizationalrequests":
        temp = organizations(temporgprofile).filter((uprofile: any) => {
          return uprofile.user.is_active === true;
        });
        setTitle("Organizational Requests");
        setUserProfiles(temp.slice(0, recordsPerPage));
        settotalRecords(temp.length);
        break;
      case "deactivated_organizations":
        temp = organizations(temporgprofile).filter((uprofile: any) => {
          return uprofile.user.is_active === false;
        });
        setTitle("Deactivated Organizations");
        setUserProfiles(temp.slice(0, recordsPerPage));
        settotalRecords(temp.length);
        break;
      default:
        return;
    }
  };

  return (
    <MainLayout>
      <AdminSidebar handleList={handleList} />
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
      <div id="main">
        <div className="page-header">
          <h1 className="page-title page-title-userlist" id="page-title">
            User List
          </h1>

          <div className="mt-0 row">
            <div className="inner-addon right-addon mr-2">
              <i className="fe fe-search fa-lg" />
              <input
                id="searchmember"
                className="form-control form-rounded searchbox-width"
                type="text"
                placeholder="Search..."
                onChange={searchLocation}
              />
            </div>
            <div>
              <button className="btn btn-primary add-user-btn">
                <i className="fe fe-plus " /> Add User
              </button>
            </div>
          </div>
        </div>

        {/* End page-header */}
        <div className=" tabledt">
          <div className="row tableheading">
            <h5 className="table-title" id="toggle-title">
              {title}
            </h5>
            <div className="ml-auto">
              <div className="dropdown">
                <a
                  className="nav-link pr-0 d-flex"
                  onClick={activateDeactivate}
                >
                  <div className="mt-3 mb-3 mr-5 table-title">
                    <span
                      style={{
                        color: "#3f3d56",
                        fontSize: "13px",
                        marginRight: "20px",
                      }}
                    >
                      {list === "individuals" || list === "organizations" ? (
                        <>
                          <button className="btn btn-primary activate-btn">
                            Deactivate
                          </button>
                        </>
                      ) : list === "deactivated_users" ||
                        list === "deactivated_organizations" ? (
                            <>
                              <button className="btn btn-primary activate-btn">
                                Activate
                          </button>
                            </>
                          ) : null}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="responsivetable">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="text-muted">
                    {/* <div className="form-check"><input type="checkbox"/></div> */}
                  </th>

                  <th scope="col" className="text-muted ml-5">
                    {/* <input type="checkbox" className=" mr-2 ml-3"></input> */}
                    <div className="dropdown" style={{ marginLeft: "-10px" }}>
                      <span id="toggle-sort">
                        <span>Name </span>
                        <i
                          className={`fa fa-sort-amount-${order ? "asc" : "desc"
                            }`}
                          onClick={() => showsort()}
                        ></i>
                      </span>
                      <div className="dropdown-content">
                        <div>
                          <div className="mt-3">
                            <span>Sort by</span>
                          </div>
                          <div className="mt-3 tbtheadcolor">
                            <span
                              onClick={sortByName}
                              id="sort-by-name"
                              className="sortdropdown"
                            >
                              Name (A-Z)
                            </span>
                          </div>
                          <div className="mt-3 mb-2 tbtheadcolor">
                            <span
                              id="sort-by-location"
                              className="sortdropdown"
                            >
                              Location
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>

                  {list !== "organizationalrequests" ? (
                    <>
                      <th scope="col" className="text-muted">
                        Email
                      </th>
                    </>
                  ) : null}

                  <th scope="col" className="text-muted">
                    Telephone
                  </th>
                  <th scope="col" className="text-muted">
                    Town
                  </th>

                  {list === "organizationalrequests" ? (
                    <>
                      <th
                        scope="col"
                        style={{ textAlign: "center" }}
                        className="text-muted"
                      >
                        Requests
                      </th>
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {userProfiles.map((uprofile: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td scope="col" className="text-muted">
                        <div
                          className="form-check"
                          style={{ marginBottom: "20px" }}
                        >
                          {list !== "initial" ? (
                            <input
                              type="checkbox"
                              // name="check_user"
                              className="form-check-input"
                              checked={
                                list.includes("deactivated")
                                  ? uprofile.user.is_active
                                  : !uprofile.user.is_active
                              }
                              onChange={(e) => {
                                if (
                                  list === "individuals" ||
                                  list === "deactivated_users"
                                ) {
                                  const temp = tempprofile.map((tmp, i) => {
                                    if (tmp.user.id === uprofile.user.id) {
                                      tmp.user.is_active = !uprofile.user
                                        .is_active;
                                    }
                                    return tmp;
                                  });
                                  setTempprofile(temp);
                                } else {
                                  const temp_org = temporgprofile.map(
                                    (tmp, i) => {
                                      if (tmp.user.id === uprofile.user.id) {
                                        tmp.user.is_active = !uprofile.user
                                          .is_active;
                                      }
                                      return tmp;
                                    }
                                  );
                                  setTemporgprofile(temp_org);
                                }
                                setCheckedUsers([
                                  ...checkedUsers,
                                  uprofile.user.id,
                                ]);
                              }}
                            />
                          ) : null}
                        </div>
                      </td>
                      <td style={{ whiteSpace: "normal" }}>
                        <div className="dropdown ddmargin d-flex pr-6">
                          {/* <span
                          className="avatar avatar-md brround cover-image"
                          data-image-src="/images/blank_avatar.jpeg"
                        ></span> */}

                          <img
                            src={
                              uprofile.image
                                ? uprofile.image
                                : "/assets/images/Profile_Icon.png"
                            }
                            className="brround ddimg ml-6"
                            alt=""
                          />
                          <a
                            style={{ padding: "0px" }}
                            className="nav-link"
                          // data-toggle="dropdown"
                          // onClick={() => getUserDetails(uprofile.id)}
                          >
                            <span
                              className="ml-5 column-color"
                              id="memberid"
                              style={{ marginLeft: 23 }}
                            >
                              {uprofile.name && uprofile.name !== null
                                ? uprofile.name
                                : uprofile.title && uprofile.title !== ""
                                  ? uprofile.title
                                  : "No name"}
                            </span>
                          </a>
                        </div>{" "}
                      </td>

                      {list !== "organizationalrequests" ? (
                        <>
                          <td className="">
                            <p className="mt-2">{uprofile.user.email}</p>
                          </td>
                        </>
                      ) : null}

                      <td className="">
                        <p className="mt-2">
                          {uprofile.phone_number && uprofile.phone_number !== ""
                            ? uprofile.phone_number
                            : uprofile.user.phone_number &&
                              uprofile.user.phone_number !== ""
                              ? uprofile.user.phone_number
                              : "No phone number"}
                        </p>
                      </td>
                      <td className="" style={{ whiteSpace: "normal" }}>
                        <p className="mt-2">
                          {uprofile.street_address &&
                            uprofile.street_address !== ""
                            ? uprofile.street_address
                            : uprofile.city && uprofile.city !== ""
                              ? uprofile.city
                              : "No town specified"}
                        </p>
                      </td>

                      {list === "organizationalrequests" ? (
                        <>
                          <td>
                            <>
                              {" "}
                              <button
                                style={{
                                  backgroundColor: "#18D05C",
                                  color: "white",
                                }}
                                disabled={uprofile.user.is_active}
                                className="btn mr-2 requestbtn"
                                onClick={() => {
                                  approve(uprofile.user.id);
                                  const temp = temporgprofile.map((tmp, i) => {
                                    if (tmp.user.id === uprofile.user.id) {
                                      tmp.user.is_active = !uprofile.user
                                        .is_active;
                                    }
                                    return tmp;
                                  });
                                  setTemporgprofile(temp);
                                }}
                              >
                                <i className="mobilesymbol fe fe-check"></i>
                                <span className="button-text">Approve</span>
                              </button>
                              <button
                                style={{
                                  backgroundColor: "#FF0000",
                                  color: "white",
                                }}
                                disabled={!uprofile.user.is_active}
                                className="btn mr-2 requestbtn"
                                onClick={() => {
                                  disapprove(uprofile.user.id);
                                  const temp = temporgprofile.map((tmp, i) => {
                                    if (tmp.user.id === uprofile.user.id) {
                                      tmp.user.is_active = !uprofile.user
                                        .is_active;
                                    }
                                    return tmp;
                                  });
                                  setTemporgprofile(temp);
                                }}
                              >
                                <i className="mobilesymbol fe fe-x"></i>
                                <span className="button-text">Disapprove</span>
                              </button>{" "}
                            </>
                          </td>
                        </>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>{" "}
            </table>
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
              containerClassName="pagination ml-auto row justify-content-end d-flex"
              previousLabel="<<Prev"
              nextLabel="Next>>"
              activeLinkClassName="active"
              disabledClassName="pagination_next_prev_dissable"
            />
          </div>
        </div>

        <div
          className="row"
          style={{ margin: "10px", background: "#ffffff" }}
        ></div>
      </div>
    </MainLayout>
  );
}

function showsort() {
  var toggle = document.getElementById("sortlist");
  toggle.style.display = toggle.style.display == "block" ? "none" : "block";
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const currentPage = page.toString();
  return {
    props: {
      currentPage,
    },
  };
}