const client = require('./libs/client')

class Users {
    async getAll() {
        return await client.user.findMany()
    }

    async getOneByEmail(email) {
        try {
            const user = await client.user.findFirst({
                where: {
                    email
                }
            })

            if(!user){
                throw new Error("Not found")
            }
            return {
                success:true,
                data:user
            }

        } catch (error) {
            return {
                success:false,
                message:error.message
            }
        }
    }

    async create(userData) {
        try {
            const user = await client.user.create({
                data: userData
            })

            return {
                success:true,
                data:user
            }
        } catch (error) {
            console.log(error)
            return {
                success:false,
                message:error.message
            }
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

            return {
                success:true,
                data:user
            }
        } catch (error) {
            return {
                success:false,
                message:error.message
            }
        }
    }
}

module.exports = Users