// const {PrismaClient} = require("@prisma/client")

// const client = new PrismaClient()


class UsersRepository{
    #db
    constructor(db){
        this.#db = db
    }

    getAll() {
        return this.#db.findMany()
    }

    create(data){
        return this.#db.create({data})
    }
}

module.exports = UsersRepository