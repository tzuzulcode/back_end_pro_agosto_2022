const { PrismaClient } = require(".prisma/client")
const express = require("express")
const UsersService = require("./users/application/service/UserService")
const UsersRepository = require("./users/adapter/out/persistence/UsersRepository")
const UsersPersistenceAdapter = require("./users/adapter/out/persistence/UsersPersistenceAdapter")
const UsersController = require("./users/adapter/in/web/UsersController")

const app = express()

app.use(express.json())

const client = new PrismaClient()

// const client = new PrismaClient()

const usersService = new UsersService(new UsersPersistenceAdapter(new UsersRepository(client.user)))
const usersController = new UsersController(usersService)

const createUser = usersController.createUser.bind(usersController)

app.post("/",createUser)

app.listen(4000,()=>{
    console.log("Listening on: http://localhost:4000")
})