import React from "react";
import Link from "next/link";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Blog } from "../../lib/endpoints/blog";

export default function BlogListingCard({ blog }: any) {
  const [blogData, setBlogData] = useState<any>({});
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    (async () => {
      const blogid = window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      );
      const res = await new Blog().getBlogDetails(blogid);
      if (res) {
        setBlogData(res);
        setPageReady(true);
      } else {
        console.error();
      }
    })();
  }, []);

  return (
    <Link href="/blog/details/[key]" as={`/blog/details/${blog.key}`}>
      <div className="col-md-6">
        <div
          className="myjobscard card card-hover"
          style={{ paddingLeft: "0", overflow: "hidden" }}
        >
          <div className="row" style={{ height: "100%" }}>
            <Image
              className="col-md-6 blogpostimg"
              src={blog.media ? blog.media : "/assets/images/dum_blog.jpg"}
              rounded
            />
            <div className="col-md-6">
              <div>
                <div className="mt-4">
                  <h5 className="ml-3 capitalize-text card-title">
                    <strong>{blog.title}</strong>
                  </h5>
                </div>
              </div>
              <div className="row mt-2">
                <div>
                  <h6 className="fe fe-clock ml-5">
                    <span className="ml-2 capitalize-text">
                      {moment(blog.edited_at).fromNow()}
                    </span>
                  </h6>
                </div>
              </div>

              <div className="row mt-2">
                <h5 className="ml-5">
                  <strong>Description</strong>
                </h5>
              </div>

              <div className="row">
                <p className="ml-5 blog-description">
                  {ReactHtmlParser(blog.description)}
                </p>
              </div>
              <div className="row mt-1">
                <div className="d-flex mt-1">
                  <span>
                    <img
                      className="business-image ml-6"
                      src={
                        blog.business_profile != null
                          ? blog.business_profile.image
                          : "/assets/images/Profile_Icon.png"
                      }
                      alt=""
                    />
                  </span>

                  <span>
                    <h5 className="ml-2 mt-3 ">
                      <strong>
                        {blog.business_profile != null
                          ? blog.business_profile.title
                          : "Admin"}
                      </strong>
                    </h5>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Link>
  );
}
