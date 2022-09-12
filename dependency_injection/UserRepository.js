class UserRepository{
    #db
    // Dependency Injection
    constructor(db){
        this.#db = db
    }

    async findAll(){
        const users = await this.#db

        return users
    }

    async create(data){
        await this.#db.push(data)
        return data
    }
}

module.exports = UserRepository