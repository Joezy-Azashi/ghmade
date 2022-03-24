import { useEffect, useRef, useState } from "react";
import Pagination from "react-paginate";
import JobApplicantsCard from "../../components/jobs/JobApplicantsCard";
import MainLayout from "../../components/MainLayout";
import { Jobapplicants } from "../../lib/endpoints/jobapplicants";
import { useRouter } from "next/router";
import { PropagateLoader  } from "react-spinners";
import ScrollToTop from "react-scroll-to-top";


export default function ViewApplicants({ currentPage }) {
  const [jobApplicants, setJobApplicants] = useState([]);
  const [holderjobApplicants, setHolderJobApplicants] = useState([]);
  const parentRef = useRef<HTMLDivElement>(null);
  const [pdflink, setPDFLink] = useState(null);
  const [filterJobTitles, setFilterJobTitles] = useState <any>([]);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalPDFPages, setTotalPDFPages] = useState(1);
  const [pageReady, setPageReady] = useState(false);
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const router = useRouter();
  const [pdfDoc, setPDFDoc] = useState<{
    pdf: { getPage(viewport: number): Promise<void> };
    currentPage: number;
    zoom: number;
  }>({
    pdf: null,
    currentPage: 1,
    zoom: 1.5,
  });
  const paginate = (page: { selected: number }) => {
    if (pageReady) {
      router.push("/jobs/viewapplicants/?page=" + (page.selected + 1));
      // setCurrentPage(page.selected + 1);
    }
  };
  const filterByJob = (e) => {
    let temp = JSON.parse(JSON.stringify(holderjobApplicants));
    if (e.target.value !== "All" && e.target.value !== "")
    {
      temp = temp.filter((job) => {
        return job.job.title === e.target.value
      })
    }
    setJobApplicants(temp);
    settotalRecords(temp.length);
  };
  const callSort = (e: any) => {
    const temp = JSON.parse(JSON.stringify(jobApplicants));
    if (e.target.value == 1) {
      temp.sort((a, b) => {
        return b.timestamp.localeCompare(a.timestamp);
      });
    } else {
      temp.sort((a, b) => {
        return a.timestamp.localeCompare(b.timestamp);
      });
    }
    setJobApplicants(temp);
  };
  const renderPDF = () => {
    pdfDoc.pdf.getPage(pdfDoc.currentPage).then((page: any) => {
      const canvas: any = document.getElementById("pdf_renderer");
      const ctx = canvas.getContext("2d");
      const viewport = page.getViewport({ scale: 1.6 });
      canvas.width = 900;
      canvas.style.width = "1083px";
      canvas.height = viewport.height;
      page.render({
        canvasContext: ctx,
        viewport: viewport,
      });
    });
  };
  useEffect(() => {
    if (pdfDoc.pdf) {
      renderPDF();
    }
  }, [pdfDoc]);
  useEffect(() => {
    if (pdflink) {
      //@ts-ignore
      const pdfjsLib = window.pdfjsLib;
      pdfjsLib.getDocument(pdflink).promise.then((pdfDoc_: any) => {
        const pdf: any = {
          pdf: pdfDoc_,
          currentPage: 1,
          scale: 1,
        };
        setPDFDoc(pdf);
        setTotalPDFPages(pdfDoc_.numPages);
      });
    }
  }, [pdflink]);
  useEffect(() => {
    new Jobapplicants().getapplicants(currentPage).then((applicants) => {
      let arr = applicants.results
      if (Array.isArray(applicants.results)) {
        let uniqueSet: any = new Set(arr.map(item => item.job.title))
        const unique = [...uniqueSet];  
        setHolderJobApplicants(applicants.results);
        setJobApplicants(applicants.results);
        settotalRecords(applicants.count);
        setFilterJobTitles(unique)
      }
      setPageReady(true);
    });
  }, [currentPage]);
  return (
    <>
      <MainLayout>
        <div>
          {/* page-header */}
          <div className="page-header">
            <h1 className="page-title">Job Applicants</h1>
            <div className="ml-auto mt-5">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <select
                      className="form-control form-rounded viewapplicant-filter"
                      data-placeholder="Filter"
                      // style={{ width: "335px" }}
                      onChange={filterByJob}
                    >
                      <option value="" label="Filter">
                        Filter
                      </option>
                      <option value="All">All</option>
                      {filterJobTitles.map((title: any, index: number) => (
                        <option key={index} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <select
                      className="form-control form-rounded viewapplicant-filter"
                      data-placeholder="Sort By"
                      // style={{ width: "335px" }}
                      onChange={callSort}
                    >
                      <option label="Sort By">Sort By</option>
                      <option value={1}>Date applied: Latest</option>
                      <option value={2}>Date applied: Earliest</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End page-header */}
          {pageReady && totalRecords <= 0 ? (
            <p id="no-products" className="no-products-found row justify-content-center">
              No applicants has applied for job(s) currently.
            </p>
          ) : !pageReady ? (
            <div
              className="row justify-content-center"
              style={{marginTop: "50px" }}
            >
              <PropagateLoader size={30} color="#1b98e0" loading />
            </div>
          ) : null}
          {jobApplicants.map((applicant: any, index: number) => {
            return (
              <JobApplicantsCard
                applicant={applicant}
                setPDFLink={setPDFLink}
                key={index}
              />
            );
          })}
          {jobApplicants.length > 0 ? (
            <div className="row" style={{ margin: "10px" }}>
              <div className="col-md-12 text-right">
              <Pagination
                  initialPage={parseInt(currentPage.toString()) - 1}
                  onPageChange={paginate}
                  pageCount={totalRecords / recordsPerPage}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  containerClassName="pagination ml-auto row d-flex justify-content-end"
                  previousLabel="<<Prev"
                  nextLabel="Next>>"
                  activeLinkClassName="active"
                  disabledClassName="pagination_next_prev_dissable"
              />
              </div>
            </div>
          ) : null}
        </div>
        <div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            role="dialog"
            data-backdrop="static"
            data-keyboard="false"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ paddingBottom: "120px" }}
          >
            <div>
              <a
                href={pdflink}
                download
                target="_blank"
                className="btn btn-lg btn-primary downloadbtn">
                Download CV
              </a>
              <a href="#">
                <i
                  className="fe fe-x fa-lg fa-3x"
                  data-dismiss="modal"
                  style={{
                    top: "11%",
                    right: "10%",
                    position: "absolute",
                    margin: "0 auto",
                    color: "#ffffff",
                  }}
                ></i>
              </a>
            </div>
            <div className="card appcv cvoverlay">
              <div style={{ textAlign: "center" }} className="mt-2">
                <button
                  className="btn btn-square btn-warning ml-2 mr-2"
                  style={{ width: "50px" }}
                  onClick={() => {
                    if (currentPageNum == 1) return;
                    pdfDoc.currentPage -= 1;
                    setCurrentPageNum(pdfDoc.currentPage);
                    renderPDF();
                  }}
                >
                  -
                </button>
                <span style={{ color: "black" }}>
                  Page {currentPageNum} 0f {totalPDFPages}
                </span>
                <button
                  className="btn btn-square btn-warning mr-2 ml-2"
                  style={{ width: "50px" }}
                  onClick={() => {
                    if (pdfDoc.currentPage == totalPDFPages) return;
                    pdfDoc.currentPage += 1;
                    setCurrentPageNum(pdfDoc.currentPage);
                    renderPDF();
                  }}
                >
                  +
                </button>
              </div>
              <div className="modal-dialog m-0 p-0" ref={parentRef}>
                <canvas className="cvmodal"
                  id="pdf_renderer"
                ></canvas>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .pdfviewer {
            width: 1024px;
            background: #333;
            border: 3px solid;
            borderRadius: 0,
            top: "24%",
            height: "50%",
            marginTop: "20px",
          }
        `}</style>
        <ScrollToTop smooth color="#1b98e0"/>
      </MainLayout>
    </>
  );
}
export async function getServerSideProps({ query: { page = 1 } }) {
  const currentPage = page.toString();
  return {
    props: {
      // product: data,
      // page: +page
      currentPage,
    },
  };
}