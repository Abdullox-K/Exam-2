require("dotenv/config")

let {env}=process

let configuration={
    port:env.PORT,
    jwt_admin_key:env.JWT_ADMIN_KEY
}

module.exports=configuration