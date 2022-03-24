import Link from "../components/Link";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Store } from "../contextStore";
import CartSignin from "../components/CartSignin";

const navFontSize = {
  fontSize: "18px",
};
const NavbarLogin = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrganization, setIsOrganization] = useState(false);
  const [tempholder, setTempHolder] = useState(false);
  const [userimage, setUserImage] = useState("");
  const [isstaff, setIsstaff] = useState();
  const [username, setUsername] = useState("");

  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const logout = () => {
    window.localStorage.removeItem("cart");
    window.localStorage.removeItem("cp-a");
    window.localStorage.removeItem("user-profile");
    window.localStorage.removeItem("cart_id");
    dispatch({
      type: "UPDATE_CART",
      payload: [],
    });
    setIsLoggedIn(false);
    window.location.href = "/market"
  };

  useEffect(() => {
    let lStorage: any = window.localStorage.getItem("cp-a");
    lStorage = JSON.parse(lStorage);
    if (lStorage) {
      let userprofile: any = JSON.parse(
        window.localStorage.getItem("user-profile")
      );

      dispatch({
        type: "SET_USERINFO",
        payload: userprofile,
      });
      setUserImage(state.userProfile.image || "/assets/images/Profile_Icon.png");
      state.userProfile.name || state.userProfile.title
        ? setUsername(state.userProfile.name || state.userProfile.title)
        : setUsername("No Name");
      setIsLoggedIn(true);
      setIsOrganization(lStorage.user.is_organization);
      setIsstaff(lStorage.user.is_staff);
    } else {
      setIsLoggedIn(false);
    }

    if (
      router.pathname.includes("/login") ||
      router.pathname.includes("/signup") ||
      router.pathname.includes("/confirmaccount") ||
      router.pathname.includes("/forgottenpassword") ||
      router.pathname.includes("/resetpassword")
    ) {
      setTempHolder(false);
    } else {
      setTempHolder(true);
    }
  }, []);

  return (
    <>
      {/* Modal Mobile View */}
      <a
        className="mt-2 mb-2 mobilemenubtnlog"
        data-toggle="modal"
        data-target="#showmenu"
      
      >
        <i
          className="fe fe-menu ml-2"
          style={{ fontSize: "30px" }}
        />
      </a>

      <div
      style={{zIndex:5000}}
        className="modal"
        id="showmenu"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div className="modal-content" style={{ height: "100% !important" }}>
          <div
            className="card"
            style={{
              display: "block",
              width: "265px",
              position: "fixed",
              top: "0px",
              left: "0px",
              height: "100%",
              zIndex: 500000,
              borderRadius: 0,
            }}
          >
            <Link href="/">
            <div className="row mt-5 mb-3">
            <a className="header-brand ml-5 mb-4">
            <img
                  src="/assets/images/final_ghmade.png"
                  className="header-brand-img moblogin-logo"
                  alt="logo"
                  style={{
                    // marginLeft: "-1em",
                    marginBottom: "30px",
                    // marginTop: "30px",
                  }}
                />
              </a>
            </div>
            </Link>
            <div className="ml-3">
              {isOrganization ? (
                <>
                  <a className="nav-link" data-toggle="dropdown">
                    <span className="lay-outstyle" style={{ color: "black" }}>
                      Market{" "}
                    </span>
                    <i className="fe fe-chevron-down ml-1"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-left dropdown-menu-arrow">
                      <a href="/products/add" className="dropdown-item" onClick={() => router.push("/products/add")}>
                        Add products/services
                      </a>

                      <a href="/products/viewmyproducts" className="dropdown-item" onClick={() => router.push("/products/viewmyproducts")}>
                        My products/services
                      </a>
                    
                      <a href="/products/downloadorder" className="dropdown-item" onClick={() => router.push("/products/downloadorder")}>
                        Orders
                      </a>
                   
                      <a href="/market" className="dropdown-item" onClick={() => router.push("/market")}>
                        Marketplace
                      </a>
                    
                  </div>
                </>
              ) : (
                // <Link href="/market">
                  <a href="/market" className="nav-link" onClick={() => router.push("/market")}>
                    <span className="lay-outstyle">Market</span>
                  </a>
              //  </Link>
              )}
            
            
              {isOrganization ? (
              <>
                 <div className="dropdown header-profile">
                <a className="nav-link" data-toggle="dropdown">
                    <span className="lay-outstyle" style={{ color: "black" }}>
                      Jobs{" "}
                    </span>
                    <i className="fe fe-chevron-down ml-1"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-left dropdown-menu-arrow">
                    
                      <a href="/jobs/add_jobpost" className="dropdown-item" onClick={() => router.push("/jobs/add_jobpost")}>
                        Add Job
                      </a>
                    
                      <a href="/jobs/businessjobs" className="dropdown-item" onClick={() => router.push("/jobs/businessjobs")}>
                        My Jobs
                      </a>
                    
                      <a href="/jobs/viewapplicants" className="dropdown-item" onClick={() => router.push("/jobs/viewapplicants")}>
                        View Applicants
                      </a>

                      <a href="/jobs/viewjobsandapply" className="dropdown-item" onClick={() => router.push("/jobs/viewjobsandapply")}>
                        Job Portal
                      </a>
                    
                  </div>
              </div>
              </>
              ) :( //<Link href="/jobs/viewjobsandapply">
                  <a href="/jobs/viewjobsandapply" className="nav-link" onClick={() => router.push("/jobs/viewjobsandapply")}>
                    <span className="lay-outstyle">Jobs</span>
                  </a>
                // </Link> 
              )}

              
              <br/>

            {isOrganization ? ( 
                <>
                  <div className="dropdown header-profile ">
                      <a className="nav-link" data-toggle="dropdown">
                          <span className="lay-outstyle" style={{color: "black"}}>
                            Partnership
                          </span>
                          <i className="fe fe-chevron-down ml-1"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-left dropdown-menu-arrow">
                          
                            <a href="/partnership/add" className="dropdown-item" onClick={() => router.push("/partnership/add")}>
                              Add Request
                            </a>
                          
                            <a href="/partnership/mypartnerships" className="dropdown-item" onClick={() => router.push("/partnership/mypartnerships")}>
                              View my Request
                            </a>
                          
                            <a href="/partnership/partnerships" className="dropdown-item" onClick={() => router.push("/partnership/partnerships")}>
                              Partnership Portal
                            </a>
                          
                      </div>
                  </div>
                </>
                ) :(
                  
                    <a href="/partnership/partnerships" className="nav-link" onClick={() => router.push("/partnership/partnerships")}>
                      <span className="lay-outstyle">Partnerships</span>
                    </a>
                  
        )}
             
                <a href="/forum/forum" className="nav-link" onClick={() => router.push("/forum/forum")}>
                  <span className="lay-outstyle">Forum</span>
                </a>

              {isOrganization ? ( 
                <>
                  <div className="dropdown header-profile ">
                      <a className="nav-link" data-toggle="dropdown">
                          <span className="lay-outstyle" style={{color: "black"}}>
                            Blog
                          </span>
                          <i className="fe fe-chevron-down ml-1"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-left dropdown-menu-arrow">
                          
                            <a href="/blog/add_blogpost" className="dropdown-item" onClick={() => router.push("/blog/add_blogpost")}>
                              Add Post
                            </a>
                          
                          
                            <a href="/blog/viewmyblogpost" className="dropdown-item" onClick={() => router.push("/blog/viewmyblogpost")}>
                              View my Post
                            </a>
                          
                            <a href="/blog/blog" className="dropdown-item" onClick={() => router.push("/blog/blog")}>
                              Blog Page
                            </a>
                      </div>
                  </div>
                </>
                ) :(
                  
                    <a href="/blog/blog" className="nav-link" onClick={() => router.push("/partnership/partnerships")}>
                      <span className="lay-outstyle">Partnerships</span>
                    </a>
        )}

                <a href="/memberlist" className="nav-link" onClick={() => router.push("/memberlist")}>
                  <span className="lay-outstyle">Members</span>
                </a>
            </div>

            <a
            
              className="fe fe-x-square mobile-close-icon"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span></span>
            </a>
          </div>
        </div>
      </div>
      {/* Modal Mobile View ends here*/}

      {/*Desktop View */}
      <div
        className="d-none dview d-md-flex header-settings"
        style={{ margin: "0 auto", textAlign: "center" }}
      >
        
        {isOrganization ? (
          <>
            <a className="nav-link" data-toggle="dropdown" style={{marginTop: "2px"}}>
              <span className="lay-outstyle" >Market</span>
              <i className="fe fe-chevron-down ml-1"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-left dropdown-menu-arrow">
              <Link href="/products/add">
                <a className="dropdown-item">Add products/services</a>
              </Link>
              <Link href="/products/viewmyproducts">
                <a className="dropdown-item">
                  My products/services
                </a>
              </Link>
              <Link href="/products/downloadorder">
                <a className="dropdown-item">
                  Orders
                </a>
              </Link>
              <Link href="/market">
                <a className="dropdown-item">
                  Marketplace
                </a>
              </Link>
            </div>
          </>
        ) : (
          <Link href="/market">
            <a className="nav-link">
              <span className="lay-outstyle">Market</span>
            </a>
          </Link>
        )}

          {isOrganization ? ( 
              <>
              <div className="dropdown header-profile mt-3">
                <a className="nav-link" data-toggle="dropdown" style={{color: "#00000"}}>
                    <span className="lay-outstyle">
                      Jobs{" "}
                    </span>
                    <i className="fe fe-chevron-down ml-1"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-left dropdown-menu-arrow">
                    <Link href="/jobs/add_jobpost">
                      <a className="dropdown-item">
                        Add Job
                      </a>
                    </Link>
                    <Link href="/jobs/businessjobs">
                      <a className="dropdown-item">
                        My Jobs
                      </a>
                    </Link>
                    <Link href="/jobs/viewapplicants">
                      <a className="dropdown-item">
                        View Applicants
                      </a>
                    </Link>
                    <Link href="/jobs/viewjobsandapply">
                      <a className="dropdown-item">
                        Job Portal
                      </a>
                    </Link>
                  </div>
              </div>
        
        </>
        ) :(
        <Link href="/jobs/viewjobsandapply">
        <a className="nav-link">
          <span className="lay-outstyle">Jobs</span>
        </a>
      </Link>
       )}

        {isOrganization ? ( 
                <>
                    <div className="dropdown header-profile mt-3">
                        <a className="nav-link" data-toggle="dropdown" style={{color: "#00000"}}>
                            <span className="lay-outstyle">
                              Partnership
                            </span>
                            <i className="fe fe-chevron-down ml-1"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-left dropdown-menu-arrow">
                            <Link href="/partnership/add">
                              <a className="dropdown-item">
                                Add Request
                              </a>
                            </Link>
                            <Link href="/partnership/mypartnerships">
                              <a className="dropdown-item">
                                View my Request
                              </a>
                            </Link>
                            <Link href="/partnership/partnerships">
                              <a className="dropdown-item">
                                Partnership Portal
                              </a>
                            </Link>
                        </div>
                    </div>
                </>
                ) :(
                <Link href="/partnership/partnerships">
                <a className="nav-link">
                  <span className="lay-outstyle">Partnerships</span>
                </a>
              </Link>
        )}

        <Link href="/forum/forum">
          <a className="nav-link">
            <span className="lay-outstyle">Forum</span>
          </a>
        </Link>


        {isOrganization ? ( 
                <>
                    <div className="dropdown header-profile mt-3">
                        <a className="nav-link" data-toggle="dropdown" style={{color: "#00000"}}>
                            <span className="lay-outstyle">
                              Blog
                            </span>
                            <i className="fe fe-chevron-down ml-1"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-left dropdown-menu-arrow">
                            <Link href="/blog/add_blogpost">
                              <a className="dropdown-item">
                                Add post
                              </a>
                            </Link>
                            <Link href="/blog/viewmyblogpost">
                              <a className="dropdown-item">
                                View my Post
                              </a>
                            </Link>
                            <Link href="/blog/blog">
                              <a className="dropdown-item">
                                Blog Page
                              </a>
                            </Link>
                        </div>
                    </div>
                </>
                ) :(
                <Link href="/blog/blog">
                <a className="nav-link">
                  <span className="lay-outstyle">Blog</span>
                </a>
              </Link>
        )}


        <Link href="/memberlist">
          <a className="nav-link">
            <span className="lay-outstyle">Members</span>
          </a>
        </Link>
      </div>
      <div className="d-flex header-right mr-5">
      {
           router.pathname.includes("/market") &&
        <CartSignin />
      }
      {
           router.pathname.includes("/shops") &&
        <CartSignin />
      }

      </div>
      <div className="dropdown header-profile1">
        <a
          className="nav-link pr-0 leading-none d-flex pt-3"
          data-toggle="dropdown"
        >
          <span
            className="avatar avatar-md brround cover-image"
            style={{ background: `url(${userimage}) center center` }}
          />
          <span
            className="username-ellipsis ml-3"
            style={{fontWeight: 700 }}
          >
            {username}
          </span>
          <i className="fe fe-chevron-down" />
        </a>
        <div className="dropdown-menu dropdown-menu-right profiledrop dropdown-menu-arrow">
          {isstaff ? (
            <>
              <Link href="/users/individualUsers">
                <a className="dropdown-item itemname">
                  <i className="dropdown-icon fe fe-grid" />
                  Dashboard
                </a>
              </Link>
            </>
          ) : (
            <></>
          )}
       
        <Link href={isOrganization ? "/businessprofile" : "/profile"}>
            <a className="dropdown-item itemname">
              <i className="dropdown-icon fe fe-user" />
              View Profile
            </a>
          </Link>
          {/* {isOrganization ?
          <Link href="/shops/[shops]"
          as={`/shops/${owner.id}`}
          >
            <a className="dropdown-item itemname">
              <i className="dropdown-icon fe fe-briefcase" />
              Business Page
            </a>
          </Link> : ""
          } */}
          <Link href="/auth/account-settings">
            <a className="dropdown-item itemname">
              <i className="dropdown-icon fe fe-edit" />
              Account Settings
            </a>
          </Link>
          <Link href="">
          <a className="dropdown-item itemname" onClick={logout}>
            <i className="dropdown-icon fe fe-power" /> Log Out
          </a>
          </Link>
          <div className="dropdown-menu dropdown-menu-right profiledrop dropdown-menu-arrow">
            <Link href={isOrganization ? "/businessprofile" : "/profile"}>
              <a className="dropdown-item itemname">
                <i className="dropdown-icon fe fe-user" />
                View Profile
              </a>
            </Link>
            <a className="dropdown-item itemname">
              <i className="dropdown-icon fe fe-edit" />
              Account Settings
            </a>
            <a className="dropdown-item itemname" onClick={logout}>
              <i className="dropdown-icon fe fe-power" /> Log Out
            </a>
          </div>
        </div>
      </div>

      {/* Desktop View ends here */}
    </>
  );
};

export default NavbarLogin;


