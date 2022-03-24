import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Favicon from "react-favicon";

export function protectedRoutes(pathname: string) {
  if (
    pathname.includes("/businessprofile") ||
    pathname.includes("/editbusinessprofile") ||
    pathname.includes("/profile") ||
    pathname.includes("/editprofile") ||
    pathname.includes("/auth/account-settings") ||
    pathname.includes("/products/add") ||
    pathname.includes("/products/viewmyproducts") ||
    pathname.includes("/products/downloadorder") ||
    pathname.includes("/userList")
  ) {
    return true;
  }
  return false;
}

const MainLayout = ({
  children,
  title = "ghmade",
  pageTitle = "",
}) => {
  const [pageReady, setPageReady] = useState<number>(-1);

  const router = useRouter();
  useEffect(() => {
    if (protectedRoutes(router.pathname)) {
      let lStorage: any = window.localStorage.getItem("cp-a");
      lStorage = JSON.parse(lStorage);
      if (!lStorage) {
        // router.push("/market");
        window.location.href = "/market";
      } else {
        setPageReady(1);
      }
    } else {
      if (router.pathname == "/") {
        router.push("/market");
      }
      setPageReady(1);
    }
  }, []);

  return (
    <>
    <div>
      <Favicon url="/assets/images/favicon.ico" />
    </div>
      <Header title={title} />
      <div className="page">
        <div className="page-main">
          <Navbar />
          {pageReady == -1 ? null : (
            <div className="container content-area">{children}</div>
          )}
        </div>
      </div>
      {/*<Footer /> */}
    </>
  );
};

export default MainLayout;
