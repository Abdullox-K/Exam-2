let {Router}=require("express")

let Is_Admin=require(process.cwd()+"/Source/Middlewares/Is_Admin_Middleware")

let {Create_Service,Show_Services,Show_Service,Delete_Service}=require(process.cwd()+"/Source/Controllers/Services_Controller")

let router=Router()

router.post("/Admin/Create_Service",Is_Admin,Create_Service)

router.get("/Show_Services",Show_Services)

router.get("/Show_Service/:id",Show_Service)

router.delete("/Admin/Delete_Service/:id",Is_Admin,Delete_Service)

module.exports=router