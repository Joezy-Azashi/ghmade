import CVUpload from "../components/Job/Modals/CVUpload";
import { Job, Auth } from "../lib/endpoints";

//Testing create job endpoint
describe("Testing the job endpoints", () => {
  let job_api;

  beforeAll(async () => {
    job_api = new Job();
    const login_result = await new Auth().login(
      "ecexpay@gmail.com",
      "Peter@2020"
    );
    window.localStorage.setItem("cp-a", JSON.stringify(login_result));
  });

  test("Testing the create job application shouldn't fail", async () => {
    const categ = "MotherLand";
    const res = await job_api.createJobApplication({ cv: cv, job: job_id });
    // console.log("Expected Grea", res);
    expect(res).toBeDefined();
    expect(res.key).toBeDefined();
    expect(res.title).toBe("MotherLand");
  });
});

//Testing Functions for Add Category
