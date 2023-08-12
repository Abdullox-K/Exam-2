let {Router}=require("express")

let {Create_FeedBack,Show_FeedBacks,Show_FeedBack,Change_FeedBack,Delete_FeedBack}=require(process.cwd()+"/Source/Controllers/FeedBacks_Controller")

let router=Router()

router.post("/Create_FeedBack",Create_FeedBack)

router.get("/Show_FeedBacks",Show_FeedBacks)

router.get("/Show_FeedBack/:id",Show_FeedBack)

router.put("/Change_FeedBack/:id",Change_FeedBack)

router.delete("/Delete_FeedBack/:id",Delete_FeedBack)

module.exports=router