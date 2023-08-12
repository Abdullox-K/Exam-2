let {v4:uuid}=require("uuid")
let path=require("path")

let Input_Output=require(process.cwd()+"/Source/Utils/Input-Output")
let FeedBacks=new Input_Output(process.cwd()+"/DataBase/FeedBacks.json")
let FeedBack_Validation=require(process.cwd()+"/Source/Validations/FeedBack_Validation")

async function Create_FeedBack(req,res) {
    try {
        let {name,status="Customer",message}=req.body

        let file=req.files?.photo

        let error=await FeedBack_Validation({name,status,message,file})

        if(error) {
            return res.status(400).json({message:error.message})
        }

        let feedbacks=await FeedBacks.read()

        let id=(feedbacks[feedbacks.length-1]?.id || 0)+1

        let photo=uuid()+path.extname(file.name)

        file.mv(process.cwd()+"/Uploads/"+photo)
        
        let data
        
        if(feedbacks) {
            data=[...feedbacks,{
                id:id,
                name:name,
                status:status,
                message:message,
                photo:photo}]
        }else {
            data=[{
                id:id,
                name:name,
                status:status,
                message:message,
                photo:photo}]
        }
        
        await FeedBacks.write(data)
        
        res.status(201).json({message:"Successfully created", data:{id:id,name:name,status:status,message:message,photo:photo}})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
}

async function Show_FeedBacks(req,res) {
    try {
        let feedbacks=await FeedBacks.read()
    
        res.json({message:"Successfully shown",data:feedbacks})
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
    }
}

async function Show_FeedBack(req,res) {
    try {
        let {id}=req.params
    
        let feedbacks=await FeedBacks.read()
    
        let feedback=feedbacks.find((feedback)=>feedback.id===+id)
    
        if(!feedback) {
            return res.status(404).json({message:"FeedBack not found"})
        }

        res.json({message:"Successfully shown",data:feedback})
      } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
      }
}

async function Change_FeedBack(req,res) {
    try {
        let {id}=req.params
    
        let feedbacks=await FeedBacks.read()
    
        let feedback=feedbacks.find((feedback)=>feedback.id===+id)
    
        if(!feedback) {
            return res.status(404).json({message:"FeedBack not found"})
        }

        let {name=feedback.name,status=feedback.status,message=feedback.message}=req.body

        let file=req.files?.photo || feedback.photo

        let error=await FeedBack_Validation({name,status,message,file})

        if(error) {
            return res.status(400).json({message:error.message})
        }

        feedback.name=name

        feedback.status=status
        
        feedback.message=message

        if(file!==feedback.photo) {
            let photo=uuid()+path.extname(file.name)

            file?.mv(process.cwd()+"/Uploads/"+photo)

            feedback.photo=photo
        }else {
            feedback.photo=file
        }

        await FeedBacks.write(feedbacks)

        res.json({message:"Successfully changed",data:feedback})
      } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
      }
}

async function Delete_FeedBack(req,res) {
    try {
        let {id}=req.params
    
        let feedbacks=await FeedBacks.read()
    
        let feedback=feedbacks.find((feedback)=>feedback.id===+id)
    
        if(!feedback) {
            return res.status(404).json({message:"FeedBack not found"})
        }

        let data=feedbacks.filter((feedback)=>{return feedback.id!==+id})

        await FeedBacks.write(data)

        res.json({message:"Successfully deleted",data:feedback})
      } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
      }
}

module.exports={Create_FeedBack,Show_FeedBacks,Show_FeedBack,Change_FeedBack,Delete_FeedBack}