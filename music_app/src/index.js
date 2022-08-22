const express = require("express")
const { port, dev, prod } = require("./config")

const auth = require("./routes/auth")

const app = express()

app.use(express.json())

auth(app)

app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
    console.log(`Mode: ${dev?"DEVELOPMENT":prod?"PRODUCTION":"TEST"}`)
})