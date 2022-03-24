import ufetch from "../ufetch";
import axios from "axios";

export class Users {
  async signup(params: any) {
    const query_params = new URLSearchParams(params as any).toString();
    return await ufetch("/register", {
      method: "POST",
      body: query_params,
    });
  }

  async changeEmail(userData: any) {
    try {
    //authentication_property: email change for login
    return await ufetch("/auth/change-profile/", {
        method: "PUT",
        body: JSON.stringify(userData),
    }).catch(e => {
      return e;
    })
  } catch (e) {
    return e;

  }
  }

  async changePhone(userData: any) {
    try {
    //authentication_property: phone number for login
    return await ufetch("/auth/change-phone-number/", {
        method: "PUT",
        body: JSON.stringify(userData),
    }).catch(e => {
      return e;
    })
  } catch (e) {
    return e;

  }
  }

  async confirmaccount(integer_key: number) {
    const rs = await axios.post(process.env.URL + "/auth/keyinput/", {
      integer_key,
    });

    return rs;
  }

  async getUserProfile() {
    //accounts/signed_in_user
    return ufetch("/accounts/signed_in_user/", {
      method: "GET",
    });
  }
  async getAdminProfile() {
    return ufetch("/accounts/signed_in_user/", {
      method: "GET",
    });
  }

  async getBusinessProfile() {
    return ufetch("/accounts/self_bus_details/", {
      method: "GET",
    });
  }

  async getProfiles(page) {
    //accounts/signed_in_user
    if(parseInt(page) <= 1){
      return ufetch("/accounts/", {
        method: "GET",
      });
    }else{
      return ufetch("/accounts/?page=" + page, {
        method: "GET",
      });
    }
  
  }

  async getUnregisteredUsersProfile(page) {
    //accounts/signed_in_user
    if(parseInt(page) <= 1) {
      return ufetch("/accounts/list-of-unregisterd-users/", {
        method: "GET",
      });
    }else {
      return ufetch("/accounts/list-of-unregisterd-users/?page=" + page, {
        method: "GET",
      });
    }
  
  }

  async getorganizationalrequest(page){
    if(parseInt(page) <= 1) {
    return ufetch ("/accounts/list-of-unregisterd-users/", {
      method: "GET",
    });
  }else {
    return ufetch("/accounts/list-of-unregisterd-users/?page=" + page, {
      method: "GET",
    });
  }
  }

  async getProfilesForAdmin() {
    //accounts/signed_in_user
    return ufetch("/accounts/profile-list", {
      method: "GET",
    });
  }

  async getIndividualProfilesForAdmin(page) {
    if (parseInt(page) <= 1) {
      return ufetch("/accounts/profile-list", {
        method: "GET",
      });
    } else {
      return ufetch("/accounts/profile-list?page=" + page, {
        method: "GET",
      });
    }
  }
  
  async getIndividualProfilesForAdm() {
   
      return ufetch("/accounts/profile-list", {
        method: "GET",
      });
   
  }

  async getIndividualProfiles(page) {
    if (parseInt(page) <= 1) {
      return ufetch("/accounts/profile-list", {
        method: "GET",
      });
    } else {
      return ufetch("/accounts/profile-list?page=" + page, {
        method: "GET",
      });
    }
  }

  async getOrganizationProfilesForAdmin(page) {
    if (parseInt(page) <= 1) {
      return ufetch("/accounts/general_bus_list/", {
        method: "GET",
      });
    } else {
      return ufetch("/accounts/general_bus_list/?page=" + page, {
        method: "GET",
      });
    }
 
  }

  async getOrganizationProfiles(page) {
    if (parseInt(page) <= 1) {
      return ufetch("/accounts/general_bus_list/", {
        method: "GET",
      });
    } else {
      return ufetch("/accounts/general_bus_list/?page=" + page, {
        method: "GET",
      });
    }
 
  }

  async getFilteredBusList(
    filters = {
      title: "",
      search: ""
    }
  ){
    return await ufetch(`/accounts/general_bus_list/?title=${filters.title}&search=${filters.search}`, {
      method: "GET"
    })
    }
    

  async forgotpassword(authentication_property: string) {
    const data = new URLSearchParams(authentication_property).toString();
    return await ufetch("/auth/password-forgotten", {
      method: "POST",
      body: data,
    });
  }

  // 0721573809

  async getUserAccountDetails(id: number) {
    return ufetch(`/accounts/general_bus_detail/${id}`, {
      method: "GET",
    });
  }
  async updateUserProfile(userData: any) {
    return await ufetch("/accounts/update", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  async uplaodImage(formData: any) {
    return await ufetch("/accounts/image_upload/", {
      method: "PUT",
      body: formData,
      redirect: "follow",
    });
  }

  async resendToken(authentication_property: string) {
    return await ufetch("/auth/create-key/", {
      method: "POST",
      body: JSON.stringify({ authentication_property, access_type: "a" }),
    });
  }

  protected async generic_query(ctx: any) {
    return await ufetch(`/${ctx.endpoint}/${ctx.query_params}`, {
      method: ctx.method,
      ...ctx.options,
    });
  }

  async updateBusinessProfile(userData: any) {
    // console.log("inside update business profile");
    return await ufetch("/accounts/self_bus_update/ ", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  async activateDeactivate(body: any) {
    // console.log("activate body:", body);
    return await ufetch(`/auth/activate_deactivate/${body.pk}/`, {
      method: "PUT",
      // body: JSON.stringify(body.is_active),
      // body.active
      body: JSON.stringify({ is_active: body.active }),
    });
  }

  async activateDeactivateacc(body: any) {
    return await ufetch(`/auth/activate_deactivate/${body.pk}/`, {
      method: "PUT",
      body: JSON.stringify({ is_active: body.active }),
    });
  }
}
