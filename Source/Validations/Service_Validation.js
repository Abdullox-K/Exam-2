let Joi=require("joi")

async function Service_Validation(payload) {
    let schema=Joi.object({
        title:Joi.string().alphanum().min(3).max(16).required(),
        description:Joi.string().min(8).max(128).required(),
        file:Joi.required()
    })

    let {error}=schema.validate(payload)

    if(error) {
        return error
    }else {
        return false
    }
}

module.exports=Service_Validation