import { Job, Auth } from "../lib/endpoints";

//Testing create job endpoint
describe("Testing the job endpoints", () => {
  let job_api;

  beforeAll(async () => {
    job_api = new Job();
    const login_result = await new Auth().login(
      "superuser@mail.com",
      "Hello1234!"
    );
    window.localStorage.setItem("cp-a", JSON.stringify(login_result));
  });

  test("Testing the create job category shouldn't fail", async () => {
    const categ = "MotherLand";
    const res = await job_api.createJobCategory({ title: categ });
    // console.log("Expected Grea", res);
    expect(res).toBeDefined();
    expect(res.key).toBeDefined();
    expect(res.title).toBe("MotherLand");
  });

  test("Testing the job category update should replace previous", async () => {
    const res = await job_api.updateJobCategory(2343, "Health");
    expect(res.title).toBe("Health");
  });

  test("Testing the job category deletion should work", async () => {
    let key = "d61a";
    const res = await job_api.deleteJobCategory(key);
    const finalItems = res.length;
    expect(finalItems).toBe(12);
  });

  test("Testing the total number of category items /If there is Health in job category list", async () => {
    const res = await job_api.getJobCategoryForStaff();
    const finalItems = res.length;
    const dataTest = res[0].title;
    expect(finalItems).toBe(11);
    expect(dataTest).toContain("Software");
    expect(res[0]).toHaveProperty("key", "5137");
  });
});

//Testing Functions for Add Category
