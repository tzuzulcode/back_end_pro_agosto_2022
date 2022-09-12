const router = require("express").Router()
const UsersService = require("./users")

const usersServ = new UsersService()

router.get("/:email",async (req,res)=>{
    const result = await usersServ.getOneByEmail(req.params.email)

    return res.status(result.success?200:404).json(result)
})

router.post("/",async (req,res)=>{
    const result = await usersServ.create(req.body)

    return res.status(result.success?200:400).json(result)
})

module.exports = router