// Dependency Injection para funciones
function UsersService(userRepository){
    return {
        findAll:()=>{
            return userRepository.findAll()
        },
        create:(data)=>userRepository.create(data)
    }
}

module.exports = UsersService