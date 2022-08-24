const client = require('../../libs/db')

class Users {
    async getAll() {
        return await client.user.findMany()
    }

    async getOneByEmail(email) {
        try {
            return await client.user.findFirst({
                where: {
                    email
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    async create(userData) {
        try {
            return await client.user.create({
                data: userData
            })
        } catch (error) {
            console.log(error);
        }
    }

    async update(iduser, data) {
        const id = Number.parseInt(iduser)
        const user = await client.user.update({
            where: {
                id
            },
            data
        })

        return user
    }

    async delete(idUser) {
        try {
            const id = Number.parseInt(idUser)
            const user = await client.user.delete({
                where: {
                    id
                }
            })

            return user
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Users