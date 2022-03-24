import React from "react";
// import styles from './cardStyles.module.css'
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";

function MyBlogCard({ blog, selectedBlogs }: any) {
  return (
    <div className="col-md-6">
      <div className="myjobscard card card-hover">
        <div className="d-flex justify-content-between">
          <div className="card-title job-card-title mt-3">
            <h5 className="ml-3 capitalize-text blogtopic">
              <strong>{blog.title}</strong>
            </h5>
          </div>
          <div className="d-flex">
            <div>
              <input
                className="mt-4 mr-3"
                type="checkbox"
                onChange={(e) => {
                  selectedBlogs(blog.key, e.target.checked);
                }}
              />
            </div>
            <div style={{ marginTop: "13.5px" }}>
              <Link href="/blog/edit/[blogid]" as={`/blog/edit/${blog.key}`}><i className="fe fe-edit-2"></i></Link>
            </div>
          </div>
        </div>
        <Link href="/blog/edit/[blogid]" as={`/blog/edit/${blog.key}`}>
          <div>
            <div className="row">
              <div>
                <h6 className="fe fe-map-pin ml-5">
                  <span className="ml-2 capitalize-text">
                    {blog.business_profile.city}
                  </span>
                </h6>
              </div>
              <div>
                <h6 className="fe fe-clock ml-5">
                  <span className="ml-2 capitalize-text">
                    {moment(blog.edited_at).fromNow()}
                  </span>
                </h6>
              </div>
            </div>

            <div className="row mt-4">
              <h5 className="ml-5">
                <strong>Description</strong>
              </h5>
            </div>
            <div className="row mb-1">
              <p className="ml-5 myblog-description">
                {ReactHtmlParser(blog.description)}
              </p>
            </div>

            <span
              className={` badge-button badge ${blog.approval_status == 0
                ? "bg-warning"
                : blog.approval_status == 1
                  ? "bg-success"
                  : "bg-danger"
                } blog_badge`}
            >
              {blog.approval_status == 0
                ? "Pending"
                : blog.approval_status == 1
                  ? "Approved"
                  : "Rejected"}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MyBlogCard;
