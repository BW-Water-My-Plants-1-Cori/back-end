const db = require('../knexconfig')

const users = require('./usersModel')

describe("add user", ()=>{

    beforeEach(async ()=>{
        await db("users").truncate()
    })

    it("adds a user to the database", async()=>{
        await users.add({username: "Sam", password:"plantyplants", email: "sam@sam.com"})

        let count = await db("users")
        expect(count).toHaveLength(1)
    })

    it("adds multiple users to the database", async()=>{
        await users.add({username: "Sam", password:"plantyplants", email: "sam@sam.com"})
        await users.add({username: "Frodo", password:"plantyplants", email: "frodo@frodo.com"})
        await users.add({username: "Galdalf", password:"plantyplants", email: "wizards@noemail.com"})

        let count = await db("users")
        expect(count).toHaveLength(3)
    })

})