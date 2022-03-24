import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/admin-sidebar'
import MainLayout from '../../../components/MainLayout'
import AdminBlogList from "../../../components/blog/AdminBlogList"
import { Blog } from "../../../lib/endpoints/blog";
import Prompt from "../../../components/Prompt";
import { PropagateLoader } from "react-spinners";
import { useRouter } from "next/router";
import Pagination from "react-paginate";

function postRequests({ currentPage }) {
    const [blogListing, setBlogListing] = useState<any>([]);
    const [prompt_title, setPromptTitle] = useState("");
    const [prompt_body, setPromptBody] = useState("");
    const [link_to, setLinkTo] = useState("");
    const [link_text, setLinkText] = useState("");
    const [show, setShow] = useState(false);
    const [pageReady, setPageReady] = useState(false);
    const [totalRecords, settotalRecords] = useState(0);
    const [recordsPerPage] = useState(32);
    const router = useRouter()

    useEffect(() => {
        const getAllPendingBlog = async () => {
            try {
                const rs: any = await new Blog().getAllPendingBlog(currentPage);
                setBlogListing(rs.results);
                settotalRecords(rs.count);
                setPageReady(true);
            } catch (error) {
                callPrompt("Pending Blog Post", "", "Close", "Sorry, an error occured");
            }
        };
        getAllPendingBlog();
    }, [currentPage])


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
    const paginate = (page: { selected: number }) => {
        if (pageReady) {
            router.push("/blog/admin/postRequests?page=" + (page.selected + 1));
        }
    };
    return (
        <MainLayout>
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
            <AdminSidebar handleList={() => { }} />
            <div id="main">
                <div className="page-header">
                    <h1 className="page-title page-title-userlist" id="page-title">
                        Blog Post Request(s)
                        </h1>
                </div>
                <div className="row">
                    {/* The column of card to be looped */}
                    {!pageReady ? (
                        <div className="" style={{ margin: "auto", marginTop: "50px" }}>
                            <PropagateLoader size={30} color="#1b98e0" loading />
                        </div>
                    ) : blogListing.length <= 0 ? (
                        <p id="no-products" className="no-products-found">
                            No pending blog request(s) at the moment.
                        </p>
                    ) : null}
                    {blogListing.map((blog: any, index: number) => {
                        return <div className="col-md-12"><AdminBlogList key={index} blog={blog} /></div>;
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
        </MainLayout>
    );
}
export default postRequests

export async function getServerSideProps({ query: { page = 1 } }) {
    const currentPage = page.toString();
    return {
        props: {
            currentPage,
        },
    };
}