import Link from "next/link";
import React from "react";
import { Button, Card, CardDeck, CardGroup, Tab, Tabs } from "react-bootstrap";
import MainLayout from "../components/MainLayout";
import MarketCarousel from "../components/MarketCarousel";

function marketnew() {
    return (
      <>
        <MainLayout>
          <MarketCarousel />

          {/* CARDS CONTAINING PRODUCTS AND SERVICES STARTS FROM HERE */}

          {/* THE TOGGLE STARTS FROM HERE */}

          <div className="container mb-5">
            {/* THE DDROPDOWN FOR FILERING STARTS FROM HERE */}
            <div className="row market-header-dropdowns">
              <Card.Body>
                <div className="row justify-content-between">
                  <div className="form-group mt-2">
                    <select className="form-control form-rounded filter-dropdown"></select>
                  </div>
                  <div className="form-group mt-2">
                    <select className="form-control form-rounded filter-dropdown"></select>
                  </div>
                  <div className="form-group mt-2">
                    <select className="form-control form-rounded filter-dropdown"></select>
                  </div>
                  <div className="form-group mt-2">
                    <select className="form-control form-rounded filter-dropdown"></select>
                  </div>
                  <div className="form-group mt-2">
                    <select className="form-control form-rounded filter-dropdown"></select>
                  </div>
                </div>
              </Card.Body>
            </div>
            {/* THE DDROPDOWN FOR FILERING ENDS HERE */}
            <hr />
            <CardDeck className="row">
              <hr />
              <div className="col-md-3">
                <a href="/products1/editproducts">
                  <Card className="productCard">
                    <Card.Img variant="top" src="/assets/images/trials.jpg" />
                    <div className="overlay">
                      <Link href="">
                        <a>
                          <i className="fe fe-shopping-bag"></i>
                        </a>
                      </Link>
                    </div>
                    <Card.Body>
                      <div className="row justify-content-between">
                        <div>
                          <Card.Title>Product Name</Card.Title>
                          <Card.Text>
                            <h5>GHS 300.00</h5>
                          </Card.Text>
                        </div>

                        <div>
                          {/* THIS WILL BE ADDRESED PROPERLY WHEN WHEN GET THERE */}
                          <Button
                            className="product-increament mt-1"
                            variant="outline-dark"
                          >
                            <div>- 0 +</div>
                          </Button>{" "}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </a>
              </div>

              <div className="col-md-6">
                <CardGroup>
                  <Card>
                    <Card.Body>
                      <Card.Title>Name of Service</Card.Title>
                      <Card.Text>
                        Description for the type of services an organization
                        provides
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Img variant="top" src="/assets/images/trials3.jpg" />
                  </Card>
                </CardGroup>
              </div>

              <div className="col-md-3">

              </div>
              
            </CardDeck>
          </div>
        </MainLayout>
      </>
    );
}

export default marketnew;