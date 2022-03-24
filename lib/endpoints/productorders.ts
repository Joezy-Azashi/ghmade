import ufetch, { refreshToken } from "../ufetch";

export class ProductOrders {
  orderDummyData = [
    {
      order: {
        uuid: "5260774f",
        timestamp: "2020-10-15T00:11:49.583989Z",
        registered_customer_info_log: {
          id: 2,
          phone_number: "",
          change_date: "2020-10-14T20:53:28.027553Z",
          name: "John Blay",
          first_name: "",
          last_name: "",
        },
        products: [
          {
            id: 1,
            name: "Shoes",
            price: "12.00",
            discount: 0,
            owner: {
              id: 1,
              title: null,
              email: null,
              phone: null,
              website: null,
            },
          },
          {
            id: 2,
            name: "Malt",
            price: "12.00",
            discount: 0,
            owner: {
              id: 1,
              title: null,
              email: null,
              phone: null,
              website: null,
            },
          },
        ],
      },
      status: "o",
      id: 16,
      business_order_item: [
        {
          quantity: 3,
          product_log: {
            name: "Shoes",
            change_date: "2020-10-14T14:42:46.285031Z",
            price: "12.00",
            discount: 0,
            owner: 1,
          },
        },
        {
          quantity: 1,
          product_log: {
            name: "Malt",
            change_date: "2020-10-14T14:59:35.055082Z",
            price: "12.00",
            discount: 0,
            owner: 1,
          },
        },
      ],
    },
    {
      order: {
        uuid: "8f069d4e",
        timestamp: "2020-10-14T17:21:54.957862Z",
        registered_customer_info_log: {
          id: 3,
          phone_number: "",
          change_date: "2020-10-14T17:21:02.379794Z",
          name: "",
          first_name: "",
          last_name: "",
        },
        products: [
          {
            id: 1,
            name: "Shoes",
            price: "12.00",
            discount: 0,
            owner: {
              id: 1,
              title: null,
              email: null,
              phone: null,
              website: null,
            },
          },
          {
            id: 2,
            name: "Malt",
            price: "12.00",
            discount: 0,
            owner: {
              id: 1,
              title: null,
              email: null,
              phone: null,
              website: null,
            },
          },
        ],
      },
      status: "o",
      id: 15,
      business_order_item: [
        {
          quantity: 2,
          product_log: {
            name: "Shoes",
            change_date: "2020-10-14T14:42:46.285031Z",
            price: "12.00",
            discount: 0,
            owner: 1,
          },
        },
        {
          quantity: 2,
          product_log: {
            name: "Malt",
            change_date: "2020-10-14T14:59:35.055082Z",
            price: "12.00",
            discount: 0,
            owner: 1,
          },
        },
      ],
    },
  ];

  async getBusinessOrders(page) {
    if (parseInt(page) <= 1){
      return await ufetch("/marketplace/order/get-business-orders", {
        method: "GET",
      });
    }else{
      return await ufetch("/marketplace/order/get-business-orders?page=" + page, {
        method: "GET",
      });
    }
    }
   

  async createGuest(phone_number) {
    return await ufetch("/marketplace/create_guest", {
      method: "POST",
      body: JSON.stringify({ phone_number }),
    });
  }

  async createOrder(products, guest) {
    return await ufetch("/marketplace/order/set-order", {
      method: "POST",
      body: JSON.stringify({ products, guest }),
    });
  }

  async createCart() {
    return await ufetch("/marketplace/shopping-cart/create", {
      method: "POST",
    });
  }

  async addItem(product, quantity, shopping_cart) {
    return await ufetch("/marketplace/shopping-cart/add-item", {
      method: "POST",
      body: JSON.stringify({ product, quantity, shopping_cart }),
    });
  }

  async removeItem(cart_id: any, product_id: any) {
    return await ufetch(
      `/marketplace/shopping-cart/remove-item/${cart_id}/${product_id}`,
      {
        method: "DELETE",
      }
    );
  }
// /marketplace/order/set-order-by-shopping-cart
  async placeOrderSignIn(shopping_cart) {
    return await ufetch(`/marketplace/order`, {
      method: "POST",
      body: JSON.stringify({ shopping_cart }),
    });
  }

  // /marketplace/order/set-order-by-shopping-cart
  async placeOrderGuest(shopping_cart, guest) {
    return await ufetch(`/marketplace/order`, {
      method: "POST",
      body: JSON.stringify({ shopping_cart, guest }),
    });
  }

  async getItems(id: any) {
    // console.log("get items:",id)
    return await ufetch(`/marketplace/shopping-cart/get/${id}`, {
      method: "GET",
    });
  }

  async getAllorders() {
    return await ufetch("/marketplace/order_logs", {
      method: "GET",
    });
  } 

  async updateQuantity(shopping_cart_key, shopping_cart_item_id, quantity) {
    return await ufetch(
      `/marketplace/shopping-cart/update/${shopping_cart_key}/${shopping_cart_item_id}`,
      {
        method: "PUT",
        body: JSON.stringify({ quantity }),
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
