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

describe("GET users/:id/plants", () => {
  beforeEach(async () => {
    await db("plants").truncate();
    await db("users").truncate();
  });

  it("returns a plant by id", async () => {
    const user = await supertest(server)
      .post("/register")
      .send({ username: "sam", password: "pass", email: "email@email.com" });

    await supertest(server)
    .post("/login")
    .send({ username: "sam", password: "pass"})

    await supertest(server)
    .post(`/users/${user.body.id}/plants`)
    .send({plant_name: "It's a plant",
    description: "still a plant",
    date_last_watered: "09 03 2020",
    increment: 6,
    species: "Plant"})

    const newUsers = await supertest(server).get(`/users/${user.body.id}/plants`);

    expect(newUsers.status).toBe(200);
  });

  it("returns 404 if no user", async () => {
    const newUsers = await supertest(server).get("/users/500/plants");

    expect(newUsers.status).toBe(404);
  });
});

describe("GET /plants/:id", () => {
    beforeEach(async () => {
      await db("plants").truncate();
      await db("users").truncate();
    });
  
    it("returns a plant by id", async () => {
      await supertest(server)
        .post("/register")
        .send({ username: "sam", password: "pass", email: "email@email.com" });
  
      await supertest(server)
      .post("/login")
      .send({ username: "sam", password: "pass"})
  
      await supertest(server)
      .post(`/users/${user.body.id}/plants`)
      .send({plant_name: "It's a plant",
      description: "still a plant",
      date_last_watered: "09 03 2020",
      increment: 6,
      species: "Plant"})
  
      const newUsers = await supertest(server).get("/plants/:id");
  
      expect(newUsers.status).toBe(200);
    });
  
    it("returns 404 if no plant", async () => {
      const newUsers = await supertest(server).get("/plants/6666666");
  
      expect(newUsers.status).toBe(404);
    });
  });

describe("PUT /users/:id", () => {
  beforeEach(async () => {
    await db("users").truncate();
    await db("plants").truncate();
  });

  it("returns 404 if no plants", async () => {
    const newUsers = await supertest(server).put("/plants/999999");

    expect(newUsers.status).toBe(404);
  });

  it("returns 200 if plant", async () => {
   const user =  await supertest(server)
        .post("/register")
        .send({ username: "sam", password: "pass", email: "email@email.com" });
  
      await supertest(server)
      .post("/login")
      .send({ username: "sam", password: "pass"})
  
      const plant = await supertest(server)
      .post(`/users/${user.body.id}/plants`)
      .send({plant_name: "It's a plant",
      description: "still a plant",
      date_last_watered: "09 03 2020",
      increment: 6,
      species: "Plant"})

      const newUsers = await supertest(server).get(`/plants/${plant.body.id}`)

    expect(newUsers.status).toBe(200);
  });

  it("returns changed information", async () => {
   const user = await supertest(server)
        .post("/register")
        .send({ username: "sam", password: "pass", email: "email@email.com" });
  
      await supertest(server)
      .post("/login")
      .send({ username: "sam", password: "pass"})
  
      const plant = await supertest(server)
      .post(`/users/${user.body.id}/plants`)
      .send({plant_name: "It's a plant",
      description: "still a plant",
      date_last_watered: "09 03 2020",
      increment: 6,
      species: "Plant"})

    const newUsers = await supertest(server)
      .put(`/plants/${plant.body.id}`)
      .send({ plant_name: "NOT A PLANT! MISTAKE!" });

    expect(newUsers.status).toBe(200);
  });

  it("returns 400 when requrest is bad", async () => {
    const user = await supertest(server)
        .post("/register")
        .send({ username: "sam", password: "pass", email: "email@email.com" });
  
      await supertest(server)
      .post("/login")
      .send({ username: "sam", password: "pass"})
  
      await supertest(server)
      .post(`/users/${user.body.id}plants`)
      .send({plant_name: "It's a plant",
      description: "still a plant",
      date_last_watered: "09 03 2020",
      increment: 6,
      species: "Plant"})

    const newUsers = await supertest(server)
      .put("/plants/1")
      .send({ description: 7890987656789 });

    expect(newUsers.status).toBe(400);
  });
  describe("DELETE /plants/:id", () => {
    beforeEach(async () => {
      await db("users").truncate();
      await db("plants").truncate();
    });
  
    it("returns 204 if plant deleted", async () => {
      const user =   await supertest(server)
        .post("/register")
        .send({ username: "sam", password: "pass", email: "email@email.com" });
  
      await supertest(server)
      .post("/login")
      .send({ username: "sam", password: "pass"})
  
     const plant =  await supertest(server)
      .post(`/users/${user.body.id}/plants`)
      .send({plant_name: "It's a plant",
      description: "still a plant",
      date_last_watered: "09 03 2020",
      increment: 6,
      species: "Plant"})
  
      const newUsers = await supertest(server).delete(`/plants/${plant.body.id}`);
  
      expect(newUsers.status).toBe(204);
    });
  
    it("returns 404 if no user", async () => {
      const newUsers = await supertest(server).delete("/plants/599");
  
      expect(newUsers.status).toBe(404);
    });
  });
});
