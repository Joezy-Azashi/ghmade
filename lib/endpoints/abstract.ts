import ufetch from "../ufetch";

export default abstract class AbstractLayer {
  endpoint: any;
  actions: any;
  constructor(endpoint: any, actions: any) {
    this.endpoint = endpoint;
    this.actions = actions;
  }

  async get(id: string) {
    return await ufetch(`/${this.endpoint}/${this.actions["get"]}/${id}`);
  }

  async find(args = "", options = {}) {
    if (args)
      return await ufetch(
        `/${this.endpoint}/${this.actions["find"]}?${args}`,
        options
      );

    return await ufetch(`/${this.endpoint}/${this.actions["find"]}`, options);
  }

  async delete(id: string) {
    return await ufetch(`/${this.endpoint}/${this.actions["delete"]}/${id}`, {
      method: "DELETE",
    });
  }

  protected async generic_query(ctx: any) {
    return await ufetch(`/${this.endpoint}/${ctx.query_params}`, {
      method: ctx.method,
      ...ctx.options,
    });
  }

  async testPost(params: any) {
    const query_params = new URLSearchParams(params).toString();
    return await ufetch(`/${this.endpoint}/assign`, {
      method: "POST",
      body: query_params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
}
