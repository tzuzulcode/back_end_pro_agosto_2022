const User = require('../user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config')

class Auth {
    constructor() {
        this.userService = new User()
    }

    async #encrypt(password) {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }

    async #compare(password, passwordEncrypt) {
        return await bcrypt.compare(password, passwordEncrypt)
    }

    #getToken(user) {
        const token = jwt.sign(user, jwtSecret, {
            expiresIn: '2d'
        })
        return { success: true, user, token }
    }

    async logIn(credentials) {
        try {
            const { email, password } = credentials
            const user = await this.userService.getOneByEmail(email)

            if (!user) return {
                success: false,
                messsage: 'User not found'
            }

            const compare = await this.#compare(password, user.password)

            if (!compare) return {
                success: false,
                message: ['Invalid credentials']
            }
            return this.#buildUserData({ user })
        } catch (error) {
            return error
        }
    }

    async register(data) {
        try {
            if (data && data.password) {
                data.password = await this.#encrypt(data.password)
            }
            const result = await this.userService.create(data)
            if (!result.success) return result
            return this.#buildUserData(result)
        } catch (error) {
            return error
        }
    }

    #buildUserData({ user }) {
        const data = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        const result = this.#getToken(data)
        return result
    }
}

module.exports = Auth