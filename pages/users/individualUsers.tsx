import React, { useContext } from "react";
import MainLayout from "../../components/MainLayout";
import AdminSidebar from "../../components/admin-sidebar";
import Prompt from "../../components/Prompt";
import { Users } from "../../lib/endpoints";
import { useEffect, useState } from "react";
import { Store } from "../../contextStore";
import { useRouter } from "next/router";
import Pagination from "react-paginate";
import { PropagateLoader } from "react-spinners";

function individualUsers({currentPage}){

    const router = useRouter();
  const [userProfiles, setUserProfiles] = useState([]);
  const [tempprofile, setTempprofile] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const [order, setOrder] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [checkuser, setCheckuser] = useState(false);
  const [temporgprofile, setTemporgprofile] = useState([]);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [show, setShow] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const { state } = useContext(Store);
  const [list, setList] = useState("initial");
  const [title, setTitle] = useState("All Individual List");

useEffect(() => {
    (async () => {
      const rs = await new Users().getIndividualProfiles(currentPage);
      console.log("rs", rs)
      setTempprofile(rs.results)
      const temp_active_inactive = individuals(rs.results)
      setTempList(temp_active_inactive)
      setUserProfiles(rs.results);
      settotalRecords(rs.count);
      setPageReady(true);
    })();
  }, [currentPage]);

  const paginate = (page: { selected: number }) => {
    if (pageReady) {
      router.push("/users/individualUsers?page=" + (page.selected + 1));
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

  const activateDeactivate = async () => {
    let active: any;
    if (list === "individuals") {
      active = false;
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
      default:
        return;
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
    }
  };

    return(
            <MainLayout>
                <AdminSidebar handleList={() => { }} />
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
                            {/* <div>
                            <button className="btn btn-primary add-user-btn">
                                <i className="fe fe-plus " /> Add User
                            </button>
                            </div> */}
                        </div>
                    </div>

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
                          <button className="btn btn-primary activate-btn">
                            Deactivate
                          </button>
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
                        <th scope="col" className="text-muted">
                            Email
                        </th>

                        <th scope="col" className="text-muted">
                            Telephone
                        </th>
                        <th scope="col" className="text-muted">
                            Town
                        </th>
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
                                        list === "individuals"
                                        const temp = tempprofile.map((tmp, i) => {
                                            if (tmp.user.id === uprofile.user.id) {
                                            tmp.user.is_active = !uprofile.user
                                                .is_active;
                                            }
                                            return tmp;
                                        });
                                        setTempprofile(temp);
                                        setCheckedUsers([
                                        ...checkedUsers,
                                        uprofile.user.id,
                                        ]);
                                    }
                                }
                                    />
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
                                >
                                    <span
                                    className="ml-5 column-color"
                                    id="memberid"
                                    style={{ marginLeft: 23 }}
                                    >
                                    {uprofile.name
                                        ? uprofile.name
                                        : "No name"}
                                    </span>
                                </a>
                                </div>{" "}
                            </td>

                            <td className="">
                                <p className="mt-2">{uprofile.user.email ?
                                uprofile.user.email : "Not provided"}</p>
                            </td>

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
                        <div className="" style={{ margin: "40px auto" }}>
                          <PropagateLoader size={30} color="#1B98E0" loading />
                        </div>
                      ) : null}
                    </div>
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
                </div>
                </div>
                </div>
            </MainLayout>
    )
}

export default individualUsers;

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