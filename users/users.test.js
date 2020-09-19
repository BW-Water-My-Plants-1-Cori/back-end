const db = require("../knexconfig");

const users = require("./usersModel");
describe("add user", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("adds a user to the database", async () => {
    await users.add({
      username: "Sam",
      password: "plantyplants",
      email: "sam@sam.com",
    });

    let count = await db("users");
    expect(count).toHaveLength(1);
  });

  it("adds multiple users to the database", async () => {
    await users.add({
      username: "Sam",
      password: "plantyplants",
      email: "sam@sam.com",
    });
    await users.add({
      username: "Frodo",
      password: "plantyplants",
      email: "frodo@frodo.com",
    });
    await users.add({
      username: "Galdalf",
      password: "plantyplants",
      email: "wizards@noemail.com",
    });

    let count = await db("users");
    expect(count).toHaveLength(3);
  });

  describe("find by id", () => {
    it("returns a user with matching id", async () => {
      await users.add({
        username: "Sam",
        password: "plantyplants",
        email: "sam@sam.com",
      });

      await users.findById(1);

      let count = await db("users");

      expect(count).toHaveLength(1);
    });
  });

  describe("find by username", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it("returns a user with matching username", async () => {
      await users.add({
        username: "Sam",
        password: "plantyplants",
        email: "sam@sam.com",
      });

      await users.findByName({ username: "Sam" });

      let count = await db("users");

      expect(count).toHaveLength(1);
    });

    it("returns a null without matching name", async () => {
      const result = await users.findByName({ username: "Sam" });

      expect(result).toBe(undefined);
    });
  });

  describe("delete user", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it("deletes user by id", async () => {
      await users.add({
        username: "Sam",
        password: "plantyplants",
        email: "sam@sam.com",
      });

      const deleted = await users.remove(1);

      let count = await db("users");

      expect(count).toHaveLength(0);
    });
    it("returns number greater than 0", async () => {
      await users.add({
        username: "Sam",
        password: "plantyplants",
        email: "sam@sam.com",
      });

      const deleted = await users.remove(1);

      let count = await db("users");

      expect(deleted).not.toBe(0);
    });
    it("returns a zero if no id", async () => {
      await users.add({
        username: "Sam",
        password: "plantyplants",
        email: "sam@sam.com",
      });

      const deleted = await users.remove(2);

      let count = await db("users");

      expect(deleted).toBe(0);
    });
  });

  it("doens't remove things by accident", async () => {
    await users.add({
      username: "Sam",
      password: "plantyplants",
      email: "sam@sam.com",
    });

    const deleted = await users.remove(2);

    let count = await db("users");

    expect(count).toHaveLength(1);
  });
});
