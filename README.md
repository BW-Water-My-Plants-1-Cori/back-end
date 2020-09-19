# back-end


# MVP
User will be able to register and login
Once logged in:
User will be able to add a plant to the database

User will be able to update their own information
User will be able to update their plants information
User will be able to delete their plants

# STRETCH
User will be able to update when the plant has been watered(last_date_watered), the next date(next_watering) will autoincrement(increment) using moment js.

last_date_watered + increment => next_watering
last_date_watered = new Date()

# STRETCH

When a user waters their plant, they get experience points
When a user achieves 100 experience points, their level increases
When a users level increases, their experience resets to 0

# STRETCH

User can log out

# STRETCH

A user will be able to order their plants by 
Oldest Plant, 
Newest Plant, 
Next Watering

# Routes

Will have two routes

/users
/plants

authorization will have its own place

# Endpoints
GET
/users/:id
/plants/:id
/users/:id/plants -> returns plants ordered by date

POST
/login -> returns user data + plants
/register -> returns new user data
/users/:id/plants -> returns all users plants

UPDATE
/plants/:id
/users/:id

DELETE
/plants/:id
/users/:id


# STRETCH ENDPOINTS
GET

users/:id/plants/oldest
users/:id/plants/newest

/logout -> logs user out

# User Schema

 {
“username”: string, unique, required
“phonenumber”: string, unique
“email”: string, unique, required
“password”: string
“first_name”: string
“last_name”: string
“experience”: integer
"level" : integer
}

# Plant Schema
 {
“plant_name”: string, required
“description”: string
“date_last_watered”: string, required
"increment": integer, required
“next_watering”: (will be updated in backend)
“species”: string
“plant_url”: string
"date_created": string
}
