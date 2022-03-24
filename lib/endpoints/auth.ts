import ufetch from "../ufetch";
import axios from "axios";

export class Auth {
  async signup(params: any) {
    const query_params = new URLSearchParams(params as any).toString();
    return await ufetch("/register", {
      method: "POST",
      body: query_params,
    });
  }

  async confirmaccount(integer_key: number) {
    try {
      const rs = await axios.post(process.env.URL + "/auth/keyinput/", {
        integer_key,
      });

      return rs;
    } catch (e) {
      // console.log("error,", e);
    }
  }

  async login(authentication_property: string, password: string) {
    let urlencoded = new URLSearchParams();
    urlencoded.append("authentication_property", authentication_property);
    urlencoded.append("password", password);
    let requestOptions: any = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: urlencoded,
      redirect: "follow",
    };
    const rs = await ufetch(`/auth/token/`, requestOptions);
    return rs;
  }

  async verifyemail(authentication_property) {
    return await ufetch("/auth/create-key/", {
      method: "POST",
      body: JSON.stringify({
        authentication_property: authentication_property,
        access_type: "pw",
      }),
    });
  }

  async forgotpassword(authentication_property: string) {
    const data = new URLSearchParams(authentication_property).toString();
    return await ufetch("/auth/password-forgotten", {
      method: "POST",
      body: data,
    });
  }

  // reset-password
  async resetPassword(password: string) {
    let ta: any = window.localStorage.getItem("ta");
    try {
      ta = JSON.parse(ta);
    } catch (e) {}
    const fd = new FormData();
    fd.append("password", password);
    return await fetch(process.env.URL + "/auth/reset-password/", {
      method: "PUT",
      body: JSON.stringify({ password }),
      headers: {
        Authorization: `Bearer ${ta.ta.data.access}`,
        "Content-Type": "application/json",
      },
    });
  }
  //auth/change-profile/
  //verifypassword
  async verifyPassword(password: string) {
    const result = await ufetch();
  }
  ///auth/ch'ange-password/
  async changePassword(
    password: string,
    new_password: string,
    confirm_password: string
  ) {
    return await ufetch("/auth/change-password/", {
      method: "PUT",
      body: JSON.stringify({
        password,
        new_password,
        confirm_password,
      }),
    });
  }
  async changeEmail(email: string, password: string) {
    const result = await ufetch("/auth/change-profile/", {
      method: "PUT",
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  async updateUserProfile(userData: any) {
    const data = new URLSearchParams(userData).toString();
    return await ufetch("accounts/update", {
      method: "PUT",
      body: data,
    });
  }

  protected async generic_query(ctx: any) {
    return await ufetch(`/${ctx.endpoint}/${ctx.query_params}`, {
      method: ctx.method,
      ...ctx.options,
    });
  }
}
