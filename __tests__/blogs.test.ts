import { Blog, Auth } from "../lib/endpoints";

let blog_api;
const CATEGORIES =[
  {GT: 'Grants'},
  {LN: 'Loans'},
  {ET: 'Events'},
  {SP: 'Scholarships'}
]
const STATUS = [
  {0:'Pending Approval'},
  {1:'Approved'},
  {2:'Rejected'}
]

describe("Test blogs", () => {
  beforeAll(async () => {
    const auth = new Auth();
    blog_api = new Blog();
    // const ls = await auth.login("ogembodenis2016@gmail.com", "@Dennis2020");
    const ls = await auth.login("azalia.ashilabe@amalitech.com", "The3big4*");
    if (ls.user) {
      window.localStorage.setItem("cp-a", JSON.stringify(ls));
    }
  });

  test('Add to blog', async () => {
    const result = await blog_api.createBlog({
      title:"Ma second",
      description:"Ma second blog",
      category:"SP",
      phone_number:"021457"
    });
    console.log('Created blog',result);
    expect(result.result).toBeDefined();
  });

  test("List blogs", async () => {
    const result = await blog_api.getBlogs();
    console.log("Result", result);
    expect(result.results.length).toBeGreaterThan(0);
  });


  test("Delete blog with blogid/key", async () => {
    const blogid = ""
    const result = await blog_api.deletePersonalBlogDetails(blogid);
    console.log("Result", result);
    expect(result.results.length).toBeGreaterThan(0);
  });
});
