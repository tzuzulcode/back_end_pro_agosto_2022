const client = require('../../libs/db')

class Users {
    async getAll() {
        try {
            return await client.user.findMany()
        } catch (error) {
            return {
                success: false,
                message: " An error ocurred"
            }
        }
    }

    async getOneByEmail(email) {
        try {
            const user = await client.user.findFirst({
                where: {
                    email
                }
            })

            return user
        } catch (error) {
            return {
                success: false,
                message: " An error ocurred"
            }
        }
    }

    async create(userData) {
        try {
            const user = await client.user.create({
                data: userData
            })
            return {
                success: true,
                data: user
            }
        } catch (error) {
            return {
                success: false,
                message: " An error ocurred"
            }
        }
    }

    async update(iduser, data) {
        try {
            const id = Number.parseInt(iduser)
            const user = await client.user.update({
                where: {
                    id
                },
                data
            })

            return user
        } catch (error) {
            return {
                success: false,
                message: " An error ocurred"
            }
        }
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
            return {
                success: false,
                message: " An error ocurred"
            }
        }
    }
}

module.exports = Users