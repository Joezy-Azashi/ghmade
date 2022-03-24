import React from "react";
import Link from "../components/Link";
import AllPost from "./Forum/AllPost";
import MostPopularTopic from "./Forum/MostPopularTopic";
import { useEffect, useState } from "react";
import { Forum } from "../lib/endpoints/forum";

const Forumsidenav = ({ handleList, allcategories, filterPosts, selectedcategories, getAllPosts, getUserPosts }) => {

  return (
    <div>
      <div onClick={() => showCloseicon()}>
        <i className="fa fa-chevron-circle-right openiconforum mr-5"
          id="openicon"
          onClick={() => openNav()}
        />
      </div>
      <a onClick={() => closeNav()}>
        <i className="fa fa-chevron-circle-left closebtnforum" id="closeicon" />
      </a>

      <div id="mySidenav" className="forum-sidenav" style={{ color: "black" }}>
        <div className="mt-5 ml-4">
          <h6
            className="partnership-all-post"
            onClick={getAllPosts}
          ><strong>See all post</strong> </h6>
        </div>
        <div className="mt-5 ml-4">
          <h6 className="partnership-all-post" onClick={getUserPosts}>My Posts</h6>
        </div>
        <div className="mt-3 ml-4">
          <h6><strong> Categories</strong></h6>
        </div>
        <div className="mt-3 ml-4 subscriptions-list">
          {
            allcategories && allcategories.length > 0 ? allcategories.map((category: any, index: number) => {
              let checked = selectedcategories.includes(category.key) ? true : false;
              return (
                <div className="capitalize-text" key={index}>
                  <input
                    type="checkbox"
                    id={category.key}
                    name="checkbox"
                    className="mr-2"
                    value={category.key}
                    onChange={filterPosts}
                    checked={checked}
                  />
                  <label>{category.title}</label>
                </div>
              );
            }) : <p>No subscriptions</p>
          }

        </div>

        {/* <div className="mt-6 ml-4">
            <h6><strong> Most Popular Topics</strong></h6>
        </div>

        <div className="mt-3 ml-4">
                      <MostPopularTopic/>
        </div> */}

      </div>
    </div>
  );
};

export default Forumsidenav;


function closeNav() {
  document.getElementById("mySidenav").style.width = "10px";
  document.getElementById("forum-middle").style.marginLeft = "30px";
  document.getElementById("openicon").style.display = "block";
  document.getElementById("closeicon").style.display = "none";
}

function openNav() {
  document.getElementById("mySidenav").style.width = "210px";
  document.getElementById("forum-middle").style.marginLeft = "220px";
  document.getElementById("openicon").style.display = "none";
}

function showCloseicon() {
  var toggle = document.getElementById("closeicon");
  toggle.style.display = toggle.style.display == "block" ? "none" : "block";
}
