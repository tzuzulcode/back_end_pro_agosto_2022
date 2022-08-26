const { Prisma } = require('@prisma/client');
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
            const user = await client.user.create({
                data: userData
            })

            return {
                success:true,
                data:user
            }
        } catch (error) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                  return {
                    success:false,
                    message: 'There is a unique constraint violation, a new user cannot be created with this '+error.meta.target[0]
                  }
                }
            }
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