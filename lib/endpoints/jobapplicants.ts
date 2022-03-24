import ufetch from "../ufetch";
import axios from "axios";

export class Jobapplicants {

  async getapplicants(page) {
    if(parseInt(page) <= 1){
      return await ufetch("/jobportal/applicant/owner-job-list");
    }else{
      return await ufetch("/jobportal/applicant/owner-job-list?page=" + page, );
    }
  }

}