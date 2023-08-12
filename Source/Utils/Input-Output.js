let fs=require("fs").promises

class Input_Output {
    #dir
    constructor(dir) {
        this.#dir=dir
    }
    async read() {
        let data=await fs.readFile(this.#dir,"UTF-8")
        return data.length ? JSON.parse(data):[]
    }
    async write(data) {
        await fs.writeFile(this.#dir,JSON.stringify(data, null, 2),"UTF-8")
    }
}

module.exports=Input_Output