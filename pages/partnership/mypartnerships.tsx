import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import Footer from "../../components/MainLayout/Footer";
import MyPartnershipRequestCard from "../../components/Partnership/MyPartnershipRequestCard";
import Prompt from "../../components/Prompt";
import { Partnership } from "../../lib/endpoints/partnership";
import Pagination from "react-paginate";
import { PropagateLoader } from "react-spinners";
import { useRouter } from "next/router";
import ScrollToTop from "react-scroll-to-top";

function MyPartnerships({ currentPage }) {
  const [partnershipTypeData] = useState([
    { key: "GP", value: "General Partner" },
    { key: "LP", value: "Limited Partner" },
  ]);
  const [industry_type_list] = useState([
    { key: "AG", value: "Agriculture" },
    { key: "CT", value: "Construction" },
    { key: "CA", value: "Creative Arts" },
    { key: "ED", value: "Education" },
    { key: "ET", value: "Entertainment" },
    { key: "FS", value: "Financial Services" },
    { key: "HP", value: "Health and Pharmaceutical" },
    { key: "IE", value: "Import and Export" },
    { key: "IT", value: "Information Technology" },
    { key: "MF", value: "Manufacturing" },
    { key: "MN", value: "Mining" },
    { key: "OG", value: "Oil and gas" },
    { key: "RE", value: "Real Estate" },
    { key: "RW", value: "Retail and Wholesale" },
    { key: "TE", value: "Telecommunication" },
    { key: "TH", value: "Tourism and Hospitality" },
    { key: "TV", value: "Transport and Vehicle" },
    { key: "WS", value: "Water and Sewage" },
  ]);
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const [partnershipCategoryData, setpartnershipCategoryData] = useState([]);

  const [pType, setPType] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [partnershiptype, setPartnershipType] = useState("");
  const [searchtext, setSearchtext] = useState("");
  const [location, setLocation] = useState("");
  const [partnerships, setPartnerships] = useState([]);
  const [partnershipLists, setPartnershipLists] = useState([]);
  const [owner, setOwner] = useState({ title: "", image: "" });
  const [checkedList, setCheckedList] = useState([]);
  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [pageReady, setPageReady] = useState(false);
  const router = useRouter();

  const handleClose = () => setShow(false);
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

  useEffect(() => {
    let filter = JSON.parse(JSON.stringify(partnerships));
    if (searchtext.length > 0) {
      filter = filter.filter((partnership) => {
        return (
          partnership.type.includes(searchtext.toLowerCase()) ||
          partnership.industry.toLowerCase().includes(searchtext) ||
          partnership.description.includes(searchtext.toLowerCase())
        );
      });
    }
    if (industryType.length > 0)
      filter = filter.filter((partnership) => {
        return partnership.industry == industryType;
      });

    if (partnershiptype.length > 0)
      filter = filter.filter((partnership) => {
        return partnership.type == partnershiptype;
      });
    setPartnershipLists(filter.slice(0, 10));
  }, [partnershiptype, industryType, searchtext]);

  const setCheck = (id) => {
    const t = partnershipLists.map((j) => {
      if (j.key == id) {
        j.checked = !j.checked;
      }
      return j;
    });
    setPartnershipLists(t);
  };

  useEffect(() => {
    const ls = JSON.parse(window.localStorage.getItem("user-profile"));
    setOwner(ls);
    new Partnership()
      .listPartnershipforBusiness(currentPage)
      .then((partnershipList: any) => {
        if (
          Array.isArray(partnershipList.results) &&
          partnershipList.results.length > 0
        ) {
          setPartnerships(partnershipList.results);
          setPartnershipLists(partnershipList.results);
          settotalRecords(partnershipList.count);
          setPageReady(true);
        }
        setPageReady(true);
      });
  }, [currentPage]);

  const paginate = (page: { selected: number }) => {
    if (pageReady) {
      router.push("/partnership/mypartnerships/?page=" + (page.selected + 1));
    }
  };

  return (
    <>
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
        <div className="row page-header">
          <div>
            <h1 className="page-title">My Request</h1>
          </div>
        </div>

        <div className="row mr-1 ml-1 justify-content-end">
          <div className="filterpartnership d-flex mb-3">
            <div className=" " id="partnershiptypefilter__div">
              <div className="form-group filter-dropdown">
              <select
                className="form-control form-rounded"
                value={partnershiptype}
                onChange={(e) => setPartnershipType(e.target.value)}
              >
                <option value="">Type of Partnership</option>

                {partnershipTypeData.map((p) => {
                  return (
                    <option value={p.key} key={p.key}>
                      {p.value}
                    </option>
                  );
                })}
              </select>
              </div>
            </div>
            <div id="industrytype__div">
              <div className="form-group filter-dropdown">
              <select
                className="form-control form-rounded"
                value={industryType}
                onChange={(e) => setIndustryType(e.target.value)}
              >
                <option value="">Type of Industry</option>

                {industry_type_list.map((i) => {
                  return (
                    <option value={i.key} key={i.key}>
                      {i.value}
                    </option>
                  );
                })}
              </select>
              </div>
            </div>
            ​
            <div>
            <button
              className="btn btn-primary delete-selected"
              onClick={async () => {
                if (checkedList.length > 0) {
                  callPrompt("Deleting partnership(s)", "", "", "Please wait...");
                  let plist = JSON.parse(JSON.stringify(partnershipLists));
                  for (let i = 0; i < checkedList.length; i++) {
                    const rs = await new Partnership().deletePartnership(checkedList[i]);
                    plist = plist.filter((item) => item.key !== checkedList[i]);
                  }
                  callPrompt(
                    "Deleting Partnership(s)",
                    "",
                    "Close",
                    "Partnership(s) deleted successfully"
                  );
                  setPartnershipLists(plist);
                  setCheckedList([]);
                } else {
                  callPrompt(
                    "Deleting partnership(s)",
                    "",
                    "Close",
                    "Select a partnership or partnerships to delete"
                  );
                }
              }}
            >
              Delete
            </button>
            </div>
          </div>
        </div>

        <div className="row">
        {pageReady && partnershipLists.length <= 0 ? (
            <p id="no-products" className="no-products-found"  style={{ margin: "auto", marginTop: "50px" }}>
                You haven't posted any partnership request(s) yet.
            </p>
          ) : !pageReady ? (
            <div className="" style={{ margin: "auto", marginTop: "50px" }}>
              <PropagateLoader size={30} color="#1b98e0" loading />
            </div>
          ) : null}
          {partnershipLists.map((partnership: any, index: number) => {
            return (
              <MyPartnershipRequestCard
                key={index}
                partnership={partnership}
                setCheckedList={setCheckedList}
                setCheck={setCheck}
              />
            );
          })}
        </div>
        <div
          className="row market-pagi"
          id="paginate-row"
        >
          <div className="col-md-12 text-right"
            style={{ marginTop: "150px" }}
          >
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
        <ScrollToTop smooth color="#1b98e0"/>
      </MainLayout>
      <Footer />
    </>
  );
}

export default MyPartnerships;

export async function getServerSideProps({ query: { page = 1 } }) {
  const currentPage = page.toString();
  return {
    props: {
      currentPage,
    },
  };
}
