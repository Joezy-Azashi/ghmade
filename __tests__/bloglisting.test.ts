import { Blog } from "../lib/endpoints";

//No Auth is needed for this test

let blog_api;

describe("Test for Listing all posts on blog", () => {
  beforeAll(async () => {
    blog_api = new Blog();
  });

  test("List blog detail", async () => {
    blog_api = new Blog();
    let blogid = 1
    const result = await blog_api.getBlogDetails(blogid);
    expect(result.length).toBeGreaterThan(0);
  });

  test("List blog Listing", async () => {
    blog_api = new Blog();
    const result = await blog_api.getBlogListing;
    expect(result.length).toBeGreaterThan(0);
  });
});