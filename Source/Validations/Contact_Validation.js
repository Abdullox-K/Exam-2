let Joi=require("joi")

async function Contact_Validation(payload) {
    let schema=Joi.object({
        name:Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(16).required(),
        phone_number:Joi.string().pattern(/^\+[0-9]{12}$/).required(),
        email:Joi.string().email().required(),
        message:Joi.string().min(8).max(128).required(),
    })

    let {error}=schema.validate(payload)

    if(error) {
        return error
    }else {
        return false
    }
}

module.exports=Contact_Validation