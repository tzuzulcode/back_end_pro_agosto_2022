class UsersController{
    constructor(createUserUseCase){
        this.createUserUseCase = createUserUseCase
    }

    async getAllUsers(req, res) {
        const users = await this.createUserUseCase.getAllUsers()
        return res.json(users)
    }

    async createUser(req,res){
        const user = await this.createUserUseCase.createUser(req.body)

        return res.json(user)
    }
}

module.exports = UsersController