import ufetch, { refreshToken } from "../ufetch";

export class Products {
  async uplaodImage(formData: any) {
    return await ufetch("/accounts/image_upload/", {
      method: "PUT",
      body: formData,
      redirect: "follow",
    });

    //const file = formData.name;
  }

  //Create Product
  async createProduct(data: any) {
    return await ufetch("/marketplace/create_product/", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "DROP",
      },
    });
  }

  async removeProduct(id) {
    return await ufetch(`/marketplace/delete_product/${id}/`, {
      method: "DELETE",
    });
  }

  async getProducts(page) {
    if (parseInt(page) <= 1) {
      return await ufetch("/marketplace/products/", {
        method: "GET",
      });
    } else {
      return await ufetch("/marketplace/products/?page=" + page, {
        method: "GET",
      });
    }
  }

  async getProductDetails(id) {
    return await ufetch(`/marketplace/products/${id}/`, {
      method: "GET",
    });
  }

  async getFilteredProducts(
    filters = {
      owner__city: "",
      name: "",
      category: "",
      product_type: "",
      min_price: 0,
      max_price: 1000000,
      search: "",
    }
  ) {
    return await ufetch(
      `/marketplace/products/?owner__city=${filters.owner__city}&name=${filters.name}&product_type=${filters.product_type}&category=${filters.category}&min_price=${filters.min_price}&max_price=${filters.max_price}&search=${filters.search}`,
      {
        method: "GET",
      }
    );
  }

  // Get Products and Business info for a particular business for website
  async getBusinessPageproducts(id) {
    return await ufetch(`/ghmade.com/business_web/products/${id}`, {
      method: "GET"
    })
  }

  // Get Products and Business info for a particular business for website using slug
  async getBusinessPageProducts(slug) {
    return await ufetch(`/ghmade.com/business_web/product/${slug}`, {
      method: "GET"
    })
  }

  // get detailed info bout a business for one page website
  async busDetailsForWebsite(slug) {
    return await ufetch(`/ghmade.com/business_web/bus_detail/${slug}`, {
      method: "GET"
    })
  }

  //Update Product
  async updateUserProduct(id: number, data: any) {
    return await ufetch(`/marketplace/update_product/${id}/`, {
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "DROP",
      },
    });
  }

  async getUserProduct(page) {
    //products/signed_in_user
    if (parseInt(page) <= 1) {
      return ufetch("/marketplace/own_products/", {
        method: "GET",
      });
    }
    return ufetch("/marketplace/own_products?page=" + page, {
      method: "GET",
    });
  }

  async adminProductList(page) {
    //products/signed_in_user
    if (parseInt(page) <= 1) {
      return ufetch("/marketplace/products/admin-list/", {
        method: "GET",
      });
    }
    return ufetch("/marketplace/products/admin-list/?page=" + page, {
      method: "GET",
    });
  }

  async getDetailedPendigProducts(id: any) {
    const productid = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    let myHeaders = new Headers();
    const ls: any = JSON.parse(window.localStorage.getItem("cp-a"));
    myHeaders.append("Authorization", "Bearer " + ls.access);
    myHeaders.append("Content-Type", "application/json");
    return ufetch(`/marketplace/products/${productid}/`, {
      method: "GET",
      Accept: "application/json",
    })
  }

  async getDetailedPendingProducts(productid: any) {
    let myHeaders = new Headers();
    const ls: any = JSON.parse(window.localStorage.getItem("cp-a"));
    myHeaders.append("Authorization", "Bearer " + ls.access);
    myHeaders.append("Content-Type", "application/json");
    return await ufetch(`/marketplace/products/admin-update/${productid.pk}/`, {
      method: "PUT",
      body: JSON.stringify({ approval_status: productid.string }),
    });
  }

  protected async generic_query(ctx: any) {
    return await ufetch(`/${ctx.endpoint}/${ctx.query_params}`, {
      method: ctx.method,
      ...ctx.options,
    });
  }
}
