import ufetch, { refreshToken } from "../ufetch";

export class Forum {

    async getForumCategories() {
    
      return await ufetch("/forum/category", {
        method: "GET",
      });
    }

    async getForumPosts() {
    
        return await ufetch("/forum/my-posts", {
          method: "GET",
        });
      }

      async searchForumPosts(searchval:string) {
    
        return await ufetch(`/forum/filter-post?search=${searchval}`, {
          method: "GET",
        });
      }
    
      async deleteForumPosts(postkey:string) {
        return await ufetch(`/forum/update-delete-post/${postkey}`, {
          method: "DELETE",
        });
      }

    async createPost(data: any) {
      let myHeaders = new Headers();
      const ls: any = JSON.parse(window.localStorage.getItem("cp-a"));
      myHeaders.append("Authorization", "Bearer " + ls.access);
        return await ufetch("/forum/list-create-post", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
    }

    async editPost(data: any, key: string) {
      return await ufetch(`/forum/update-delete-post/${key}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
  }

    async getFilteredPosts(
        filters = {
          title: "",
          categories_id: "",
          body: ""
        }
      ) {
        return await ufetch(
          `/forum/filter-post?title=${filters.title}&${filters.categories_id}&body=${filters.body}`,
          {
            method: "GET",
          }
        );
      }

      async getUserSubscriptions() {
    
        return await ufetch("/forum/follow", {
          method: "GET",
        });
      }

      async votePost(data: any) {
    
        return await ufetch("/forum/vote", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    
      async subscribeCategory(data: any) {
        return await ufetch("/forum/follow/update", {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
    }

    async deleteForumPost(post_key: any){
      return await ufetch(`/forum/update-delete-post/${post_key}`, {
        method: "DELETE"
      })
    }
    
    async deleteForumSub(id: any){
      return await ufetch(`/forum/category/remove/${id}`, {
        method: "DELETE",
      });
    }

    async updateForumPost(post_key: any, data: any) {
      let myHeaders = new Headers();
      const ls: any = JSON.parse(window.localStorage.getItem("cp-a"));
      myHeaders.append("Authorization", "Bearer " + ls.access);
      myHeaders.append("Content-Type", "application/json");
      return ufetch(`/forum/update-delete-post/${post_key}`, {
        method: "PUT",
        Accept: "application/json",
        body: JSON.stringify(data),
      });
    }

    //Update Forum Subscriptions
    async updateForumSubs(key: any, data: any){
      let myHeaders = new Headers();
      const ls: any = JSON.parse(window.localStorage.getItem("cp-a"));
      myHeaders.append("Authorization", "Bearer " + ls.access);
      myHeaders.append("Content-Type", "application/json");
      return ufetch(`/forum/category/update/${key}`, {
        method: "PUT",
        Accept: "application/json",
        body:  JSON.stringify(data),
      })
    }
    
  //Create Forum Subscription for User
  async createForumSub(data: any) {
    let myHeaders = new Headers();
    const ls: any = JSON.parse(window.localStorage.getItem("cp-a"));
    myHeaders.append("Authorization", "Bearer " + ls.access);
    myHeaders.append("Content-Type", "application/json");
    return ufetch("/forum/category/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }



  protected async generic_query(ctx: any) {
    return await ufetch(`/${ctx.endpoint}/${ctx.query_params}`, {
      method: ctx.method,
      ...ctx.options,
    });
  }
}
