const express = require("express")
const { port } = require("./config")
const router = require("./routes")
const cors = require("cors")

const app = express()

app.use(cors({
    origin:["http://localhost:4001","http://127.0.0.1:4001"]
}))

app.use(express.json())

app.use(router)

app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})