const supertest = require("supertest");
const app = require("../../app");
const { User } = require("../../database/models");
const { isTokenValid } = require("../../helpers");

const api = supertest(app);

const testUser = {
  firstName: "test",
  lastName: "user",
  email: "email@test.com",
  phone: "1234567890",
  password: "123456",
};

let token = null;

beforeAll(async () => {
  await api.post("/api/v1/auth/register").send(testUser);
  const { body } = await api
    .post("/api/v1/auth/login")
    .send({ email: testUser.email, password: testUser.password });

  token = body.body;
});

afterAll(async () => {
  await User.destroy({ where: { email: testUser.email }, force: true });
  User.sequelize.close();
});

describe("User routes", () => {
  it("should return an error if there is no token or the token is invalid", async () => {
    const tokens = ["", "Bearer invalidToken"];
    const errorResponses = [
      "No hay un token presente",
      "El token no es valido",
    ];

    for (let i = 0; i < tokens.length; i++) {
      const { body, status } = await api
        .get("/api/v1/user/")
        .set({ Authorization: tokens[i] });

      expect(body.error).toContain(errorResponses[i]);
      expect(status).toBe(401);
    }
  });

  describe("POST /user/showMe", () => {
    it("should show the active user info from jwt token", async () => {
      const { body, status } = await api
        .get("/api/v1/user/showMe")
        .set({ Authorization: `Bearer ${token}` });

      const { firstName, lastName, email } = body.body;

      expect(firstName).toEqual(testUser.firstName);
      expect(lastName).toEqual(testUser.lastName);
      expect(email).toEqual(testUser.email);
      expect(status).toBe(200);
    });

    it("should not return the user password", async () => {
      const { body, status } = await api
        .get("/api/v1/user/showMe")
        .set({ Authorization: `Bearer ${token}` });

      expect(body.body.password).toBeFalsy();
      expect(status).toBe(200);
    });

    it("should return error if token is invalid", async () => {
      const { body, status } = await api
        .get("/api/v1/user/showMe")
        .set({ Authorization: "Bearer invalidToken" });

      expect(body.error).toBe("El token no es valido");
      expect(status).toBe(401);
    });

    it("should return error if there is no token", async () => {
      const { body, status } = await api
        .get("/api/v1/user/showMe")
        .set({ Authorization: "" });

      expect(body.error).toBe("No hay un token presente");
      expect(status).toBe(401);
    });
  });

  describe("GET /user - all users", () => {
    it("should get a json response", async () => {
      console.log(token);
      const { body, status } = await api
        .get("/api/v1/user")
        .set({ Authorization: `Bearer ${token}` })
        .expect("Content-Type", /application\/json/);

      console.log(body);
      //   expect(body.count).not.toBe(0);
      expect(status).toBe(200);
    });

    it("should return an Array of users", async () => {
      const { body, status } = await api
        .get("/api/v1/user")
        .set({ Authorization: `Bearer ${token}` });

      expect(body.body.rows).toBeInstanceOf(Array);
      expect(status).toBe(200);
    });
  });

  describe("GET /user/:id", () => {
    it("should get the correct user info", async () => {
      const { id } = isTokenValid(token);
      const { body, status } = await api
        .get(`/api/v1/user/${id}`)
        .set({ Authorization: `Bearer ${token}` });

      const { firstName, lastName, email } = body.body;

      expect(firstName).toEqual(testUser.firstName);
      expect(lastName).toEqual(testUser.lastName);
      expect(email).toEqual(testUser.email);
      expect(status).toBe(200);
    });

    it("should return an error if the id is not valid", async () => {
      const id = "11111111-1111-1111-1111-111111111111";
      const { body, status } = await api
        .get(`/api/v1/user/${id}`)
        .set({ Authorization: `Bearer ${token}` });

      expect(body.error).toBe("No se encontro ningun usuario con ese Id");
      expect(status).toBe(404);
    });
  });
});
