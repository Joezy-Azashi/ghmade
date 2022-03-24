import Link from "../components/Link";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import CartLogout from "../components/CartLogout";

const NavbarTemp = (props) => {
  const router = useRouter();

  return (
    <>
      {/* Modal Mobile View */}
      <a
        className="mt-2 mb-2 mobilemenubtn"
        data-toggle="modal"
        data-target="#showmenu"
        href="#"
      >
        <i className="fe fe-menu ml-2" style={{ fontSize: "30px" }} />
      </a>

      <div
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
              zIndex: 5,
              borderRadius: 0,
            }}
          >
            <Link href="/">
              <a className="header-brand ">
                <img
                  src="/assets/images/final_ghmade.png"
                  className="header-brand-img moblogin-logo"
                  alt="logo"
                  style={{
                    marginLeft: "1.0em",
                    marginRight: "0rem",
                    marginBottom: "30px",
                    marginTop: "25px",
                  }}
                />
              </a>
            </Link>

            <i
              className="fe fe-x-square fa-lg fa-2x ml-3 mt-5"
              data-dismiss="modal"
              aria-label="Close"
            />

            <div className="ml-3" data-dismiss="modal">
              <Link href="/market">
                <a className="nav-link" onClick={() => router.push("/market")}>
                  <span className="lay-outstyle">Market</span>
                </a>
              </Link>
              <Link href="/jobs/viewjobsandapply">
                <a className="nav-link" onClick={() => router.push("/jobs/viewjobsandapply")}>
                  <span className="lay-outstyle">Jobs</span>
                </a>
              </Link>
              <Link href="/forum/forum">
                <a className="nav-link" onClick={() => router.push("/forum/forum")}>
                  <span className="lay-outstyle">Forum</span>
                </a>
              </Link>
              <Link href="/blog/blog">
                <a className="nav-link" onClick={() => router.push("/blog/blog")}>
                  <span className="lay-outstyle">Blog</span>
                </a>
              </Link>
              <Link href="/memberlist">
                <a className="nav-link" onClick={() => router.push("/memberlist")}>
                  <span className="lay-outstyle">Members</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Mobile View ends here*/}

      {/*Desktop View */}
      <div
        className="d-none dview d-md-flex header-settings"
        style={{ margin: "0 auto", textAlign: "center" }}
      >
        <Link href="/market">
          <a className="nav-link">
            <span className="lay-outstyle">Market</span>
          </a>
        </Link>
        <Link href="/jobs/viewjobsandapply">
          <a className="nav-link">
            <span className="lay-outstyle">Jobs</span>
          </a>
        </Link>
        <Link href="/forum/forum">
          <a className="nav-link">
            <span className="lay-outstyle">Forum</span>
          </a>
        </Link>
        <Link href="/blog/blog">
          <a className="nav-link">
            <span className="lay-outstyle">Blog</span>
          </a>
        </Link>
        <Link href="/memberlist">
          <a className="nav-link">
            <span className="lay-outstyle">Members</span>
          </a>
        </Link>
      </div>
      <div className="d-flex header-right">
        {router.pathname.includes("/market") && <CartLogout />}
        {router.pathname.includes("/shops") && <CartLogout />}
        <Link href="/auth/login">
          <a className="nav-link" id="landingpage_login_btn">
            <span className="lay-outstyle">Login</span>
          </a>
        </Link>
        <Link href="/auth/signup">
          <a className="nav-link">
            <span
              className="lay-outstyle badge badge-pill badge-info mr-1 mb-1 mt-1 signupbtn"
              style={{
                padding: "13px",
                borderRadius: "7px",
                // backgroundColor: "#3964FC",
                fontSize: "13px",
              }}
            >
              Sign Up
            </span>
          </a>
        </Link>
      </div>
      {/* Desktop View ends here */}
    </>
  );
};

export default NavbarTemp;
