import React from "react";
import MainLayout from "../components/MainLayout";
import AdminSidebar from "../components/admin-sidebar";
import { Dropdown, DropdownButton, InputGroup } from "react-bootstrap";

export default function organizationrequest() {

  return (
    <MainLayout>
      <AdminSidebar   handleList={()=>{}}/>
      <div className="userlistpage" id="main">
        <div>
          <div className="page-header">
            <h3 className="page-title">Organization Requests</h3>
            <div className="mt-0 row">
              <div className="inner-addon right-addon mr-2">
                <i className="fe fe-search fa-lg" />
                <input
                  id="searchmember"
                  className="form-control form-rounded searchbox-width"
                  type="text"
                  placeholder="Search..."
                />
              </div>
              <div>
                <button className="btn btn-primary add-user-btn">
                  <i className="fe fe-plus" /> Add User
                </button>
              </div>
            </div>
          </div>
        </div>
        ​
        <div
          className="table-responsive table-lg"
          style={{
            background: "#ffffff",
            marginBottom: "100px",
          }}
        >
          <h5 className="mt-5 mb-5 ml-5 table-title">
            <div className="row ">
              <div className="selectusers">
                <DropdownButton
                  variant="outline-primary"
                  title="Select Users"
                  className="seluser"
                >
                  <Dropdown.Item href="#">Approve users</Dropdown.Item>
                </DropdownButton>
              </div>
              <div>
                <button className="btn btn-primary gobtn ml-2">GO</button>
              </div>
            </div>
          </h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="text-muted">
                  <input
                    type="checkbox"
                    id="select-All"
                    className="checkbox-round mr-2"
                  ></input>
                  Name<i className="fe fe-align-left"></i>
                </th>
                <th scope="col" className="text-muted">
                  Telephone
                </th>
                <th scope="col" className="text-muted">
                  Town
                </th>
                <th scope="col" className="text-muted requestheader">
                  Requests
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="selectAll"
                    className="checkbox-round mr-2"
                  ></input>
                  <img
                    src="/assets/images/pic.png"
                    className="header-brand-img login-logo"
                  />
                  AB Jones Ent{" "}
                </td>
                <td>050001234</td>
                <td>Anaji</td>
                <td align="center">
                  <button className="btn btn-success mr-2 requestbtn">
                    Approve
                  </button>
                  <button className="btn btn-danger requestbtn">
                    Disapprove
                  </button>
                </td>
              </tr>
              ​
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="selectAll"
                    className="checkbox-round mr-2"
                  ></input>
                  <img
                    src="/assets/images/pic.png"
                    className="header-brand-img login-logo"
                  />
                  Abdul Salam
                </td>
                <td>**********</td>
                <td>Lagos Town</td>
                <td align="center">
                  <button className="btn btn-success mr-2 requestbtn">
                    Approve
                  </button>
                  <button className="btn btn-danger requestbtn">
                    Disapprove
                  </button>
                </td>
              </tr>
              ​
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="selectAll"
                    className="checkbox-round mr-2"
                  ></input>
                  <img
                    src="/assets/images/pic.png"
                    className="header-brand-img login-logo"
                  />
                  Amalitech Services
                </td>
                <td>0575679860</td>
                <td>Sekondi</td>
                <td align="center">
                  <button className="btn btn-success mr-2 requestbtn">
                    Approve
                  </button>
                  <button className="btn btn-danger requestbtn">
                    Disapprove
                  </button>
                </td>
              </tr>
              ​
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="selectAll"
                    className="checkbox-round mr-2"
                  ></input>
                  <img
                    src="/assets/images/pic.png"
                    className="header-brand-img login-logo"
                  />
                  Bagels LTD
                </td>
                <td>0508739843</td>
                <td>Daboase</td>
                <td align="center">
                  <button className="btn btn-success mr-2 requestbtn">
                    Approve
                  </button>
                  <button className="btn btn-danger requestbtn">
                    Disapprove
                  </button>
                </td>
              </tr>
              ​
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="selectAll"
                    className="checkbox-round mr-2"
                  ></input>
                  <img
                    src="/assets/images/pic.png"
                    className="header-brand-img login-logo"
                  />
                  Dennis Bran
                </td>
                <td>050001234</td>
                <td>Anaji</td>
                <td align="center">
                  <button className="btn btn-success mr-2 requestbtn">
                    Approve
                  </button>
                  <button className="btn btn-danger requestbtn">
                    Disapprove
                  </button>
                </td>
              </tr>
              ​
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="selectAll"
                    className="checkbox-round mr-2"
                  ></input>
                  <img
                    src="/assets/images/pic.png"
                    className="header-brand-img login-logo"
                  />
                  Fiby & Moby Ent
                </td>
                <td>0549847321</td>
                <td>Anaji</td>
                <td align="center">
                  <button className="btn btn-success mr-2 requestbtn">
                    Approve
                  </button>
                  <button className="btn btn-danger requestbtn">
                    Disapprove
                  </button>
                </td>
              </tr>
              ​
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="selectAll"
                    className="checkbox-round mr-2"
                  ></input>
                  <img
                    src="/assets/images/pic.png"
                    className="header-brand-img login-logo"
                  />
                  Planet Hub
                </td>
                <td>050001234</td>
                <td>Anaji</td>
                <td align="center">
                  <button className="btn btn-success mr-2 requestbtn">
                    Approve
                  </button>
                  <button className="btn btn-danger requestbtn">
                    Disapprove
                  </button>
                </td>
              </tr>
              ​
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="selectAll"
                    className="checkbox-round mr-2"
                  ></input>
                  <img
                    src="/assets/images/pic.png"
                    className="header-brand-img login-logo"
                  />
                  AB Jones Ent{" "}
                </td>
                <td>050001234</td>
                <td>Anaji</td>
                <td align="center">
                  <button className="btn btn-success mr-2 requestbtn">
                    Approve
                  </button>
                  <button className="btn btn-danger requestbtn">
                    Disapprove
                  </button>
                </td>
              </tr>
              ​
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="selectAll"
                    className="checkbox-round mr-2"
                  ></input>
                  <img
                    src="/assets/images/pic.png"
                    className="header-brand-img login-logo"
                  />
                  Abdul Salam
                </td>
                <td>**********</td>
                <td>Lagos Town</td>
                <td align="center">
                  <button className="btn btn-success mr-2 requestbtn">
                    Approve
                  </button>
                  <button className="btn btn-danger requestbtn">
                    Disapprove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          ​
          <div
            className="row"
            style={{ margin: "10px", background: "#ffffff" }}
          ></div>
        </div>
      </div>
    </MainLayout>
  );
}

