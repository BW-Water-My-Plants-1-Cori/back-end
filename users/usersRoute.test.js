const supertest = require("supertest");
const server = require("../auth/server");
const db = require("../knexconfig");

describe("index route", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should return an OK status code from the index route", async () => {
    const expectedStatusCode = 200;

    const response = await supertest(server).get("/");

    expect(response.status).toEqual(expectedStatusCode);
  });

  it("should return a JSON object from the index route", async () => {
    const expectedBody = { api: "Up" };

    const response = await supertest(server).get("/");

    expect(response.body).toEqual(expectedBody);
  });
});

describe("GET /user/:id", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("returns a user by id", async () => {
    await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass", email: "email@email.com" });

    const newUsers = await supertest(server).get("/users/1");

    expect(newUsers.status).toBe(200);
  });

  it("returns 200 if user", async () => {
    await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass", email: "email@email.com" });

    const newUsers = await supertest(server).get("/users/1");

    expect(newUsers.status).toBe(200);
  });

  it("returns 404 if no user", async () => {
    const newUsers = await supertest(server).get("/users/1");

    expect(newUsers.status).toBe(404);
  });
});

describe("PUT /users/:id", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("returns 404 if no user", async () => {
    const newUsers = await supertest(server).put("/users/1");

    expect(newUsers.status).toBe(404);
  });

  it("returns 200 if user", async () => {
    await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass", email: "email@email.com" });

    const newUsers = await supertest(server)
      .put("/users/1")
      .send({ username: "bob", password: "pass", email: "email@email.com" });

    expect(newUsers.status).toBe(200);
  });

  it("returns changed information", async () => {
    await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass", email: "email@email.com" });

    const newUsers = await supertest(server)
      .put("/users/1")
      .send({ username: "bob", password: "pass", email: "email@email.com" });

    expect(newUsers.status).toBe(200);
  });

  it("returns 400 when requrest is bad", async () => {
    await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass", email: "email@email.com" });

    const newUsers = await supertest(server)
      .put("/users/1")
      .send({ username: "bob", email: 5 });

    expect(newUsers.status).toBe(400);
  });
  describe("DELETE /user/:id", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
  
    it("returns 204 if user deleted", async () => {
      await supertest(server)
        .post("/register")
        .send({ username: "sam", password: "pass", email: "email@email.com" });
  
      const newUsers = await supertest(server).delete("/users/1");
  
      expect(newUsers.status).toBe(204);
    });
  
    it("returns 404 if no user", async () => {
      const newUsers = await supertest(server).delete("/users/1");
  
      expect(newUsers.status).toBe(404);
    });
  });
});
