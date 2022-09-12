const express = require('express')
const { PrismaClient } = require('@prisma/client')
const UserService = require('./users/application/service/UserService')
const UsersRepository = require('./users/adapter/out/persistence/UsersRepository')
const UsersPersistenceAdapter = require('./users/adapter/out/persistence/UsersPersistenceAdapter')
const UsersController = require('./users/adapter/in/web/UsersController')
const morgan = require('morgan')

const port = 4000
const app = express()
app.use(express.json())
app.use(morgan('dev'))

const client = new PrismaClient()

const userService = new UserService(new UsersPersistenceAdapter(new UsersRepository(client.user)))
const usersController = new UsersController(userService)
const createUser = usersController.createUser.bind(usersController)
const getAllUsers = usersController.getAllUsers.bind(usersController)

app.get('/all', getAllUsers)
app.post('/create', createUser)

app.listen(port, () => {
    console.log('Running in: http://localhost:' + port)
})
