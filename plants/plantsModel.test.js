const db = require("../knexconfig");
const plants = require("./plantsModel");
const users = require("../users/usersModel");
describe("add plant", () => {
  beforeEach(async () => {
    await db("users").truncate()
    await db("plants").truncate()
  });

  it("adds a plant to the database", async () => {
    await users.add({
      username: "Sam",
      password: "plantyplants",
      email: "sam@sam.com",
    });

    await plants.add(1,{
      plant_name: "It's a plant",
      description: "still a plant",
      date_last_watered: "09 03 2020",
      increment: 6,
      species: "Plant",
    });

    let count = await db("plants");
    expect(count).toHaveLength(1);
  });

  it("adds multiple plants to the database", async () => {
    await users.add({
      username: "Sam",
      password: "plantyplants",
      email: "sam@sam.com",
    });
    await plants.add(1,{
        plant_name: "It's a plant",
        description: "still a plant",
        date_last_watered: "09 03 2020",
        increment: 6,
        species: "Plant",
      });
      await plants.add(1,{
        plant_name: "It's a plant",
        description: "still a plant",
        date_last_watered: "09 03 2020",
        increment: 6,
        species: "Plant",
      });
      await plants.add(1,{
        plant_name: "It's a plant",
        description: "still a plant",
        date_last_watered: "09 03 2020",
        increment: 6,
        species: "Plant",
      });

    let count = await db("plants");
    expect(count).toHaveLength(3);
  });

  describe("find by id", () => {
    it("returns a plant with matching id", async () => {
      await users.add({
        username: "Sam",
        password: "plantyplants",
        email: "sam@sam.com",
      });
      await plants.add(1,{
        plant_name: "It's a plant",
        description: "still a plant",
        date_last_watered: "09 03 2020",
        increment: 6,
        species: "Plant",
      });

      let count = await plants.findById(1);

      expect(count).toHaveLength(1);
    });
  });

    describe("delete plant", () => {
    beforeEach(async () => {
      await db("users").truncate()
      await db("plants").truncate()
    });
    it("deletes plant by id", async () => {
      await users.add({
        username: "Sam",
        password: "plantyplants",
        email: "sam@sam.com",
      });

      await plants.add(1,{
        plant_name: "It's a plant",
        description: "still a plant",
        date_last_watered: "09 03 2020",
        increment: 6,
        species: "Plant",
      });

      const deleted = await plants.remove(1);

      let count = await db("plants");

      expect(count).toHaveLength(0);
    });

    it("returns number greater than 0", async () => {
      await users.add({
        username: "Sam",
        password: "plantyplants",
        email: "sam@sam.com",
      });

      await plants.add(1,{
        plant_name: "It's a plant",
        description: "still a plant",
        date_last_watered: "09 03 2020",
        increment: 6,
        species: "Plant",
      });

      const deleted = await plants.remove(1);

      let count = await db("plants");

      expect(deleted).not.toBe(0);
    });
    it("returns a zero if no id", async () => {
      await users.add({
        username: "Sam",
        password: "plantyplants",
        email: "sam@sam.com",
      });
      await plants.add(1,{
        plant_name: "It's a plant",
        description: "still a plant",
        date_last_watered: "09 03 2020",
        increment: 6,
        species: "Plant",
      });

      const deleted = await plants.remove(2);

      let count = await db("plants");

      expect(deleted).toBe(0);
    });

    it("doens't remove things by accident", async () => {
      await users.add({
        username: "Sam",
        password: "plantyplants",
        email: "sam@sam.com",
      });
      await plants.add(1,{
        plant_name: "It's a plant",
        description: "still a plant",
        date_last_watered: "09 03 2020",
        increment: 6,
        species: "Plant",
      });

      const deleted = await plants.remove(2);

      let count = await db("plants");

      expect(count).toHaveLength(1);
    });
  });

  describe("update plants", () => {
    beforeEach(async () => {
      await db("users").truncate()
      await db("plants").truncate()
    });

    it("returns updated plant", async () => {
      await users.add({
        username: "Sam",
        password: "plantyplants",
        email: "sam@sam.com",
      });
      await plants.add(1,{
        plant_name: "It's a plant",
        description: "still a plant",
        date_last_watered: "09 03 2020",
        increment: 6,
        species: "Plant",
      });

      const changes = await plants.update(1,
        {
          plant_name: "Bob",
        },
        1
      );

      expect(changes.username).toBe("Bob");
    });
  });
});
