const ServiceCard = ({ service }) => {
  const truncate = (str: string) => {
    return str.length > 300 ? str.substring(0, 300) + "..." : str;
  };

  return (
    <div className="col-md-6" id="service-card__div">
      <div className="card" id="service-card" style={{borderRadius:"1em"}}>
        <div className="card-body" id="service-card-body">
          <div className="row" id="service-card-body__row">
            <div
              className="col-md-6"
              id="service-card-col-2"
              style={{ order: 2 }}
            >
              <img
                id="service-card-col-2__image"
                src={service.image_1}
                className="card-img-right"
                alt="..."
                style={{
                  width: "100%",
                  height: "20em",
                  objectFit: "fill",
                  zIndex: 1,
                  marginBottom: "-1.5em",
                }}
              />
              <button
                id="service-card-col-2__btn"
                className="btn btn-info"
                style={{
                  width: "2em",
                  borderRadius: "1em",
                  marginTop: "-37em",
                  zIndex: -1,
                  marginLeft: "80%",
                }}
              >
                <i className="fe fe-shopping-bag"></i>
              </button>
            </div>
            <div
              className="col-md-6"
              id="service-card-col-1"
              style={{ order: 1 }}
            >
              <div
                id="service-card-col-2__service-name"
                className="font-weight-bold row"
                style={{ paddingBottom: "15px" }}
              >
                {service.name}
              </div>
              <div
                id="service-card-col-2__service-desc"
                className="row"
                style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {truncate(service.description)}
              </div>
              <div
                id="service-card-col-2__service-read-more"
                className="font-weight-bold row"
                style={{ position: "absolute", bottom: "15px" }}
              >
                Read More
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;
