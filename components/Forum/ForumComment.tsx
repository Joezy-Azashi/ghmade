import React, { useEffect, useState } from "react";
import moment from "moment";
import { Users } from "../../lib/endpoints/users";
import { Store } from "../../contextStore";

function ForumComment({ comment, deleteComment, findItem, isLoggedIn }) {
  const [profileId, setProfileId] = useState(null);
  
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const rs = await new Users().getUserProfile();
  //       if (rs.id) {
  //         setProfileId(rs.user.id);
  //       }
  //       const res = await new Users().getBusinessProfile();
  //       if (res.id) {
          
  //         setProfileId(res.user.id);
  //       }
  //     } catch (error) {
        
  //       return
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      let tempprofile = JSON.parse(window.localStorage.getItem("cp-a")).user
      if (tempprofile.is_organization === false) {
        const rs = await new Users().getUserProfile();
        if (rs.id) {
          setProfileId(rs.user.id);
        }      
      } else if (tempprofile.is_organization === true){
        const rs = await new Users().getBusinessProfile();
        if (rs.id) {
          setProfileId(rs.user.id);
        }        
      }
    })();
  }, []);

  return (
    <>
      <div className="row horizontal-line-top"></div>
      <div className="">
        <div className="mt-4 d-flex justify-content-between ">
          <div className=" d-flex mb-2">
            <img
              src={
                comment.owner_image
                  ? `${process.env.URL}` + comment.owner_image
                  : "/assets/images/Profile_Icon.png"
              }
              className="business-image-partnershipDetail"
              alt=""
            />
            <div className="ml-2">
              <strong>
                {comment.owner_name ? comment.owner_name : "No name"}
              </strong>
            </div>
          </div>
          {comment.owner === profileId ? (
            <div className="dropdown ml-2 mt-2">
              <a
                className="nav-link pr-0 leading-none d-flex"
                data-toggle="dropdown"
                href="#"
              >
                <i className="fe fe-more-vertical" />
              </a>
              <div className="dropdown-menu dropdown-menu-right profiledrop">
                <a
                  onClick={() => findItem(comment.key)}
                  className="dropdown-item itemname"
                  href="#forumComment"
                >
                  <i className="dropdown-icon fe fe-edit" />
                  Edit
                </a>
                <a
                  onClick={() => deleteComment(comment.key)}
                  className="dropdown-item itemname"
                  href="#"
                >
                  <i className="dropdown-icon fe fe-trash-2" />
                  Delete
                </a>
              </div>
            </div>
          ) : null}
        </div>

        <div className="text-small-comment">
          {moment(comment.timestamp).format("Do MMM YY, h:mm a")}
        </div>

        <div className="">
          <p className="comment-body">{comment.body}</p>
        </div>
      </div>
    </>
  );
}

export default ForumComment;
