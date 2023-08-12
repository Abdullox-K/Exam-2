let {Router}=require("express")

let Login=require(process.cwd()+"/Source/Controllers/Admin_Login_Controller")

let router=Router()

router.post("/Admin/Log_In",Login)

module.exports=router