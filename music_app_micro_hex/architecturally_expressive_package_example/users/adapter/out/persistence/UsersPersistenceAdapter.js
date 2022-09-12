// Implementar a CreateUserPort
// Implementar a UpdateUserPort
// Implmentar a FindUserPort
class UsersPersistenceAdapter{
    // Inyectar el repositorio
    constructor(usersRepository){
        this.usersRepository = usersRepository
    }

    getAllUsers() {
        return this.usersRepository.getAll()
    }

    createUser(data){
        return this.usersRepository.create(data)
    }
}

module.exports = UsersPersistenceAdapter