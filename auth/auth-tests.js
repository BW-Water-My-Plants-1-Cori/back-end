const auth = require('../users/usersModel')
const db = require('../knexconfig')
const users = require('../users/usersModel')
const { expectCt } = require('helmet')

describe("clears database", ()=>{
    beforeEach(async, ()=>{
        await db("users").truncate()
    })
})

describe("add user", ()=>{
    it("adds a user to the database", ()=>{
        await users.add({username: "Sam", password:"plantyplants", email: "sam@sam.com"})

        let count = db("users")
        expect(count).toHaveLength(1)
    })

    it("adds multiple users to the database", async()=>{
        await users.add({username: "Sam", password:"plantyplants", email: "sam@sam.com"})
        await users.add({username: "Frodo", password:"plantyplants", email: "frodo@frodo.com"})
        await users.add({username: "Galdalf", password:"plantyplants", email: "wizards@noemail.com"})

        let count = db("users")
        expect(count).toHaveLength(3)
    })

    
})