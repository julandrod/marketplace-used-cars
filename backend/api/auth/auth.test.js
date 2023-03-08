const supertest = require("supertest");
const app = require("../../app");
const { User } = require("../../database/models");

const api = supertest(app);

const testUser = {
  firstName: "test",
  lastName: "user",
  email: "email@test.com",
  phone: "1234567890",
  password: "123456",
};

let token = null;

afterAll(async () => {
  await User.destroy({ where: { email: testUser.email }, force: true });
  User.sequelize.close();
});

describe("Auth routes", () => {
  describe("POST /auth/register", () => {
    it("register a user", async () => {
      await api
        .post("/api/v1/auth/register")
        .send(testUser)
        .expect("Content-Type", /application\/json/)
        .expect(201);
    });

    it("should not register an already register user", async () => {
      await api.post("/api/v1/auth/register").send(testUser).expect(400);
    });
  });

  describe("POST /auth/login", () => {
    it("should login succesfully and return a jwt token", async () => {
      const { body, status } = await api
        .post("/api/v1/auth/login")
        .send({ email: testUser.email, password: testUser.password });

      token = body.body;

      expect(token).toBeTruthy();
      expect(status).toBe(200);
    });

    it("should not login if password is wrong", async () => {
      const { body, status } = await api
        .post("/api/v1/auth/login")
        .send({ email: testUser.email, password: "wrongpass" });

      token = body.body;

      expect(token).toBeFalsy();
      expect(status).toBe(401);
    });

    it("should not login if user is not register and return no jwt token", async () => {
      const { body, status } = await api.post("/api/v1/auth/login").send({
        email: "notRegister@mail.com",
        password: "wrong",
      });

      token = body.body;

      expect(token).toBeFalsy();
      expect(status).toBe(404);
    });
  });
});
