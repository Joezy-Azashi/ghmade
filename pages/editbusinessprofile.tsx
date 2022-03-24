import MainLayout from "../components/MainLayout";
import { Users } from "../lib/endpoints";
import { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import Prompt from "../components/Prompt";
import { Store } from "../contextStore";
import { useRouter } from "next/router";
import moment from "moment";
import { REGIONS, CATEGORY } from "../public/assets/js/customData";

export default function Home() {
  // const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [phone_number, setPhone] = useState("");
  const [region, setRegion] = useState("wr");
  const [category, setCategory] = useState("AB&M");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  // const [image, setImage] = useState("");
  const [email, setEmail] = useState("");

  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [userImage, setImage] = useState("/assets/images/Profile_Icon.png");
  const [tempImage, setTempImage] = useState("");
  const { state, dispatch } = useContext(Store);
  const [doneUpdate, setDoneUpdate] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [shouldUploadImage, setShouldUpalodImage] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [macChar, setMaxChar] = useState("");

  function isValidUrl(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;
    }

    return true;
  }

  const triggerUpload = () => {
    fileRef.current!.click();
  };

  const router = useRouter();

  const handleClose = () => {
    if (doneUpdate) {
      router.push("/businessprofile");
    }
    setShow(false);
  };

  const callPrompt = (
    title: string,
    link: string,
    link_text: string,
    message: string
  ) => {
    setShow(true);
    setPromptTitle(title);
    setLinkText(link_text);
    setLinkTo(link);
    setPromptBody(message);
  };

  const submitData = async () => {
    if ((name && name.length <= 0) || !/^([a-zA-Z0-9 _-]+)$/.test(name)) {
      callPrompt(
        "Edit Profile",
        "",
        "Okay",
        "Invalid character in organization title field"
      );
      return;
    }

    // let phoneno = /^\d{10}$/;
    // if (phone_number && phone_number.length > 0) {
    //   if (!phone_number.match(phoneno) || phone_number.length > 10 || phone_number.length < 10) {
    //     callPrompt("Edit Profile", "", "Close", "Invalid phone number");
    //     return;
    //   }
    // }

    if (!isValidUrl(website) && (website) != "") {
      callPrompt(
        "Edit Profile",
        "",
        "Okay",
        "Invalid URL. Example Format should be (http://domain.com)"
      );
      return;
    }

    if (!name || !category || !region || !city) {
      callPrompt(
        "Check details",
        "",
        "Okay",
        "Title, Category, Region and Town cannot be empty"
      );
      return;
    } else {
      callPrompt("Edit Profile", "", "", "Please wait...");
      const response = await new Users().updateBusinessProfile({
        title: name,
        website: website,
        region: region,
        location: location,
        category: category,
        description: description,
        city: city,
      });
      if (response.error) {
        callPrompt("Edit Profile", "", "Okay", "An error occured");
      }

      if (shouldUploadImage) {
        callPrompt(
          "Edit Profile",
          "",
          "",
          "Profile updated. Uploading image ..."
        );
        const imgresponse: any = await saveImage();
        if (imgresponse.error) {
          callPrompt(
            "Edit Profile",
            "",
            "Okay",
            "An error occured. Failed to update profile picture"
          );
          return;
        }
      }
      //
    }

    dispatch({
      type: "UPDATE_ORGANIZATION_TITLE",
      payload: name,
    });
    dispatch({
      type: "SET_IMAGE",
      payload: userImage,
    });

    let lStorage: any = window.localStorage.getItem("cp-a");
    let upr: any = JSON.parse(window.localStorage.getItem("user-profile"));
    lStorage = JSON.parse(lStorage);
    if (lStorage) {
      upr.title = name;
      upr.image = userImage;
      window.localStorage.setItem("user-profile", JSON.stringify(upr));
      lStorage.username = name;
      lStorage.image = userImage;
      window.localStorage.setItem("cp-a", JSON.stringify(lStorage));
    }
    setDoneUpdate(true);
    callPrompt("Edit Profile", "", "Close", "Success: Business profile saved");
  };

  useEffect(() => {
    (async () => {
      const rs = await new Users().getBusinessProfile();
      try {
        setName(rs.title);
        setCity(rs.city);
        setCategory(rs.category ? rs.category : "AB&M");
        setRegion(rs.region ? rs.region : "wr");
        setLocation(rs.location);
        setWebsite(rs.website);
        setDescription(rs.description);
        setEmail((rs.user.email !== undefined) ? rs.user.email : '');
        setPhone((rs.user.phone_number !== undefined) ? rs.user.phone_number : '');
        if (rs.image) {
          setImage(rs.image);
        }
        setIsReady(true);
      } catch (e) {

      }



    })();
  }, []);

  useEffect(() => { }, [category]);

  const saveImage = async () => {
    const lStorage: any = JSON.parse(window.localStorage.getItem("cp-a"));
    let myHeaders: any = new Headers();
    myHeaders.append("Authorization", "Bearer " + lStorage.access);

    var formdata = new FormData();
    formdata.append("image", tempImage);

    var requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const rs = await fetch(
        process.env.URL + "/accounts/self_bus_update/",
        requestOptions
      );
      return rs;
    } catch (e) {
      return { error: "Failed to updload image" };
    }
  };

  return (
    <>
      <MainLayout>
        <Prompt
          title={prompt_title}
          linkTo={link_to}
          linkText={link_text}
          show={show}
          success={link_to.length > 0 ? true : false}
          handleClose={handleClose}
        >
          <p>{prompt_body}</p>
        </Prompt>
        <div>
          {/* page-header */}
          <div className="page-header">
            <h1 className="page-title row justify-content-center">Edit Information</h1>
          </div>
          {/* End page-header */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileRef}
            onChange={(e: any) => {
              let reader: any = new FileReader();
              const file = e.target.files[0];
              if (file.size > 3145728) {
                callPrompt("Edit Profile", "", "Close", "File size too big");
                return;
              }
              reader.onload = function (event: any) {
                setImage(event.target.result);
                setTempImage(file);
                setShouldUpalodImage(true);
              };
              reader.readAsDataURL(file);
            }}
          />
          <div className="row">
            <div className="col-md-3 userprofileimage">
              <div className="mb-4">
                <div className="profile-pic">
                  <img
                    src={!isReady ? "" : userImage}
                    width={200}
                    height={200}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary profileuploadimgbtn"
                    onClick={triggerUpload}
                  >
                    Upload Image
                      </button>
                </div>

                <div className="mt-4">
                  <p><strong>Note:</strong> To update your email address / phone number please go to your <a href="/auth/account-settings" id="account-setting-edit">account setting</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-xl-9 col-md-12 col-sm-12">
              {/* <div className="card-body editprofile_cardbody"> */}
              <div className="row">
                <div className="col-lg-5 col-md-12">
                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>
                      Organization Title <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-rounded text-field-hover"
                      placeholder="Full name"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontWeight: "bold" }}>
                      Email Address
                    </label>
                    <input
                      type="text"
                      className="form-control form-rounded text-muted"
                      placeholder="your@email.com"
                      readOnly
                      value={email}
                      style={{ backgroundColor: "#f7f7f7" }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontWeight: "bolder" }}>
                      Category <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control select2 form-rounded"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                      value={category}
                    >
                      {CATEGORY.map((r, i) => (
                        <option key={i} value={r[0]}>
                          {r[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label
                      style={{ fontWeight: "bolder" }}
                      htmlFor="form-label"
                    >
                      Description
                      {/* {description.split("h") > 99 ? (
                        <span style={{ fontSize: "0.7rem", color: "red" }}>
                          Maximum allowed charactes is 100. The rest will be
                          truncated
                        </span>
                      ) : (
                        ""
                      )} */}
                    </label>
                    <div className="form-group">
                      <div className="input-group-date">
                        <textarea
                          style={{ resize: "none" }}
                          className="form-control form-rounded destextarea"
                          rows={4}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                          value={description}
                        ></textarea>
                      </div>
                    </div>
                    <div>
                    </div>
                    <h6 style={{ fontSize: "12px" }}>
                      <span style={{ color: "#1B98E0", fontWeight: "bold" }} >Note:</span> Ensure this field has no more than 500 characters
                      </h6>
                  </div>
                </div>

                <div className="col-lg-1"></div>
                <div className="col-lg-5 col-md-12">
                  <div className="form-group">
                    <label style={{ fontWeight: "bolder" }}>Website</label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder="eg. http://yourwebsite.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: "bolder" }}>
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control form-rounded text-muted"
                      placeholder="eg. 020 000 0000"
                      readOnly
                      value={phone_number}
                      min={10}
                      max={10}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ backgroundColor: "#f7f7f7" }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: "bolder" }}>
                      Region <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control select2 form-rounded"
                      onChange={(e) => setRegion(e.target.value)}
                      value={region}
                    >
                      {REGIONS.map((r, i) => (
                        <option key={i} value={r[0]}>
                          {r[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ fontWeight: "bolder" }}>
                      Digital Address
                    </label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder="eg. AK-039-5028"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontWeight: "bolder" }}>
                      Town
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder="eg. Anaji"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col justify-content-center businessProfilebtn d-flex">
                <div>
                  <button
                    className="btn btn-primary btn-block businessProfilesave mb-1 mt-5"

                    onClick={() => submitData()}
                  >
                    Save
                  </button>
                </div>

                <div className="col-md-3">
                  <Link href="/businessprofile">
                    <button
                      className="btn btn-primary btn-block businessProfileCancel mb-1 mt-5"

                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>

              {/* </div> */}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
