class UsersController{
    constructor(createUserUseCase){
        this.createUserUseCase = createUserUseCase
    }

    async createUser(req,res){
        const user = await this.createUserUseCase.createUser(req.body)

        return res.json(user)
    }

}

module.exports = UsersController