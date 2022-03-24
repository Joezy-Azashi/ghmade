import { JobPortal, Auth } from "../lib/endpoints";

let job_api;

describe("Test for viewing posted jobs for logged in business user", () => {
  beforeAll(async () => {
    const auth = new Auth();
    job_api = new JobPortal();
    const ls = await auth.login("ogembodenis2016@gmail.com", "@Dennis2020");
    if (ls.user) {
      window.localStorage.setItem("cp-a", JSON.stringify(ls));
    }
  });

  test("List posted jobs by user", async () => {
    job_api = new JobPortal();
    const result = await job_api.getjobs();
    // console.log("LEN", result.length);
    expect(result.length).toBeGreaterThan(0);
  });
});
