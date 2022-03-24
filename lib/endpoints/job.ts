import ufetch, { refreshToken } from "../ufetch";

export class Job {
  ///////////////// ---------- JOB CATEGORY FOR STAFF USERS BEGINS HERE ---------------######################

  //Create Job Category for Staff
  async createJobCategory(data: any) {
    let myHeaders = new Headers();
    const ls: any = JSON.parse(window.localStorage.getItem("cp-a"));
    myHeaders.append("Authorization", "Bearer " + ls.access);
    myHeaders.append("Content-Type", "application/json");
    return ufetch("/jobportal/category", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  //Update Job Category for Staff
  async updateJobCategory(id: any, data: any) {
    let myHeaders = new Headers();
    const ls: any = JSON.parse(window.localStorage.getItem("cp-a"));
    myHeaders.append("Authorization", "Bearer " + ls.access);
    myHeaders.append("Content-Type", "application/json");
    return ufetch(`/jobportal/update-category/${id}`, {
      method: "PUT",
      Accept: "application/json",
      body: JSON.stringify(data),
    });
  }

  //List of Job Category for Staff User
  async getJobCategoryForStaff() {
    return ufetch("/jobportal/category", {
      method: "GET",
    });
  }

  //get jobs for business page
  async getBusinessPageJob(slug){
    return await ufetch (`/ghmade.com/business_web/job/${slug}`,{
      method: "GET"
    })
  }

  //Delete Job Category for Staff
  async deleteJobCategory(id: any) {
    return await ufetch(`/jobportal/remove-category/${id}`, {
      method: "DELETE",
    });
  }

  ///////////////// ---------- JOB CATEGORY FOR STAFF USERS ENDS HERE ---------------######################

  ///////////////// ---------- JOB LISTING FOR BUSINESSES BEGINS HERE ---------------######################
  //Get Category Detail
  async getCategoryDetails(id: any) {
    return ufetch(`/jobportal/update-category/${id}`, {
      method: "GET",
    });
  }

  //List of Job Category for Staff User
  async getJobCategoryList() {
    return ufetch("/jobportal/category-list", {
      method: "GET",
    });
  }

  //Get Job listings for businesses
  async getJobListing(page) {
    if (parseInt(page) <= 1) {
    return ufetch(`/jobportal/filter-jobs`, {
      method: "GET",
    });
  } else {
    return await ufetch("/jobportal/filter-jobs?page=" + page, {
      method: "GET",
    });
  }
}

  async createJobApplication(data: any) {
    return await ufetch("/jobportal/job_application", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "DROP", //This is to set a check to remove application/json from the header in ufetch
      },
    });
  }

  //Get Filtered Jobs
  async getFilteredJobs(
    filters = {
      title: "",
      key: "",
      category: {
        key: "",
        title: "",
      },
      type: "",
      salary_from: "",
      salary_to: "",
      search: ""
    }
  ) {
    return await ufetch(
      `/jobportal/filter-jobs?category=${filters.category.key}&type=${filters.type}&salary_from=${filters.salary_from}&salary_to=${filters.salary_to}&search=${filters.search}`,
      {
        method: "GET",
      }
    );
  }

  protected async generic_query(ctx: any) {
    return await ufetch(`/${ctx.endpoint}/${ctx.query_params}`, {
      method: ctx.method,
      ...ctx.options,
    });
  }
}

///////////////// ---------- JOB LISTING FOR BUSINESSES ENDS HERE ---------------######################
