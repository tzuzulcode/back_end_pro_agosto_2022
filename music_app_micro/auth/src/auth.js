const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwtSecret, microUsers } = require('./config')
const axios = require("axios").default

class Auth {

    async login(credentials) {
        try {
            const { email, password } = credentials
            
            // const user = await this.userService.getOneByEmail(email);
            const response = (await axios.get(`${microUsers}/${email}`)).data

            if (!response.success) return {
                success: false,
                messsage: 'User not found'
            }

            const user = response.data

            const compare = await this.#compare(password, user.password)

            if (!compare) return {
                success: false,
                message: 'Invalid credentials'
            }
            return this.#buildUserData(user)
        } catch (error) {
            return {
                success:false,
                message:error.message
            }
        }
    }

    async signup(data) {
        try {
            if (data && data.password) {
                data.password = await this.#encrypt(data.password)
            }
            const result = (await axios.post(`${microUsers}`,data)).data
            if (!result.success) return result
            return this.#buildUserData(result.data)
        } catch (error) {

            return {
                success:false,
                message:error.response?.data?.message || error.message
            }
        }
    }

    validate(token){
        try {
            const user = jwt.verify(token,jwtSecret)

            return {
                success:true,
                data:user
            }
        } catch (error) {
            return {
                success:false,
                data:error.message
            }
        }
    }

    #buildUserData(user) {
        const data = {
            id: user.id,
            name: user.name,
            email: user.email,
            // role: user.role
        }
        const result = this.#getToken(data)
        return result
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
}

module.exports = Auth