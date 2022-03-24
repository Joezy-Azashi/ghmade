import { JobPortal, Auth } from "../lib/endpoints";

let job_api;

const jobtypes = {
  FT: "Full-Time",
  PT: "Part-Time",
  CT: "Contract",
  DJ: "Daily Job",
};
// let cat = [
//   { key: "5137", title: "Software" },
//   { key: "06c6", title: "Health" },
//   { key: "2c44", title: "Agriculture" },
//   { key: "1ae2", title: "Engineering" },
//   { key: "a422", title: "Agric" },
//   { key: "5996", title: "Food" },
//   { key: "92d2", title: "Office" },
//   { key: "c260", title: "Hie" },
//   { key: "a25e", title: "Add" },
//   { key: "599a", title: "Test" },
// ];

let cat;

describe("test for adding/posting a job", () => {
  beforeAll(async () => {
    const auth = new Auth();
    job_api = new JobPortal();
    const ls = await auth.login("ogembodenis2016@gmail.com", "@Dennis2020");
    if (ls.user) {
      window.localStorage.setItem("cp-a", JSON.stringify(ls));
    }
  });

  test("get job categories", async () => {
    const rs = await job_api.getcategory();
    cat = rs;
    expect(rs.length).toBeGreaterThan(1);
  });

  test("adding job", async () => {
    job_api = new JobPortal();
    const job = {
      title: "Unit test job 2",
      category: cat[1].key,
      expiry_date: "2020-11-3",
      type: "FT",
      description: "Da job post",
      salary_from: 10.43,
      salary_to: 34.45,
      location: "anaji",
    };
    const result = await job_api.postjob(job);
    expect(result.key).toBeDefined();
  });
});
