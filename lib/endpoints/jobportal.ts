import ufetch from "../ufetch";
import axios from "axios";

export class JobPortal {
  async postjob(params: any) {
    const query_params = new URLSearchParams(params as any).toString();
    return await ufetch("/jobportal/business-job", {
      method: "POST",
      body: JSON.stringify(params),
    });
  }

  async getjobs(page) {
    if(parseInt(page) <= 1){
      return await ufetch("/jobportal/business-job");
    }else {
      return await ufetch("/jobportal/business-job?page=" + page,);
    }
  }
  async getcategory() {
    return await ufetch("/jobportal/category-list");
  }

  async getjobdetail(jobid: string) {
    return await ufetch(`/jobportal/detailed-job/${jobid}`);
  }
  async deletejob(jobid: string) {
    return await ufetch(`/jobportal/update-delete-job/${jobid}`, {
      method: "DELETE",
    });
  }
  async updatejob(jobdata: any, jobid: string) {
    return await ufetch(`/jobportal/update-delete-job/${jobid}`, {
      method: "PUT",
      body: JSON.stringify(jobdata),
    });
  }
}