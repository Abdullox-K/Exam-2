let {Router}=require("express")

let Is_Admin=require(process.cwd()+"/Source/Middlewares/Is_Admin_Middleware")

let {Create_Contact,Show_Contacts,Show_Contact,Show_Contacts_Viewed,Show_Contacts_Not_Viewed}=require(process.cwd()+"/Source/Controllers/Contacts_Controller")

let router=Router()

router.post("/Create_Contact",Create_Contact)

router.get("/Admin/Show_Contacts",Is_Admin,Show_Contacts)

router.get("/Admin/Show_Contacts_Viewed",Is_Admin,Show_Contacts_Viewed)

router.get("/Admin/Show_Contacts_Not_Viewed",Is_Admin,Show_Contacts_Not_Viewed)

router.get("/Admin/Show_Contact/:id",Is_Admin,Show_Contact)

module.exports=router