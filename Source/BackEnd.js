let express=require("express")
let file_upload=require("express-fileupload")
let cookie=require("cookie-parser")

let configuration=require(process.cwd()+"/Source/Configuration")
let routes=require(process.cwd()+"/Source/Routes/Index")

let server=express()

server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(file_upload())
server.use(cookie())

server.use(express.static(process.cwd()+"/Uploads"))

server.use("/API",routes)

server.listen(configuration.port,()=>{
    console.log(`Server is running on port ${configuration.port}`)
})