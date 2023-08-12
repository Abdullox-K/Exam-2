let {v4:uuid}=require("uuid")
let path=require("path")

let Input_Output=require(process.cwd()+"/Source/Utils/Input-Output")
let Services=new Input_Output(process.cwd()+"/DataBase/Services.json")
let Service_Validation=require(process.cwd()+"/Source/Validations/Service_Validation")

async function Create_Service(req,res) {
    try {
        let {title,description}=req.body

        let file=req.files?.photo

        let error=await Service_Validation({title,description,file})

        if(error) {
            return res.status(400).json({message:error.message})
        }

        let services=await Services.read()

        let check=services.find((service)=>service.title===title)
        
        if(check) {
            return res.status(403).json({message:"This Title has already been used"})
        }
        
        let id=(services[services.length-1]?.id || 0)+1

        let photo=uuid()+path.extname(file.name)

        file.mv(process.cwd()+"/Uploads/"+photo)
        
        let data
        
        if(services) {
            data=[...services,{
                id:id,
                title:title,
                description:description,
                photo:photo}]
        }else {
            data=[{
                id:id,
                title:title,
                description:description,
                photo:photo}]
        }
        
        await Services.write(data)
        
        res.status(201).json({message:"Successfully created", data:{id:id,title:title,description:description,photo:photo}})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
}

async function Show_Services(req,res) {
    try {
        let services=await Services.read()
    
        res.json({message:"Successfully shown",data:services})
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
    }
}

async function Show_Service(req,res) {
    try {
        let {id}=req.params
    
        let services=await Services.read()
    
        let service=services.find((service)=>service.id===+id)
    
        if(!service) {
            return res.status(404).json({message:"Service not found"})
        }

        res.json({message:"Successfully shown",data:service})
      } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
      }
}

async function Delete_Service(req,res) {
    try {
        let {id}=req.params
    
        let services=await Services.read()
    
        let service=services.find((service)=>service.id===+id)
    
        if(!service) {
            return res.status(404).json({message:"Service not found"})
        }

        let data=services.filter((service)=>{return service.id!==+id})

        await Services.write(data)

        res.json({message:"Successfully deleted",data:service})
      } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
      }
}

module.exports={Create_Service,Show_Services,Show_Service,Delete_Service}