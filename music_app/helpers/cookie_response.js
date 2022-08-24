const { prod } = require("../config")

function cookie_response(req,res,data_whitToken){
    return res.cookie("token",data_whitToken.token,{
        httpOnly:true,
        ...prod &&{expires: new Date(new Date().setDate(new Date().getDate() + 7)), secure:false}
    }).json(data_whitToken)
}

module.exports=cookie_response