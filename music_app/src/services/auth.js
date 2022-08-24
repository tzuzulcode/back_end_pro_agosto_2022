const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")

const Users = require("./users")

class Auth{
    constructor(){
        // añadido el userservice al constructor de la clase
        this.userService = new Users()
    }
    async login(credentials){
        const {email,password} = credentials
        const user = await this.userService.getByEmail(email)
        // El compare es async
        if(user && await this.compare(password,user.password)){
            delete user.password
            const token = this.createToken(user)

            return {
                success:true,
                data:user,
                token
            }
        }

        return {
            success:false,
            message:"Credenciales incorrectas. Verificar."
        }

    }

    async signup(credentials){
        // comprobacion de existencia de usuario

        const {email}=credentials
        const userExist = await this.userService.getByEmail(email)

        if(userExist) return {
            success:false,
            message:"User Alredy have an account"
        }
        
        credentials.password = await this.encrypt(credentials.password)
        const user = await this.userService.create(credentials)

        if(user){
            const token = this.createToken(user)
            
            console.log(token)
            return {
                success:true,
                data:user,
                token
            }
        }

        return {
            success:false,
            message:"Credenciales incorrectas. Verificar."
        }

    }


    validate(token){
        try {
            const data = jwt.verify(token,jwtSecret)
            return {
                success:true,
                data
            }
        } catch ({message}) {
            return {
                success:false,
                message
            }
        }
    }

    createToken(data){
        const token = jwt.sign(data,jwtSecret)

        return token
    }

    async encrypt(text){
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(text,salt)
        return hash
    }

    async compare(text,hash){
        const result = await bcrypt.compare(text,hash)
        return result //true o false
    }
    // Usar funcionalidad
    verify_credentials(credentials,select='login'){
        const response = {
            login:(credentials)=>{
                const {email,password} = credentials
                if(!email && !password) return false
                return true
            },
            signup:(credentials)=>{
                const {email,password,name} = credentials
                if(!email && !password && !name) return false
                return true
            },
        }
        return response[select](credentials)
    }
}


module.exports = Auth