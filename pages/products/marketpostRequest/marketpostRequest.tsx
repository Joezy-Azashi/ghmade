import MainLayout from "../../../components/MainLayout";
import { Products } from "../../../lib/endpoints";
import { useEffect, useState } from "react";

import Pagination from "react-paginate";
import { Router, useRouter } from "next/router";
import FooterLayout from "../../../components/FooterLayout";
import { PropagateLoader } from "react-spinners";
import React from "react";
import ScrollToTop from "react-scroll-to-top";
import AdminSidebar from "../../../components/admin-sidebar";
import MarketProductCard from "../../../components/MarketProductCard";

const locationData = [
  "Aboadze",
  "Adiembra",
  "Adientem",
  "Airport Ridge",
  "Anaji",
  "Apollo",
  "Apowa",
  "Apremdo",
  "Assakae",
  "Beach Road",
  "Beahu",
  "BU",
  "Chapel Hill",
  "Diabene",
  "Effiakuma",
  "Essikado",
  "Essipon",
  "Fijai",
  "I Adu",
  "Inchaban",
  "Kansaworodo",
  "Kojokrom",
  "Kokompe",
  "Kwesimintsim",
  "Lagos Town",
  "Market Circle",
  "Mpatado",
  "Mpintsin",
  "New Amanful",
  "New Site",
  "New Takoradi",
  "Nkotompo",
  "Nkroful",
  "Ntankoful",
  "Sawmill",
  "Sekondi",
  "Tadisco",
  "Tanokrom",
  "Westline",
  "Whindo",
  "Windy Ridge",
];
const categoryData = [
  // { key: "SP", name: "Sport Wears" },
  // { key: "EL", name: "Electronics" },
  { key: "FTF", name: "Fashion, Textiles and Fabrics" },
  { key: "JGP", name: "Jewellery, Gifts and Parcels" },
  { key: "SSF", name: "Shoes, Sandals and Footwears" },
  { key: "AT", name: "Automobile and Transport" },
  { key: "BOS", name: "Books and Office Supplies" },
  { key: "LFD", name: "Lights, Furniture and Decor" },
  { key: "BeL", name: "Beauty and Lifestyle" },
  { key: "BaL", name: "Bags and Luggage" },
  { key: "EGG", name: "Electronics, Gadgets and Garden Equipment" },
  { key: "TBP", name: "Toiletries / Baby Products" },
  { key: "PTC", name: "Phones, Tablets and Computers" },
  { key: "GrP", name: "Groceries and Provisions" },
  { key: "SE", name: "Services" },
  { key: "ITM", name: "Industrial Tools and Machinery" },
  { key: "REP", name: "Real Estates and Properties" },
  { key: "HeP", name: "Health and Pharmaceuticals" },
  { key: "PlP", name: "Plastics and Rubbers" },
];
const maxPriceFilters = [
  { key: "100000", value: "100,000" },
  { key: "10000", value: "10,000" },
  { key: "1000", value: "1,000" },
  { key: "100", value: "100" },
  { key: "10", value: "10" },
];
const minPriceFilters = [
  { key: "1", value: "1" },
  { key: "10", value: "10" },
  { key: "100", value: "100" },
  { key: "1000", value: "1,000" },
  { key: "10000", value: "10,000" },
  { key: "100000", value: "100,000" },
];
export default function ProductsView({ currentPage }) {
  const router = useRouter();
  const [allproducts, setAllProducts] = useState<any>([]);
  const [filters, setFilters] = useState({
    owner__city: "",
    name: "",
    category: "",
    product_type: "",
    min_price: 0,
    max_price: 1000000,
    search: "",
  });
  const [categoryFilterName, setCategoryFilterName] = useState("");
  const [typeFilterName, setTypeFilterName] = useState("");
  const [locationFilterName, setLocationFilterName] = useState("");
  const [minPriceFilterName, setMinPriceFilterName] = useState("");
  const [maxPriceFilterName, setMaxPriceFilterName] = useState("");
  const [searchTerm, setSearchterm] = useState("");
  const [altProductsList, setAltProductsList] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const [qty, setQty] = useState();
  const [pageReady, setPageReady] = useState(false);
  const [pageNav, setPagenav] = useState<any>()

  useEffect(() => {
    (async () => {
      const product: any = await new Products().adminProductList(currentPage);
      if (!product.results) {
        return;
      }
      setTempList(product.results);
      setAltProductsList(product.results);
      setAllProducts(product.results);
      settotalRecords(product.count);
      setPageReady(true);
    })();
  }, [currentPage]);

  useEffect(() => {
    if (categoryFilterName ||
      typeFilterName ||
      locationFilterName ||
      minPriceFilterName ||
      maxPriceFilterName ||
      searchTerm) {
      (async () => {
        try {
          const rs = await new Products().getFilteredProducts(filters);
          setTempList(rs.results);
          setAllProducts(rs.results.slice(0, recordsPerPage));
          settotalRecords(rs.count);
        } catch (error) { }
      })();
    } else {
      (async () => {
        const product: any = await new Products().getProducts(currentPage);
        setTempList(product.results);
        setAltProductsList(product.results);
        setAllProducts(product.results);
        settotalRecords(product.count);
        setPageReady(true);
      })();
    }
  }, [
    categoryFilterName,
    typeFilterName,
    locationFilterName,
    minPriceFilterName,
    maxPriceFilterName,
    searchTerm
  ]);

  const typeFilter = async (event: any) => {
    setTypeFilterName(event.target.value);
    filters.product_type = event.target.value;
    setFilters(filters);
  };
  const categoryFilter = async (event: any) => {
    setCategoryFilterName(event.target.value);
    filters.category = event.target.value;
    setFilters(filters);
  };
  const locationFilter = async (event: any) => {
    setLocationFilterName(event.target.value);
    filters.owner__city = event.target.value;
    setFilters(filters);
  };
  const minPriceFilter = async (event: any) => {
    setMinPriceFilterName(event.target.value);
    filters.min_price = event.target.value;
    setFilters(filters);
  };
  const maxPriceFilter = async (event: any) => {
    setMaxPriceFilterName(event.target.value);
    filters.max_price = event.target.value;
    setFilters(filters);
  };
  const searchProduct = (event: any) => {
    setSearchterm(event.target.value);
    filters.search = event.target.value;
    setFilters(filters);
  };
  const paginate = async (page: { selected: number }) => {
    if (pageReady) {
      await router.push("marketpostRequest?page=" + (page.selected + 1));
    }

  };

  return (
    <>
      <MainLayout>
      <AdminSidebar handleList={() => { }} />
        <div>
          <div
            className=" mb-4"
            id="header__container"
            style={{ width: "100%" }}
          >
          </div>
          <hr
            style={{
              width: "100%",
              border: "0.5px solid #c0c4d4",
              marginBottom: "23px",
              marginTop: "-8px",
            }}
          />
          <div className="row" id="product-row">
            {pageReady && allproducts.length <= 0 ? (
              <p id="no-products" className="no-products-found">
                No product or services found. Please refine your search and try
                again.
              </p>
            ) : !pageReady ? (
              <div className="" style={{ margin: "auto", marginTop: "50px" }}>
                <PropagateLoader size={30} color="#1b98e0" loading />
              </div>
            ) : null}
            {allproducts.map((product: any, index: number) => {
              return <MarketProductCard key={index} product={product} />;
            })}
          </div>
          <div
            className="col-md-12"
            id="paginate-row"
          >
            {totalRecords > 0 ? (
              <div className="">
                
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
            ) : (
                <></>
              )}
          </div>
        </div>
        <div>
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
