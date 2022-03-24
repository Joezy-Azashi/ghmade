/* import AuthHeader from "../../components/auth/AuthHeader"; */
import MainLayout from "../../components/MainLayout";
import React, { useState, useEffect } from "react";
import FooterLayout from "../../components/FooterLayout";
import BlogListingCard from "../../components/blog/blogListingCard";
import Pagination from "react-paginate";
import { PropagateLoader } from "react-spinners";
import { useRouter } from "next/router";
import { Blog } from "../../lib/endpoints/blog";
import ScrollToTop from "react-scroll-to-top";

export default function BlogListing({ currentPage }) {
  const router = useRouter();
  const [typeFilterName, setTypeFilterName] = useState("Type");
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const [tempList, setTempList] = useState([]);
  const [pageReady, setPageReady] = useState(false);
  const [blogListing, setBlogListing] = useState<any>([]);
  const [filters, setFilters] = useState({
    category: "",
  });

  const blogCategoryData = [
    { key: "LN", name: "Loans" },
    { key: "GT", name: "Grants" },
    { key: "ET", name: "Events" },
    { key: "SP", name: "Scholarships" },
  ];

  const paginate = (page: { selected: number }) => {
    if (pageReady) {
      router.push("/blog/blog?page=" + (page.selected + 1));
    }
  };

  useEffect(() => {
    (async () => {
      let rs: any = await new Blog().getBlogListing(currentPage);
      setTempList(rs.results);
      setBlogListing(rs.results);
      settotalRecords(rs.count);
      setPageReady(true);
    })();
  }, [currentPage]);

  useEffect(() => {
    setBlogListing(tempList);
  }, [tempList])

  useEffect(() => {
    if (typeFilterName) {
      (async () => {
        try {
          const rs = await new Blog().getFilteredBlog(filters);
          setTempList(rs.results);
          settotalRecords(rs.count);
        } catch (error) {
        }
      })();
    } else {
      (async () => {
        let rs: any = await new Blog().getBlogListing(currentPage);
        setTempList(rs.results);
        setBlogListing(rs.results);
        settotalRecords(rs.count);
        setPageReady(true);
      })();
    }
  }, [typeFilterName]);

  const typeFilter = async (event: any) => {
    setTypeFilterName(event.target.value);
    filters.category = event.target.value;
    setFilters(filters);
  };

  return (
    <>
      <MainLayout title="Blog Page" pageTitle="">
        {/* page-header */}
        <div className="page-header">
          <h1 className="page-title">Blog</h1>
        </div>
        {/* End page-header */}

        {/* The blog category filter */}
        <div id="jobstypefilter__div" className="row">
          <div className="form-group col-md-6">
            <select
              className="form-control form-rounded"
              name="jobscategoryfilter"
              id="jobscategoryfilter"
              value={typeFilterName}
              onChange={typeFilter}
            // onChange={(e) => setBlogCategory(e.target.value)}
            >
              <option value="">All Posts</option>
              {blogCategoryData.map((bcat: any, index: number) => (
                <option key={index} value={bcat.key}>
                  {bcat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* The end of the blog category filter */}
        <div>
          <div className="row">
            {/* The column of card to be looped */}
            {!pageReady ? (
              <div className="" style={{ margin: "auto", marginTop: "50px" }}>
                <PropagateLoader size={30} color="#1b98e0" loading />
              </div>
            ) : blogListing.length <= 0 ? (
              <div className="" style={{ margin: "auto", marginTop: "50px" }}>
                <p id="no-products" className="no-products-found">
                  No Blog(s) posted as at now.
              </p>
              </div>
            ) : null}
            {blogListing.map((blog: any, index: number) => {
              return <BlogListingCard key={index} blog={blog} />;
            })}
            {/* the column of card to be looped */}
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
