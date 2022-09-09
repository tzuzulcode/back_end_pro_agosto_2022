// Implementar a CreateUserPort
// Implementar a UpdateUserPort
// Implmentar a FindUserPort
class UsersPersistenceAdapter{
    // Inyectar el repositorio
    constructor(usersRepository){
        this.usersRepository = usersRepository
    }

    createUser(data){
        return this.usersRepository.create(data)
    }
}

module.exports = UsersPersistenceAdapter