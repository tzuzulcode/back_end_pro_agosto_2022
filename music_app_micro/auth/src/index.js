const express = require("express")
const { port } = require("./config")
const router = require("./routes")

const app = express()

app.use(express.json())

app.use(router)

app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})