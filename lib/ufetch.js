import fetch from "isomorphic-fetch";

const ufetch = async (endpoint, options = {}) => {
  const api_url = process.env.URL;
  let l_storage = localStorage.getItem("cp-a");
  // const headers = {
  //   "Content-Type": "application/json",
  // };
  const headers = {};

  if (l_storage) {
    l_storage = JSON.parse(l_storage);
    headers["Authorization"] = `Bearer ${l_storage.access}`;
  }

  if (options !== undefined) {
    if (!options.headers) {
      headers["Content-Type"] = "application/json";
    }
    if (options.headers) {
      for (let h in options.headers) {
        // console.log("H", h);
        if (h == "Content-Type" && options.headers["Content-Type"] == "DROP") {
        } else headers[h] = options.headers[h];
      }
    }
  }
  options.headers = headers;
  // console.log("OPTIONS HEADERS", options);

  let results = null;
  let dbugText = null;
  let data = null;

  try {
    results = await fetch(`${api_url}${endpoint}`, options);
    dbugText = await results.text();
    try {
      if (dbugText.includes("Token is invalid or expired")) {
        const refreshed = await refreshToken(api_url, l_storage);
        if (
          refreshed.detail &&
          refreshed.detail.includes("Token is invalid or expired")
        ) {
          window.localStorage.removeItem("cart");
          window.localStorage.removeItem("cp-a");
          window.localStorage.removeItem("user-profile");
          window.localStorage.removeItem("cart_id");
          window.location.href = "/auth/login";
        }
        if (refreshed.access) {
          l_storage.access = refreshed.access;
          window.localStorage.setItem("cp-a", JSON.stringify(l_storage));
          options.headers["Authorization"] = `Bearer ${refreshed.access}`;
          results = await fetch(`${api_url}${endpoint}`, options);
          dbugText = await results.text();
        } else {
          return { error: "Failed to refresh token" };
        }
      }
      data = JSON.parse(dbugText);
    } catch (e) {
      return { error: dbugText };
    }
    if (data.error) {
    }
    return data;
  } catch (e) {
    return { error: e.message };
  }
};

export const refreshToken = async (url, l_storage) => {
  try {
    let response = await fetch(`${url}/auth/token/refresh/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ refresh: l_storage.refresh }),
    });
    let responseData = await response.text();

    return JSON.parse(responseData);
  } catch (e) {
    return { error: e.message };
  }
};
export default ufetch;
