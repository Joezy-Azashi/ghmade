import React from "react";
import { Card, CardGroup } from "react-bootstrap";
import MainLayout from "../../components/MainLayout";

function editproducts() {
    return (
      <>
        <MainLayout>
          <div className="container mb-5">
            {/* page-header */}
            <div className="page-header">
              <h1 className="page-title">My Products</h1>
            </div>
            {/* end of  page-header */}

            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="row">
                <CardGroup>
                      <Card>
                        <Card.Img variant="top" src="/assets/images/trials3.jpg" />
                      </Card>
                </CardGroup>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <Card>
                        <Card.Img
                        src="/assets/images/trials3.jpg"
                        />
                    </Card>
                  </div>

                  <div className="col-md-6">
                    <Card>
                        <Card.Img
                        src="/assets/images/trials3.jpg"
                        />
                    </Card>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="row justify-content-end mb-3 mr-1">
                    <button
                        className="btn btn-primary btn-block viewproducteditbtn"
                    >
                        Edit
                    </button>
                </div>

                <div className="">

                  <div className="row ml-1">
                      <h3>Men's Watch</h3>
                  </div>

                  <div className="row">
                    <div className="mr-3 ml-3">
                        <h3>GHS 3000.00</h3>
                    </div>
                    <div className="mr-3 ml-3 discount-price text-muted">
                        <h3>GHS 3200.00</h3>
                    </div>
                    <div className="mr-3 ml-3">
                        <button
                            className="btn btn-primary btn-block"
                            style={{
                            background: "#3964FC !important",
                            width: "100px !important",
                            color: "#ffffff !important",
                            borderRadius: "10px !important",
                            height: "36.5px !important",
                            }}
                        >
                            30% off
                        </button>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                      <p>
                          <strong>
                              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod voluptatem facere minus error, officiis non laborum doloribus sint et enim odio quae molestiae saepe perspiciatis corporis nemo? Cum, reprehenderit aliquid! <br/>
                              Aliquid, cumque, quia eveniet, magnam aspernatur ipsam ut repudiandae minima saepe esse blanditiis quis adipisci porro? Excepturi, exercitationem porro iste est aliquam totam, maiores placeat temporibus repellat recusandae minima animi. <br/>
                              Rerum, rem unde, repudiandae sit enim, maiores aspernatur expedita qui aliquid molestiae eius voluptatum temporibus laborum soluta molestias harum non. Dignissimos totam, officiis dolores reprehenderit amet ratione itaque eum asperiores?
                          </strong>
                      </p>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      </>
    );
}

export default editproducts;