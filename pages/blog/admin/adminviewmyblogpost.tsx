/* import AuthHeader from "../../components/auth/AuthHeader"; */
import MainLayout from "../../../components/MainLayout";
import React, { useEffect, useState } from "react";
import AdminBlogPosts from "../../../components/blog/AdminBlogPosts";
import { Blog } from "../../../lib/endpoints/blog";
import AdminSidebar from "../../../components/admin-sidebar";
import { PropagateLoader } from "react-spinners";
import Prompt from "../../../components/Prompt";
import Pagination from "react-paginate";
import router, { useRouter } from "next/router";
import { RSA_NO_PADDING } from "constants";
import { Rss } from "react-feather";

function adminviewmyblogpost( { currentPage } ) {
  const [username] = useState("no-name");
  const [blogs, setBlogs] = useState([]);
  const [blogsTemp, setBlogsTemp] = useState([]);
  const [pageready, setPageReady] = useState(false);
  const [selectedBlogsList, setSelectedBlogList] = useState([]);
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const blogCategoryData = [
    { key: "LN", name: "Loans" },
    { key: "GT", name: "Grants" },
    { key: "ET", name: "Events" },
    { key: "SP", name: "Scholarships" },
  ];

  const paginate = (page: { selected: number }) => {
    if (pageready) {
      router.push("/blog/admin/adminviewmyblogpost?page=" + (page.selected + 1));
    }
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
    setShow(false);
  };

  const selectedBlogs = (blog_key, value) => {
    if (value) setSelectedBlogList([...selectedBlogsList, blog_key]);
    else {
      setSelectedBlogList(selectedBlogsList.filter((bl) => bl != blog_key));
    }
  };

  const deleteBlogs = () => {
    if (selectedBlogsList.length <= 0) {
      callPrompt(
        "Delete Post",
        "",
        "Okay",
        "Please select blog or blogs to delete"
      );
    } else {
      callPrompt(
        "Delete Post",
        "",
        "",
        "Please wait... Deleting blog(s)"
      );
      
      new Blog()
        .deletePersonalBlog(selectedBlogsList)
        .then((rs) => {
          setShow(false);
        });
      let temp = JSON.parse(JSON.stringify(blogs));
      selectedBlogsList.map((key) => {
        temp = temp.filter((bl) => bl.key != key);
      });
      setBlogs(temp);
      setBlogsTemp(temp);
    }
  };

  useEffect(() => {
    new Blog()
      .getBlogs(currentPage)
      .then((rs) => {
        if (rs.results) {
          setPageReady(true);
          setBlogs(rs.results);
          settotalRecords(rs.count)
          setBlogsTemp(rs.results);
        }
      })
      .catch((e) => console.log(e));
  }, [currentPage]);

  return (
    <>
      <MainLayout title="Blog Page" pageTitle="">
      <AdminSidebar handleList={() => { }} />
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
        {/* page-header */}
        <div className="page-header">
          <h1 className="page-title">Admin Blog Post(s)</h1>
        </div>
        {/* End page-header */}

        {/* The blog category filter */}
        <div id="blogtypefilter__div" className="row">
          <div className="col-md-6 form-group">
            <select
              className="form-control form-rounded"
              name="blogcategoryfilter"
              id="blogcategoryfilter"
              onChange={(e) => {
                let rs = null;
                switch (e.target.value) {
                  case "LN":
                    rs = blogs.filter(b=>b.category == "LN");
                    setBlogsTemp(rs);
                    return;
                  case "GT":
                    rs = blogs.filter(b=>b.category == "GT");
                    setBlogsTemp(rs);
                    return;
                  case "SP":
                    rs = blogs.filter(b=>b.category == "SP");
                    setBlogsTemp(rs);
                    return;
                  case "ET":
                    rs = blogs.filter(b=>b.category == "ET");
                    setBlogsTemp(rs);
                    return;
                  default:
                    setBlogsTemp(blogs);
                }
              }}
            >
              <option value="">All Posts</option>
              {blogCategoryData.map((bcat: any, index: number) => (
                <option key={index} value={bcat.key}>
                  {bcat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <button
             type="button"
              className="btn delete_blog_btn mb-3"
              onClick={deleteBlogs}
              disabled={selectedBlogsList.length <= 0}
              >
              Delete
            </button>
          </div>
        </div>
        {/* The end of the blog category filter */}
        <div className="row">
          {pageready == false ? (
              <div className="" style={{ margin: "auto", marginTop: "50px" }}>
                  <PropagateLoader size={30} color="#1b98e0" loading />
              </div>
          ) : (
            blogs.length == 0 && (
              <p id="no-products" className="no-products-found">
                No blogs in your list currently.
              </p>
            )
          )}
          {blogsTemp.map((blog) => {
            return <AdminBlogPosts key={blog.key} blog={blog}  selectedBlogs={selectedBlogs} />;
          })}
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
      </MainLayout>
    </>
  );
}

export default adminviewmyblogpost;

export async function getServerSideProps({ query: { page = 1 } }) {
  const currentPage = page.toString();
  return {
    props: {
      currentPage,
    },
  };
}