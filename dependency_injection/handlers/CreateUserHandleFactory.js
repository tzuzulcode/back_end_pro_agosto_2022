const CreateUserHandlerFactory = (userService)=>{
    return async (req,res)=>{
        try {
            const user = await userService.create(req.body)

            return res.json(user)
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"Ocurrió un error"
            })
        }
    }
}

module.exports = CreateUserHandlerFactory