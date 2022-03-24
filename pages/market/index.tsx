import MainLayout from "../../components/MainLayout";
import { Products } from "../../lib/endpoints";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import Pagination from "react-paginate";
import { Router, useRouter } from "next/router";
import FooterLayout from "../../components/FooterLayout";
import { PropagateLoader } from "react-spinners";
import React from "react";
import ScrollToTop from "react-scroll-to-top";


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
      const product: any = await new Products().getProducts(currentPage);
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
      await router.push("/market?page=" + (page.selected + 1));
    }

  };

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  return (
    <>
      <MainLayout>

        <div>
          <div
            className=" mb-4"
            id="header__container"
            style={{ width: "100%" }}
          >
            <div
              id="marketCarouselIndicators"
              className="carousel slide headerbanner"
              data-ride="carousel"
            >
              <ol
                className="carousel-indicators market-carousel-indicators"
                id="carousel-indicators"
              >
                <li
                  id="market-carousel-item-1"
                  data-target="#marketCarouselIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  id="market-carousel-item-2"
                  data-target="#marketCarouselIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  id="market-carousel-item-3"
                  data-target="#marketCarouselIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner" id="carousel-inner">
                <div
                  className="carousel-item active"
                  id="carousel-item-1"
                  data-interval="2000"
                >
                  <div className="carousel-caption d-none d-md-block">
                    <h6 className="captionheading">One Stop Online Market</h6>
                    <p className="slider-text">
                      ghmade is your one-stop place for products and
                      services of all types. We offer you a variety of products
                      and services across sectors; from hospitality to finance.
                    </p>
                  </div>
                  <div className="mview">
                    <h6 className="mcaptionheading">One Stop Online Market</h6>
                    <p className="mslider-text">
                      ghmade is your one-stop place for products and
                      services of all types. We offer you a variety of products
                      and services across sectors; from hospitality to finance.
                    </p>
                  </div>
                  <img
                    id="carousel-item-1__image"
                    src="/assets/images/slider_image.jpg"
                    alt="..."
                  />
                </div>
                <div
                  className="carousel-item"
                  id="carousel-item-2"
                  data-interval="2000"
                >
                  <div className="carousel-caption d-none d-md-block">
                    <h6 className="captionheading">One Stop Online Market</h6>
                    <p className="slider-text">
                      Find gift shops, construction services, and many more at
                      our marketplace section.
                    </p>
                  </div>
                  <div className="mview">
                    <h6 className="mcaptionheading">One Stop Online Market</h6>
                    <p className="mslider-text">
                      Find gift shops, construction services, and many more at
                      our marketplace section.
                    </p>
                  </div>
                  <img
                    id="carousel-item-2__image"
                    src="/assets/images/slider_image.jpg"
                    className=""
                    alt="..."
                  />
                </div>
                <div
                  className="carousel-item"
                  id="carousel-item-3"
                  data-interval="2000"
                >
                  <div className="carousel-caption d-none d-md-block">
                    <h6 className="captionheading">One Stop Online Market</h6>
                    <p className="slider-text">
                      Feel free to browse and order the products or services of
                      your choice, and with no stress at all.
                    </p>
                  </div>
                  <div className="mview">
                    <h6 className="mcaptionheading">One Stop Online Market</h6>
                    <p className="mslider-text">
                      Feel free to browse and order the products or services of
                      your choice, and with no stress at all.
                    </p>
                  </div>
                  <img
                    id="carousel-item-3__image"
                    src="/assets/images/slider_image.jpg"
                    className=""
                    alt="..."
                  />
                </div>
              </div>
            </div>
            <div className="ml-auto">
              <div className="inner-addon right-addon">
                <i className="fe fe-search fa-lg" />
                <div className="row marketsearch mb-4">
                  <input
                    id="searchmember"
                    className="form-control form-rounded"
                    type="text"
                    placeholder="Search by products/services, name of business, location"
                    onChange={searchProduct}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex filtermarketplace" id="filtersrow">
              <div id="categoryfilter__div">
                <div className="form-group mt-2 filter-dropdown ">
                  <select
                    className="form-control form-rounded"
                    onChange={categoryFilter}
                    value={categoryFilterName}
                  >
                    <option value="">Category</option>
                    {categoryData.map((category: any, index: number) => {
                      return (
                        <option
                          className="dropdown-item"
                          key={index}
                          value={category.key}
                        >
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div id="typefilterdiv">
                <div className="form-group mt-2 filter-dropdown">
                  <select
                    className="form-control form-rounded"
                    onChange={typeFilter}
                    value={typeFilterName}
                  >
                    <option value="">Type</option>
                    <option value="">All</option>
                    <option value="PR">Products</option>
                    <option value="SE">Services</option>
                  </select>
                </div>
              </div>
              {/* <div id="locationfilter__div">
                <div className="form-group mt-2 filter-dropdown">
                  <select
                    className="form-control form-rounded "
                    onChange={locationFilter}
                    value={locationFilterName}
                  >
                    <option value="">Location</option>
                    {locationData.map((location: any, index: number) => {
                      return (
                        <option
                          className="dropdown-item"
                          key={index}
                          value={location}
                        >
                          {location}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div> */}
              <div id="minpricefilter__div">
                <div className="form-group mt-2 filter-dropdown">
                  <select
                    className="form-control form-rounded "
                    onChange={minPriceFilter}
                    value={minPriceFilterName}
                  >
                    <option value="">Minimum Price</option>
                    {minPriceFilters.map((price: any, index: number) => {
                      return (
                        <option
                          className="dropdown-item"
                          key={index}
                          value={price.key}
                        >
                          {price.value}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div id="maxpricefilter__div">
                <div className="form-group mt-2 filter-dropdown">
                  <select
                    className="form-control form-rounded "
                    onChange={maxPriceFilter}
                    value={maxPriceFilterName}
                  >
                    <option value="">Maximum Price</option>
                    {maxPriceFilters.map((price: any, index: number) => {
                      return (
                        <option
                          className="dropdown-item"
                          key={index}
                          value={price.key}
                        >
                          {price.value}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
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
            {shuffle(allproducts).map((product: any, index: number) => {
              console.log("allproducts",allproducts)
              return <ProductCard key={index} product={product} />;
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
