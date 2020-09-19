# back-end

User will be able to register and login
Once logged in:
User will be able to add a plant to the database

User will be able to update their own information
User will be able to update their plants information
User will be able to delete their plants

STRETCH
User will be able to update when the plant has been watered(last_date_watered), the next date(next_watering) will autoincrement(increment) using moment js.

last_date_watered + increment => next_watering
last_date_watered = new Date()

When a user waters their plant, they get experience points


STRETCH

A user will be able to order their plants by 
Oldest Plant, 
Newest Plant, 
Next Watering


GET
/users/:id
/plants/:id
/plants

POST
/login
/register
/plants

UPDATE
/plants/:id
/users/:id

DELETE
/plants/:id
/users/:id