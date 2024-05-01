
const express  = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT  = process.env.PORT || 8080 

//schema
const schemaData  = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    fullname: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
})

schemaData.methods.toJSON = function() {
    const obj = this.toObject();
    obj.createdAt = obj.createdAt.toISOString(); // ISO formatına çevir
    return obj;
};

const visitorModel  = mongoose.model("visitors",schemaData)

// read
app.get("/",async(req,res)=>{
    const data = await visitorModel.find({})
    res.json({success : true , data : data})
})  


//create data || save data in mongodb
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new visitorModel(req.body)
    await data.save()
    res.send({success : true, message : "data save successfully" , data : data})
})



mongoose.connect("mongodb+srv://beyzagursoy:12345@cluster0.j11bspl.mongodb.net/eVisitor?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connect to DB")
    app.listen(PORT,()=>console.log("Server is running"))
})
.catch((err)=>console.log(err))
