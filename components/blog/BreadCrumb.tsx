const BreadCrumb = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <div className="container"> */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Grants & Loans <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Events
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link disabled"
              href="#"
              tabIndex={-1}
              aria-disabled="true"
            >
              Scholarship
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <div
            style={{
              border: "1px solid grey",
              borderRadius: "10px",
              padding: 2,
            }}
          >
            <input
              className="form-control"
              type="search"
              placeholder="Search for article"
              aria-label="Search"
              id="blogsearch"
              style={{ border: "none" }}
            />
            <button
              style={{
                border: "none",
                backgroundColor: "white",
                paddingTop: "10px",
              }}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default BreadCrumb;
