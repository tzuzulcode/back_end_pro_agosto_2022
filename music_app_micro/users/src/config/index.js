require("dotenv").config()

const config = {
    port: process.env.PORT,
    dev: process.env.NODE_ENV === "development",
    prod: process.env.NODE_ENV === "production",
}

module.exports = config