const express = require("express")
const UsersService = require("./features/UsersService")
const CreateUserHandlerFactory = require("./handlers/CreateUserHandleFactory")
const GetAllUserHandlerFactory = require("./handlers/GetAllUserHandlerFactory")
const UserRepository = require("./UserRepository")

const app = express()

app.use(express.json())

let data = [] // Database

// const client = new PrismaClient()

const usersService = UsersService(new UserRepository(data))

app.get("/",GetAllUserHandlerFactory(usersService))

app.post("/",CreateUserHandlerFactory(usersService))

app.listen(4000,()=>{
    console.log("Listening on: http://localhost:4000")
})