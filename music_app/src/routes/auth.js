const express = require("express")
const cookie_response = require("../helpers/cookie_response")

const Auth = require("../services/auth")
// helper


function auth(app){
    const router = express.Router()

    const authService = new Auth()

    app.use("/api/auth",router)

    router.post("/login",async (req,res)=>{

        const user = await authService.login(req.body)
        if(user.success)
            cookie_response(req,res,user)
        else
            return res.json(user)
    })
    router.post("/signup",async (req,res)=>{

        const user = await authService.signup(req.body)
        if(user.success)
            cookie_response(req,res,user)
        else
            return res.json(user)
    })

    router.post("/validate",(req,res)=>{
        const {token} = req.body

        const result = authService.validate(token)

        return res.status(result.success?200:400).json(result)
    })
}

module.exports = auth