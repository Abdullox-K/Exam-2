let Input_Output=require(process.cwd()+"/Source/Utils/Input-Output")
let Contacts=new Input_Output(process.cwd()+"/DataBase/Contacts.json")
let Contact_Validation=require(process.cwd()+"/Source/Validations/Contact_Validation")

async function Create_Contact(req,res) {
    try {
        let {name,phone_number,email,message}=req.body

        let error=await Contact_Validation({name,phone_number,email,message})

        if(error) {
            return res.status(400).json({message:error.message})
        }

        let contacts=await Contacts.read()

        let check=contacts.find((contact)=>contact.phone_number===phone_number || contact.email===email)
        
        if(check) {
            return res.status(403).json({message:"This Phone-Number or E-Mail has already been used"})
        }
        
        let id=(contacts[contacts.length-1]?.id || 0)+1

        let data
        
        if(contacts) {
            data=[...contacts,{
                id:id,
                name:name,
                phone_number:phone_number,
                email:email,
                message:message,
                view:false}]
        }else {
            data=[{
                id:id,
                name:name,
                phone_number:phone_number,
                email:email,
                message:message,
                view:false}]
        }
        
        await Contacts.write(data)
        
        res.status(201).json({message:"Successfully created", data:{id:id,name:name,phone_number:phone_number,email:email,message:message}})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "INTERNAL SERVER ERROR"})
    }
}

async function Show_Contacts(req,res) {
    try {
        let contacts=await Contacts.read()
    
        res.json({message:"Successfully shown",data:contacts})
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
    }
}

async function Show_Contacts_Viewed(req,res) {
    try {
        let contacts=await Contacts.read()

        let viewed=contacts.filter((contact)=>contact.view===true)
    
        res.json({message:"Successfully shown",data:viewed})
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
    }
}

async function Show_Contacts_Not_Viewed(req,res) {
    try {
        let contacts=await Contacts.read()

        let not_viewed=contacts.filter((contact)=>contact.view===false)
    
        res.json({message:"Successfully shown",data:not_viewed})
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
    }
}

async function Show_Contact(req,res) {
    try {
        let {id}=req.params
    
        let contacts=await Contacts.read()
    
        let contact=contacts.find((contact)=>contact.id===+id)
    
        if(!contact) {
            return res.status(404).json({message:"Contact not found"})
        }

        if(contact.view===false) {
            contact.view=true

            await Contacts.write(contacts)
        }

        res.json({message:"Successfully shown",data:contact})
      } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
      }
}

module.exports={Create_Contact,Show_Contacts,Show_Contacts_Viewed,Show_Contacts_Not_Viewed,Show_Contact}