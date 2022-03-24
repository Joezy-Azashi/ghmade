import ufetch from "../ufetch";
import axios from "axios";

export class Partnership {
  async addrequest(params: any) {
    //Post partnership
    const query_params = new URLSearchParams(params as any).toString();
    return await ufetch("/partnership/list-create", {
      method: "POST",
      body: JSON.stringify(params),
    });
  }


  async listPartnershipforBusiness(page) {
    if(parseInt(page) <= 1){
      return await ufetch("/partnership/list-create");
    }else {
      return await ufetch("/partnership/list-create?page=" + page,);
    }
  }
  
  async getPartnershipDetail(partnershipid: string) {
    return await ufetch(`/partnership/detailed/${partnershipid}`);
  }

  //get partnerships for business page
  async getBusinessPagepartnership(id){
    return await ufetch (`/ghmade.com/business_web/partnership/${id}`,{
      method: "GET"
    })
  }

  async deletePartnership(partnershipid: string) {
    return await ufetch(`/partnership/update-delete/${partnershipid}`, {
      method: "DELETE",
    });
  }

  // Update Partnership
  async updatePartnership(partnershipdata: any, partnershipid: string) {
    return await ufetch(`/partnership/update-delete/${partnershipid}`, {
      method: "PUT",
      body: JSON.stringify(partnershipdata),
    });
  }

  async listPartnerships(page) {
    if(parseInt(page) <= 1){
      return await ufetch("/partnership/filter", {
        method: "GET"
      });
    }else{
      return await ufetch("/partnership/filter?page=" + page, {
        method: "GET"
      });
    }
 
  }

  async partnershipDetails(id) {
    return await ufetch(`/partnership/detailed/${id}`, {
      method: "GET"
    })
  }

  async filterPartnerships(
      filters = {
        business__city: "",
        search: "",
        type: "",
        industry: "",         
    }
  ) {
    return await ufetch(`/partnership/filter?search=${filters.search}&business__city=${filters.business__city}&industry=${filters.industry}&type=${filters.type}`, {
      method: "GET"
    })
  }
  
}