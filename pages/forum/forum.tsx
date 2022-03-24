import React from "react";
import ForumPost from "../../components/Forum/ForumPost";
import ForumPostModal from "../../components/ForumPostModal";
import Forumsidenav from "../../components/Forumsidenav";
import MainLayout from "../../components/MainLayout";
import { useEffect, useState, useContext } from "react";
import { Forum } from "../../lib/endpoints/forum";
import { Users } from "../../lib/endpoints/users";
import ForumNotSignin from "../../components/Forum/ForumNotSignin";
import { Store } from "../../contextStore";
import ScrollToTop from "react-scroll-to-top";
import { PropagateLoader } from "react-spinners";

function ForumComponent() {
  const { state, dispatch } = useContext(Store);
  const [profileData, setProfileData] = useState<any>({});
  const [profileBusData, setProfileBusData] = useState<any>({});

  const [allcategories, setAllCategories] = useState<any>([]);
  const [allposts, setAllPosts] = useState<any>([]);
  const [selectedCategories, setselectedCategories] = useState<any>([]);
  const [subscriptions, setSubscriptions] = useState<any>([]);
  const [filters, setFilters] = useState({
    title: "",
    categories_id: "",
    body: ""
  });
  const [pageReady, setPageReady] = useState(false);

  const [isLoggedin, setIsloggedin] = useState<boolean>();
  const [profile, setProfile] = useState();
  const [cpa, setCpa] = useState(false);
  const [IsMyPost, setIsMyPost] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [edit, setEdit] = useState(false);
  const [allpostcolor, setAllPostColor] = useState("#3F3D56");
  const [mypostcolor, setMyPostColor] = useState("#3F3D56");
  //  #1B98E0


  //Check whether user is logged in
  useEffect(() => {
    let uprofile = window.localStorage.getItem("cp-a");

    if (uprofile) {
      setCpa(true);
    }

    //let key = window.localStorage.getItem("cart_id");
    //setJobid(key);
    let userprofile: any = JSON.parse(
      window.localStorage.getItem("user-profile")
    );
    setProfile(userprofile);
    let lStorage: any = window.localStorage.getItem("cp-a");
    lStorage = JSON.parse(lStorage);
    if (lStorage) {
      setIsloggedin(true);
    } else {
      setIsloggedin(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      let tempprofile = JSON.parse(window.localStorage.getItem("cp-a")).user
      if (tempprofile.is_organization === false) {
        const rs = await new Users().getUserProfile();
        setProfileData(rs);       
      } else if (tempprofile.is_organization === true) {
        const rs = await new Users().getBusinessProfile();
        setProfileBusData(rs);
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      const categories: any = await new Forum().getForumCategories();
      setAllCategories(categories.results);
      setPageReady(true);

    })()
  }, []);

  useEffect(() => {
    (async () => {
      const categories: any = await new Forum().getUserSubscriptions();
      const subscriptions = categories.results ? categories.results[0].categories : null;

      let usersubs = []

      let selcatsQry = subscriptions && subscriptions.length > 0 ? subscriptions.map(function (subs) {
        usersubs.push(subs.key);
        return 'categories=' + subs.key;
      }).join('&') : "";

      setselectedCategories(usersubs);
      setSubscriptions(usersubs);

      filters.categories_id = selcatsQry;
      setFilters(filters);
      const posts: any = await new Forum().getFilteredPosts(filters);
      setAllPosts(posts.results);

      dispatch({
        type: "UPDATE_FORUM_POSTS",
        payload: posts.results,
      });

    })();
  }, []);


  const filterPost = async (event: any) => {
    let selcats = selectedCategories;
    if (event.target.checked) {
      selcats.push(event.target.value);
    } else {
      selcats = selcats.filter(item => item != event.target.value);
    }
    setselectedCategories(selcats);

    if (selcats.length < 1) {

      // allcategories.map((item:any) => selcats.push(item.key));
      getAllPosts();

    }
    else {
      var selcatsQry = selcats.map(function (category) {
        return 'categories=' + category;
      }).join('&');

      filters.categories_id = selcatsQry;
      setFilters(filters);

      const posts: any = await new Forum().getFilteredPosts(filters);
      setAllPosts(posts.results);
      setPageReady(true);
      dispatch({
        type: "UPDATE_FORUM_POSTS",
        payload: posts.results,
      });

    }

  }

  const userSubscribedPosts = async () => {
    let selcatsQry = subscriptions.map(function (category) {
      return 'categories=' + category;
    }).join('&');

    filters.categories_id = selcatsQry;
    setFilters(filters);

    const posts: any = await new Forum().getFilteredPosts(filters);
    setAllPosts(posts.results);
    dispatch({
      type: "UPDATE_FORUM_POSTS",
      payload: posts.results,
    });
  }

  const getAllPosts = async () => {
    filters.categories_id = "";
    setFilters(filters);
    const posts: any = await new Forum().getFilteredPosts(filters);
    setAllPosts(posts.results);
    dispatch({
      type: "UPDATE_FORUM_POSTS",
      payload: posts.results,
    });
    setIsMyPost(false);
    setAllPostColor("#1B98E0")
    setMyPostColor("#3F3D56");
  }

  const getUserPosts = async () => {
    //function to get user specific posts
    const posts: any = await new Forum().getForumPosts();
    const onlyposts = posts.results.filter((item: any) => item.parent == null);
    setAllPosts(onlyposts);
    dispatch({
      type: "UPDATE_FORUM_POSTS",
      payload: onlyposts,
    });
    setIsMyPost(true);
    setMyPostColor("#1B98E0");
    setAllPostColor("#3F3D56");
  }


  const handleList = (str) => {

  }

  const searchPosts = async (event: any) => {

    let searchval = event.target.value;
    const posts: any = await new Forum().searchForumPosts(searchval);
    dispatch({
      type: "UPDATE_FORUM_POSTS",
      payload: posts.results,
    });

  }

  return (
    <>

      <MainLayout title="Forum Page" pageTitle="Forum Page" >
        <div className="forum-mobilenav">
          <Forumsidenav
            handleList={handleList}
            allcategories={allcategories}
            filterPosts={filterPost}
            selectedcategories={selectedCategories}
            getAllPosts={getAllPosts}
            getUserPosts={getUserPosts}
          />
        </div>

        <div className="row mt-4">
          <div className="col-md-3 left-sidebar">
            <div className="card card-left-partner1">

              <div className="mb-2">
                <p className="partnership-all-post" onClick={getAllPosts} style={{ color: allpostcolor }}>See all post</p>
                {isLoggedin ? (
                  <p className="partnership-all-post" onClick={getUserPosts} style={{ color: mypostcolor }}>My Posts</p>
                ) : ("")}

              </div>

              <div className="partnership-header mb-1">
                <span>Categories</span>
              </div>
              <div className="subscriptions-list">
                {
                  allcategories && allcategories.length > 0 ? allcategories.map((category: any, index: number) => {
                    let checked = selectedCategories.includes(category.key) ? true : false;
                    return (
                      <div className="capitalize-text" key={index}>
                        <input
                          type="checkbox"
                          id={category.key}
                          name="checkbox"
                          className="mr-2"
                          value={category.key}
                          onChange={filterPost}
                          checked={checked}
                        />
                        <label>{category.title}</label>
                      </div>
                    );
                  }) : <p>No subscriptions</p>
                }

              </div>

            </div>

          </div>

          <div className="col-sm-12 col-md-12 col-lg-6 middle-content">

            <div className="inner-addon right-addon search-forum-mobile mb-6 ml-3" style={{ width: "97%" }}>
              <i className="fe fe-search fa-lg" />
              <input
                id="searchforum"
                className="form-control form-rounded"
                type="text"
                placeholder="Search..."
                onChange={searchPosts}
              />
            </div>

            {isLoggedin ? (
              <a
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                <div className="addpost-icon">
                  <i className="fe fe-plus " />
                </div>
                <div className="row card-forum1">

                </div>
                <div className="card card-forum card-hover">
                  <div className="mt-3 d-flex mb-2">
                    {/* <h3>{allposts}</h3> */}
                    <img src={profileData.image ? (profileData.image) : profileBusData.image ? (profileBusData.image) : ("/assets/images/Profile_Icon.png")} className="ml-3 business-image-partnershipDetail" alt="" />
                    <div className="ml-3 mt-3">
                      <div><h5><strong> {profileData?.name ? (profileData.name) : (profileBusData.title)}</strong></h5></div>
                    </div>
                  </div>
                  <p className="ml-4">Share your thoughts with us</p>
                </div>
              </a>
            ) : (
                <a
                  data-toggle="modal"
                  data-target="#forumnotsignin"
                >
                  <div className="addpost-icon">
                    <i className="fe fe-plus " />
                  </div>
                  <div className="row card-forum1">

                  </div>
                  <div className="card card-forum card-hover">
                    <div className="mt-3 d-flex mb-2">
                      {/* <h3>{allposts}</h3> */}
                      <img src={profileData.image ? profileData.image : "/assets/images/Profile_Icon.png"} className="ml-3 business-image-partnershipDetail" alt="" />
                      <div className="ml-3 mt-3">
                        <div><><strong> {profileData?.name ? (profileData.name) : (profileData.title)}</strong></></div>
                      </div>
                    </div>
                    <p className="ml-4">Share your thoughts with us</p>
                  </div>
                </a>
              )}



            <div className="post-content" id="forum-middle">
              <div className="row">
                  {
                    !pageReady  ? (
                      <div className="" style={{ margin: "auto", marginTop: "50px" }}>
                        <PropagateLoader size={30} color="#1b98e0" loading />
                      </div>
                    ) :
                      pageReady && state.posts.length < 0 ? (
                        <div style={{margin: "0 auto"}}>
                            <p id="no-products" className="no-products-found">
                                No posts available currently.
                            </p>
                        </div>
                      ) 
                      : selectedCategories.length > 0 && state.posts.length <= 0 ? (
                            <div style={{margin: "15px auto"}}>
                                <p id="no-products" className="no-products-found">
                                  No posts available under this category.
                                </p>
                            </div>
                      ) : null
                      }
              </div>
              {state.posts && state.posts.length > 0 ? state.posts.map((post: any, index: number) => {
                return <ForumPost
                  key={index}
                  post={post}
                  showBtns={IsMyPost}
                  setAllPosts={setAllPosts}
                  posts={allposts}
                  setCurrentPost={setCurrentPost}
                  setEdit={setEdit}
                />;
              }) : IsMyPost ? (
                <div className="row">
                    <div style={{margin: "0 auto"}}>
                        <p id="no-products" className="no-products-found">
                            No posts available under this category.
                        </p>
                    </div>
                </div>
              ) : (
                null
              )
              }
            </div>

          </div>

          <div className="col-md-3 right-sidebar">

            <div className="mb-6 ">
              <div className="inner-addon right-addon">
                <i className="fe fe-search fa-lg" />
                <input
                  id="searchforum"
                  className="form-control form-rounded"
                  type="text"
                  placeholder="Search..."
                  onChange={searchPosts}
                />
              </div>
            </div>

            <div className="card partnership-quickLinks">
              <div className="partnership-header mb-1">
                <span title="Quick links">Quick Links</span>
              </div>

              <div className="">
                <div className="mt-2"><a target='_blank' href="/termsAndconditions">User Agreement</a></div>
                <div className="mt-2"><a target='_blank' href="/policy">Privacy Policy</a></div>
              </div>
            </div>
          </div>
        </div>
        <ScrollToTop smooth color="#1b98e0" />
      </MainLayout>

      <ForumPostModal
        posts={allposts}
        setAllPosts={setAllPosts}
        allcategories={allcategories}
        post={currentPost}
        edit={edit}
        setEdit={setEdit}
      />
      <ForumNotSignin />

    </>
  );
}


export default ForumComponent;
