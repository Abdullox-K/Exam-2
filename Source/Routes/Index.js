let admin_login_router=require(process.cwd()+"/Source/Routes/Admin_Login_Route")
let services_router=require(process.cwd()+"/Source/Routes/Services_Route")
let feedbacks_router=require(process.cwd()+"/Source/Routes/FeedBacks_Route")
let contacts_router=require(process.cwd()+"/Source/Routes/Contacts_Route")

module.exports=[admin_login_router,services_router,feedbacks_router,contacts_router]