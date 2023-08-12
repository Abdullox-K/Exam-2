let Joi=require("joi")

async function FeedBack_Validation(payload) {
    let schema=Joi.object({
        name:Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(16).required(),
        status:Joi.string().max(16),
        message:Joi.string().min(8).max(128).required(),
        file:Joi.required()
    })

    let {error}=schema.validate(payload)

    if(error) {
        return error
    }else {
        return false
    }
}

module.exports=FeedBack_Validation