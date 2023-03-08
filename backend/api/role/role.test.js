const supertest = require("supertest");
const app = require("../../app");
const { Role } = require("../../database/models");

const api = supertest(app);

const testRole = {
  name: "testRole",
  description: "role for test purposes",
};

beforeAll(async () => {
  await Role.destroy({ where: { name: testRole.name }, force: true });
});

afterAll(() => Role.sequelize.close());

describe("Role routes", () => {
  describe("POST /role", () => {
    it("should create a new role", async () => {
      await api
        .post("/api/v1/role")
        .send(testRole)
        .expect("Content-Type", /application\/json/)
        .expect(201);
    });

    it("should not create an already created role", async () => {
      await api.post("/api/v1/role").send(testRole).expect(400);
    });
  });

  describe("GET /role", () => {
    it("should return a json response wiht OK code", async () => {
      await api
        .get("/api/v1/role")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    it("should return a list of roles of type array", async () => {
      const { body, status } = await api.get("/api/v1/role");

      expect(body.body.rows).toBeInstanceOf(Array);
      expect(status).toBe(200);
    });
  });
});
