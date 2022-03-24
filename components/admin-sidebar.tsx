import Link from "../components/Link";

const AdminSidebar = ({ handleList }) => {
  return (
    <div>
      <div onClick={() => showCloseicon()}>
        <i
          className="fa fa-chevron-circle-right openicon mr-5"
          id="openicon"
          onClick={() => openNav()}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      </div>
      <a onClick={() => closeNav()}>
        <i className="fa fa-chevron-circle-left closebtn" id="closeicon" />
      </a>

      <div id="mySidenav" className="sidenav">
        <div className="heading">
          <a href="#dashboard">
            <li>
              <i className="fe fe-grid mr-5"></i>
              Dashboard
            </li>
          </a>
          <br />
          <br />
          {/* <a>
            <li className="mng">
              <b>Management</b>
            </li>
          </a> */}
        </div>

        {/* <div className="sidenavmenu">
          <a href="#analytics">
            <li>
              <i className="fe fe-activity mr-5"></i> Analytics
              <i id="optionicon" className="fe fe-chevron-right mt-1"></i>
            </li>
          </a>
        </div> */}

        <div className="sidenavmenu">
          <a href="#" onClick={() => hideshowuser()}>
            <li>
              <i className="fe fe-user mr-5"></i>
              Users<i id="optionicon" className="fe fe-chevron-right mt-1"></i>
            </li>
          </a>
        </div>
        <ul id="userlist">
          <Link href="/users/individualUsers">
            <a
              onClick={() => {
                handleList("individuals");
              }}
            >
              <li>Individual Users</li>
            </a>
          </Link>
          <Link href="/users/organizationalUsers">
            <a
              onClick={() => {
                handleList("organizations");
              }}
            >
              <li>Organization Users</li>
            </a>
          </Link>

          <Link href="/users/organizationalRequest">
            <a
              onClick={() => {
                // handleListView("inactive");
                handleList("organizationalrequests");
              }}
            >
              <li>Organizational Requests</li>
            </a>
          </Link>
          <Link href="/users/deactivatedAccounts">
            <a
              onClick={() => {
                // handleListView("inactive");
                handleList("deactivated_users");
              }}
            >
              <li>Deactivated Accounts</li>
            </a>
          </Link>
          <Link href="/userList">
            <a
              onClick={() => {
                // handleListView("inactive");
                handleList("deactivated_organizations");
              }}
            >
              <li>Deactivated organizations</li>
            </a>
          </Link>
        </ul>

        <div className="sidenavmenu">
          <a href="#" onClick={() => hideshowmarket()}>
            <li>
              <i className="fe fe-align-left mr-5"></i>
              Marketplace
              <i id="optionicon" className="fe fe-chevron-right mt-1"></i>
            </li>
          </a>
        </div>
        <ul id="marketpostrequest">
          <Link href="/products/marketpostRequest/marketpostRequest">
            <a>
              <li>Market Post Request</li>
            </a>
          </Link>

          <Link href="/products/admin-orders">
            <a>
              <li>Orders</li>
            </a>
          </Link>
        </ul>

        <div className="sidenavmenu">
          <a href="#" onClick={() => hideshowjob()}>
            <li>
              <i className="fe fe-briefcase mr-5"></i>
              Jobs<i id="optionicon" className="fe fe-chevron-right mt-1"></i>
            </li>
          </a>
        </div>
        <ul id="joblist">
          <Link href="/jobs/job_category">
            <a
              onClick={() => {
                handleList("individuals");
              }}
            >
              <li>View job categories</li>
            </a>
          </Link>
        </ul>
        <div className="sidenavmenu">
          <a href="#partnership">
            <li>
              <i className="fe fe-link mr-5"></i>
              Partnership
            </li>
          </a>
        </div>
        <div className="sidenavmenu">
          <a href="#" onClick={() => hideshowforum()}>
            <li>
              <i className="fe fe-message-circle mr-5"></i>
              Forum<i id="optionicon" className="fe fe-chevron-right mt-1"></i>
            </li>
          </a>
        </div>
        <ul id="forumlist">
          <Link href="/forum/forum_category">
            <a>
              <li>View forum categories</li>
            </a>
          </Link>
        </ul>

        <div className="sidenavmenu">
          <a href="#" onClick={() => hideshowBlog()}>
            <li>
              <i className="fe fe-align-left mr-5"></i>
              Blog<i id="optionicon" className="fe fe-chevron-right mt-1"></i>
            </li>
          </a>
        </div>
        <ul id="bloglist">
          <Link href="/blog/admin/adminadd_blogpost">
            <a>
              <li>Add Post</li>
            </a>
          </Link>
          <Link href="/blog/admin/adminviewmyblogpost">
            <a>
              <li>View my post</li>
            </a>
          </Link>
          <Link href="/blog/admin/postRequests">
            <a>
              <li>Blog Post Request</li>
            </a>
          </Link>
        </ul>

        {/* <div className="sidenavmenu">
          <a href="#">
            <li>
              <i className="fe fe-users mr-5"></i>
              Super Users
            </li>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default AdminSidebar;

function closeNav() {
  document.getElementById("mySidenav").style.width = "60px";

  document.getElementById("userlist").style.display = "none";
  document.getElementById("openicon").style.display = "block";
  document.getElementById("closeicon").style.display = "none";
  document.getElementById("marketpostrequest").style.display = "none";
}

function openNav() {
  document.getElementById("mySidenav").style.width = "247px";

  document.getElementById("openicon").style.display = "none";
}

function hideshowuser() {
  var toggle = document.getElementById("userlist");
  toggle.style.display = toggle.style.display == "block" ? "none" : "block";

  var toggle = document.getElementById("joblist");
  toggle.style.display = "none";

  var toggle = document.getElementById("forumlist");
  toggle.style.display = "none";

  var toggle = document.getElementById("bloglist");
  toggle.style.display = "none";

  // var toggle = document.getElementById("marketlist");
  // toggle.style.display = "none";

  var toggle = document.getElementById("marketpostrequest");
  toggle.style.display = "none";

  openNav();
  document.getElementById("closeicon").style.display = "block";
}

function hideshowjob() {
  var toggle = document.getElementById("joblist");
  toggle.style.display = toggle.style.display == "block" ? "none" : "block";

  var toggle = document.getElementById("userlist");
  toggle.style.display = "none";

  var toggle = document.getElementById("forumlist");
  toggle.style.display = "none";

  var toggle = document.getElementById("bloglist");
  toggle.style.display = "none";

  // var toggle = document.getElementById("marketlist");
  // toggle.style.display = "none";

  var toggle = document.getElementById("marketpostrequest");
  toggle.style.display = "none";

  openNav();
  document.getElementById("closeicon").style.display = "block";
}
function hideshowforum() {
  var toggle = document.getElementById("forumlist");
  toggle.style.display = toggle.style.display == "block" ? "none" : "block";

  var toggle = document.getElementById("userlist");
  toggle.style.display = "none";

  var toggle = document.getElementById("joblist");
  toggle.style.display = "none";

  var toggle = document.getElementById("bloglist");
  toggle.style.display = "none";

  // var toggle = document.getElementById("marketlist");
  // toggle.style.display = "none";

  var toggle = document.getElementById("marketpostrequest");
  toggle.style.display = "none";

  openNav();
  document.getElementById("closeicon").style.display = "block";
}

function hideshowBlog() {
  var toggle = document.getElementById("bloglist");
  toggle.style.display = toggle.style.display == "block" ? "none" : "block";

  var toggle = document.getElementById("userlist");
  toggle.style.display = "none";

  var toggle = document.getElementById("joblist");
  toggle.style.display = "none";

  var toggle = document.getElementById("forumlist");
  toggle.style.display = "none";

  // var toggle = document.getElementById("marketlist");
  // toggle.style.display = "none";

  var toggle = document.getElementById("marketpostrequest");
  toggle.style.display = "none";

  openNav();
  document.getElementById("closeicon").style.display = "block";
}

function hideshowmarket() {
  // var toggle = document.getElementById("marketlist");
  // toggle.style.display = toggle.style.display == "block" ? "none" : "block";

  var toggle = document.getElementById("marketpostrequest");
  toggle.style.display = toggle.style.display == "block" ? "none" : "block";

  var toggle = document.getElementById("userlist");
  toggle.style.display = "none";

  var toggle = document.getElementById("joblist");
  toggle.style.display = "none";

  var toggle = document.getElementById("forumlist");
  toggle.style.display = "none";

  var toggle = document.getElementById("bloglist");
  toggle.style.display = "none";

  openNav();
  document.getElementById("closeicon").style.display = "block";
}

function showCloseicon() {
  var toggle = document.getElementById("closeicon");
  toggle.style.display = toggle.style.display == "block" ? "none" : "block";
}
