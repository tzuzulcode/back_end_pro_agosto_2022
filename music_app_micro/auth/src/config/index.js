require("dotenv").config()

const config = {
    port:process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    microUsers: process.env.MICRO_USERS
}

module.exports = config