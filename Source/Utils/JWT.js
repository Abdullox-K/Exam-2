let jwt=require("jsonwebtoken")

let configuration=require(process.cwd()+"/Source/Configuration")

let sign=(payload)=>jwt.sign(payload,configuration.jwt_admin_key,{expiresIn:"1h"})

let verify=(payload,callback)=>jwt.verify(payload,configuration.jwt_admin_key,callback)

module.exports={sign,verify}