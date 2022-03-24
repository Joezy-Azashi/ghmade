import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, CardDeck } from "react-bootstrap";
import MainLayout from "../../components/MainLayout";
import { Products } from "../../lib/endpoints";
import Pagination from "react-paginate";
import { useRouter } from "next/router";

const disabled = {};

function viewmyproducts({ currentPage }) {
  const [productItems, setProductItems] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [totalRecords, settotalRecords] = useState(0);
  const [recordsPerPage] = useState(32);
  const [toremove, setToremove] = useState([]);

  const [pageReady, setPageReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const rs = await new Products().getUserProduct(currentPage);
      setTempList(rs.results);
      setProductItems(rs.results);
      settotalRecords(rs.count);
      setPageReady(true);
    })();
  }, [currentPage]);

  const paginate = (page: { selected: number }) => {
    if (pageReady) {
      router.push("/products/viewmyproducts/?page=" + (page.selected + 1));
    }
  };

  const removeProducts = async () => {
    try {
      for (let id of toremove) {
        let result = await new Products().removeProduct(id);
      }
      window.location.reload();
    } catch (error) {}
  };

  return (
    <>
      <MainLayout>
        <div className="row justify-content-between page-title-products">
          <h1 className="page-title mt-6">My Products & Services</h1>
          <div className="mt-6 delproduct">
            <button
              className="btn btn-primary delproductbtn"
              onClick={() => removeProducts()}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="row">
          {/* <div className="col-md-6 col-lg-3 col-sm-12"> */}
          {/* start of the product card*/}
          {productItems.length > 0 ? (
            productItems.map((productItem: any, index: number) => {
              return (
                <div
                  key={index}
                  className="col-md-6 col-lg-4 col-xl-3 col-sm-12"
                >
                  <Card className="mb-5 card-hover">
                    <input
                      type="checkbox"
                      className="card-checkbox"
                      onChange={(e) => {
                        if (e.target.checked === false) {
                          let remove = toremove;
                          remove.splice(remove.indexOf(productItem.id), 1);
                          setToremove(remove);
                        } else if (e.target.checked === true) {
                          let remove = toremove;
                          remove.push(productItem.id);
                          setToremove(remove);
                        }
                      }}
                    />
                    <Link
                      href="/products/[id]"
                      as={`/products/${productItem.id}`}
                    >
                      <Card.Img
                        className="card-image"
                        variant="top"
                        src={
                          productItem.image_1
                            ? productItem.image_1
                            : "/assets/images/new-default.jpg"
                        }
                      />
                    </Link>
                    <Link
                      href="/products/[id]"
                      as={`/products/${productItem.id}`}
                    >
                      <Card.Body>
                        <Card.Title>
                          <a>
                            <h6 className="market-product-name">
                              {productItem.name}
                            </h6>
                          </a>
                        </Card.Title>
                        <Card.Text className="product-description">
                          GH¢{" "}
                          {(
                            productItem.price -
                            (productItem.discount / 100) * productItem.price
                          ).toFixed(2)}
                          <span
                            className={` badge-button badge ${
                              productItem.approval_status == "0"
                                ? "bg-warning"
                                : productItem.approval_status == "1"
                                ? "bg-success"
                                : "bg-danger"
                            } blog_badge`}
                          >
                            {productItem.approval_status == "0"
                              ? "Pending"
                              : productItem.approval_status == "1"
                              ? "Approved"
                              : "Rejected"}
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                </div>
              );
            })
          ) : (
            <h4 id="no-products" className="no-products-found1 mb-5">
              No product/services uploaded yet{" "}
            </h4>
          )}
        </div>
        {/* </div> */}
        {/* end of card for product */}

        <div className="row" id="paginate-row" style={{ margin: "10px" }}>
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
      </MainLayout>
    </>
  );
}
export default viewmyproducts;

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
