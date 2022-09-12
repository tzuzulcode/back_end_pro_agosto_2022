
// El servicio tendría que implementar de la interface CreateUserUseCase
class UserService{
    // createUserPort: CreateUserPort
    #createUserPort
    constructor(createUserPort){
        this.#createUserPort = createUserPort
    }

    getAllUsers() {
        return this.#createUserPort.getAllUsers()
    }

    createUser(data){
        return this.#createUserPort.createUser(data)
    }
}

module.exports = UserService