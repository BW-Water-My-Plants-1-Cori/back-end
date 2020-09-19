const supertest = require("supertest");
const server = require("./server");
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

describe("POST /register", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("adds a new user to an empty db", async () => {
    const users = await db("users");
    expect(users).toHaveLength(0);

    await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass", email: "email@email.com" });

    const newUsers = await db("users");
    expect(newUsers).toHaveLength(1);
  });

  it("adds multiple users to an empty db", async () => {
    const users = await db("users");
    expect(users).toHaveLength(0);

    await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass", email: "sam@email.com" });
    await supertest(server)
      .post("/register")
      .send({ username: "frodo", password: "pass", email: "frodo@email.com" });
    await supertest(server).post("/register").send({
      username: "gandalf",
      password: "pass",
      email: "gandalf@email.com",
    });

    const newUsers = await db("users");
    expect(newUsers).toHaveLength(3);
  });

  it("returns 201 when user properly added", async () => {
    const users = await db("users");
    expect(users).toHaveLength(0);

    const response = await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass", email: "email@email.com" });

      expect(response.status).toBe(201)
  });

  it("returns 400 when user is not created due to no password", async () => {
    const res = await supertest(server)
      .post("/register")
      .send({ username: "pass", email: "pass@no.com" });

    expect(res.status).toBe(400);
  });

  it("returns 400 when user is not created due to no username", async () => {
    const res = await supertest(server)
      .post("/register")
      .send({ password: "pass", email: "pass@no.com" });

    expect(res.status).toBe(400);
  });

  it("returns 400 when user is not created due to no email", async () => {
    const res = await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass" });

    expect(res.status).toBe(400);
  });
});

describe("POST /login", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("returns 400 if no username", async () => {
    const res = await supertest(server)
      .post("/login")
      .send({ password: "pass" });

    expect(res.status).toBe(400);
  });

  it("returns 400 if no password", async () => {
    const res = await supertest(server)
      .post("/login")
      .send({ username: "pass" });

    expect(res.status).toBe(400);
  });

  it("returns 404 if username doesn't exist", async () => {
    const res = await supertest(server)
      .post("/login")
      .send({ username: "NON EXISTANT", password: "pass" });

    expect(res.status).toBe(404);
  });

  it("returns 200 OK when logging in successfully", async () => {
    await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass" });

    const res = await supertest(server)
      .post("/login")
      .send({ username: "sam", password: "pass" });

    expect(res.status).toBe(200);
  });

  it("returns token when login is sucessful", async () => {
    await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass" });

    const res = await supertest(server)
      .post("/login")
      .send({ username: "sam", password: "pass" });

    expect(res.body.token).not.toBeNull();
  });

  it("returns 401 when password incorrect", async () => {
    await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass" });

    const res = await supertest(server)
      .post("/login")
      .send({ username: "sam", password: "LIES" });

    expect(res.status).toBe(401);
  });
});
