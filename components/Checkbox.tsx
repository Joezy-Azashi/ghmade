import Link from "next/link";
import { useState, useEffect } from "react";

const Checkbox = ({
    index,
    list,
    defaultChecked,
    tempprofile,
    uprofile,
    temporgprofile,
    setDeaultchecked,
    setTempprofile,
    setTemporgprofile,
    approve,
    disapprove,
    // setCheckedUsers
}) => {
    const [checkedUsers, setCheckedUsers] = useState([]);
    return (
        <div className="">
            
                <td scope="col" className="text-muted">
                    <div className="form-check">
                        {list !== "inital" ? (
                          <input
                            style={{ zIndex: 10 }}
                            type="checkbox"
                            className="form-check-input"
                            defaultChecked={defaultChecked}
                            onChange={(e) => {
                              if (
                                list === "individuals" ||
                                list === "deactivated_users"
                              ) {
                                const temp = tempprofile.map((tmp, i) => {
                                  if (tmp.user.id === uprofile.user.id) {
                                    tmp.user.is_active = !uprofile.user
                                      .is_active;
                                  }
                                  return tmp;
                                });
                                setTempprofile(temp);
                                setDeaultchecked(false);
                              } else {
                                const temp_org = temporgprofile.map((tmp, i) => {
                                  if (tmp.user.id === uprofile.user.id) {
                                    tmp.user.is_active = !uprofile.user
                                        .is_active;
                                  }
                                  return tmp;
                                });
                                setTemporgprofile(temp_org);
                                setDeaultchecked(false);
                              }
                              setCheckedUsers([
                                ...checkedUsers,
                                uprofile.user.id,
                              ]);
                            }}
                          />
                        ) : null}                        
                    </div>
                </td>
                <td>
                    <div className="dropdown ddmargin d-flex">
                    
                        <span
                        className="avatar avatar-md brround cover-image"
                        data-image-src="/images/blank_avatar.jpeg"
                        ></span>

                        <img
                        src={
                            uprofile.image
                            ? uprofile.image
                            : "/assets/images/Profile_Icon.png"
                        }
                        className="brround ddimg"
                        alt=""
                        />
                        <a
                        style={{padding: "0px"}}
                        className="nav-link"
                        // data-toggle="dropdown"
                        // onClick={() => getUserDetails(uprofile.id)}
                        >
                        <span
                        className="ml-5 column-color"
                        id="memberid"
                        style={{ marginLeft: 23 }}
                        >
                        {uprofile.name && uprofile.name !== null
                            ? uprofile.name
                            : uprofile.title && uprofile.title !== ""
                            ? uprofile.title
                            : "No name"}
                        </span>
                        </a>
                    </div>{" "}
            </td>  
            
 {list !== "organizationalrequests" ? (
                      <>
                        <td>
                          <p className="mt-2">{uprofile.user.email}</p>
                        </td>
                      </>
                    ) : null}

                    <td>
                      <p className="mt-2">
                        {uprofile.phone_number && uprofile.phone_number !== ""
                          ? uprofile.phone_number
                          : uprofile.user.phone_number &&
                            uprofile.user.phone_number !== ""
                          ? uprofile.user.phone_number
                          : "No phone number"}
                      </p>
                    </td>
                    <td>
                      <p className="mt-2">
                        {uprofile.street_address &&
                        uprofile.street_address !== ""
                          ? uprofile.street_address
                          : uprofile.city && uprofile.city !== ""
                          ? uprofile.city
                          : "No town specified"}
                      </p>
                    </td>

                    {list === "organizationalrequests" ? (
                      <>
                        <td
                        >
                          <>
                            {" "}
                            <button
                              style={{ marginTop: 7 }}
                              disabled={uprofile.user.is_active}
                              className="btn btn-success mr-2 requestbtn"
                              onClick={() => {
                                approve(uprofile.user.id);
                                const temp = temporgprofile.map((tmp, i) => {
                                  if (tmp.user.id === uprofile.user.id) {
                                    tmp.user.is_active = !uprofile.user
                                      .is_active;
                                  }
                                  return tmp;
                                });
                                setTemporgprofile(temp);
                              }}
                            >
                              Approve
                            </button>
                            <button
                              style={{ marginTop: 7 }}
                              disabled={!uprofile.user.is_active}
                              className="btn btn-danger mr-2 requestbtn"
                              onClick={() => {
                                disapprove(uprofile.user.id);
                                const temp = temporgprofile.map((tmp, i) => {
                                  if (tmp.user.id === uprofile.user.id) {
                                    tmp.user.is_active = !uprofile.user
                                      .is_active;
                                  }
                                  return tmp;
                                });
                                setTemporgprofile(temp);
                              }}
                            >
                              Disapprove
                            </button>{" "}
                          </>
                        </td>
                      </>
                    ) : null}            
            
            
            
        </div>
    )
}

export default Checkbox