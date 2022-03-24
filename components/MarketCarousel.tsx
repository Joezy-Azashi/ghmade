import React from "react";
import { Button, Card, Carousel } from "react-bootstrap";

function MarketCarousel() {
  return (
    <div>
      <Card className="mb-4">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/assets/images/header-picture.jpg"
                alt="First slide"
              />
              <Carousel.Caption >
                <h3
                className="row justify-content-start"
                >
                    One Stop Online Market</h3>
                <p
                className="row justify-content-start"
                >
                 ghmade is your one-stop place for products and services of all types.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/assets/images/header-picture.jpg"
              />

              <Carousel.Caption>
                <h3
                className="row justify-content-start"
                >
                    One Stop Online Market
                </h3>
                <p
                className="row justify-content-start"
                >
                    We offer you a variety of products and services across sectors; from hospitality to finance.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/assets/images/header-picture.jpg"
                alt="Third slide"
              />

              <Carousel.Caption className="market-header-caption">
                <h3
                className="row justify-content-start"
                >
                    One Stop Online Market</h3>
                <p
                className="row justify-content-start"
                >
                     Find gift shops, construction services, and many more at our marketplace
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
      </Card>
    </div>
  );
}

export default MarketCarousel;
