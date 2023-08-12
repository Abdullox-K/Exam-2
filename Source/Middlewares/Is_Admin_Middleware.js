let jwt=require(process.cwd()+"/Source/Utils/JWT")

let Is_Admin=(req,res,next)=>{
    let token=req.cookies.Token?.split(" ")[1] || req.cookies.Token 

    if(!token) {
        return res.status(401).json({message: "Invalid Token"})
    }

    jwt.verify(token,(err,data)=>{
        if(err) {
            return res.status(401).json({message: "Invalid Token"})
        }

        req.user=data
        next()
    })
}

module.exports=Is_Admin