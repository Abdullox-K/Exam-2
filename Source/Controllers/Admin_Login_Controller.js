let bcrypt=require("bcrypt")

let Input_Output=require(process.cwd()+"/Source/Utils/Input-Output")
let Admins=new Input_Output(process.cwd()+"/DataBase/Admins.json")
let jwt=require(process.cwd()+"/Source/Utils/JWT")

async function Login(req,res) {
    try {
        let {user_name,password}=req.body
        
        if(user_name.length===0 || password.length===0) {
            return res.status(400).json({message:"You must enter User-Name and password"})
        }
        
        let admins=await Admins.read()
        
        let check=admins.find((user)=>user.user_name===user_name)
        
        if(!check) {
            return res.json({message:"User-Name not found"})
        }
        
        if(!await bcrypt.compare(password, check.password)){
            return res.json({message:"Wrong password"})
        }
        
        let token=jwt.sign({id:check.id})

        res.cookie("Token",token,{maxAge:60*60*1000})
        
        res.status(201).json({message:"Successfully Log-In, your Token located in cookies",data:token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports=Login