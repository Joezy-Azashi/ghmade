import ufetch from "../ufetch";
import axios from "axios";
export class Blog {

    // Getting All Pending Blog
   async getAllPendingBlog(page){
       if(parseInt(page) <= 1 ) {
        return await ufetch("/blog/all-posts", {
            method: "GET"
           });
       }else {
        return await ufetch("/blog/all-posts?page=" + page, {
            method: "GET"
           }); 
       }
   }

   // Get Blog Posts by Admin
async getAdminBlogList(){
  let myHeaders = new Headers();
  const ls: any = JSON.parse(window.localStorage.getItem("cp-a"));
  myHeaders.append("Authorization", "Bearer " + ls.access);
  myHeaders.append("Content-Type", "application/json");
    return await ufetch("/blog/my-posts", {
      method: "GET"
    });
}

  async getPersonalBlogDetails(blogid) {
    return await ufetch(`/blog/my-posts/${blogid}/`, {
      method: "GET",
    });
  }

  //Get blogs
  async getBlogs(page = "0") {
    if (parseInt(page) <= 1) {
      return ufetch(`/blog/my-posts`, {
        method: "GET",
      });
    } else {
      return await ufetch("/blog/my-posts?page=" + page, {
        method: "GET",
      });
    }
  }

  async updatePersonalBlog(blogid: any, data: any) {
    return await ufetch(`/blog/update-post/${blogid}/`, {
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "DROP",
      },
    });
  }

  async deletePersonalBlog(blogids: any) {
    let promise = [];
    for (let i = 0; i < blogids.length; i++) {
      const pr = ufetch(`/blog/delete-post/${blogids[i]}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "DROP",
      },
    });
    
      //@ts-ignore
      promise.push(pr);
    }
    return Promise.all([...promise]).then((values) => {
      return values;
    });
  }

  async deletePersonalBlogDetails(blogid) {
    // return await ufetch(`/blog/my-posts/${blogid}/`, {
    //   method: "GET",
    // });
  }

  //Get Bog List
  async getBlogListing(page) {
    if (parseInt(page) <= 1) {
      return ufetch(`/blog/posts`, {
        method: "GET",
      });
    } else {
      return await ufetch("/blog/posts?page=" + page, {
        method: "GET",
      });
    }
  }

  //Get Blog Details
  async getBlogDetails(id: any) {
    return ufetch(`/blog/posts/${id}/`, {
      method: "GET",
    });
  }
  
   async getDetailedPendingBlog(id:any){
    const blogid = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    let myHeaders = new Headers();
    const ls: any = JSON.parse(window.localStorage.getItem("cp-a"));
    myHeaders.append("Authorization", "Bearer " + ls.access);
    myHeaders.append("Content-Type", "application/json");
       return ufetch(`/blog/admin-posts/${blogid}/`, {
           method: "GET",
           Accept: "application/json",
       })
   }
   async getFilteredBlog(
    filters = {
      category: "",
    }
  ) {
    return await ufetch(`/blog/posts?category=${filters.category}`, {
      method: "GET",
    });
  }
   async createBlog(data: any) {
    return await ufetch("/blog/create-post", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "DROP",
      },
    });
  }

  // Approve and Rejection of blog posts
  async blogApproveDelete(blogid: any) {
    let myHeaders = new Headers();
    const ls: any = JSON.parse(window.localStorage.getItem("cp-a"));
    myHeaders.append("Authorization", "Bearer " + ls.access);
    myHeaders.append("Content-Type", "application/json");
    return await ufetch(`/blog/approve-reject/${blogid.pk}/`, {
      method: "PUT",
      body: JSON.stringify({ approval_status: blogid.string }),
    });
  }

  protected async generic_query(ctx: any) {
    return await ufetch(`/${ctx.endpoint}/${ctx.query_params}`, {
      method: ctx.method,
      ...ctx.options,
    });
  }
};
