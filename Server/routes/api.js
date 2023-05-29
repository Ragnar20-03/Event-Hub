const express = require('express');
const router = express.Router();

const {MongoClient} = require ('mongodb');
const URL = "mongodb://127.0.0.1:27017"
const client = new MongoClient(URL)

async function getConnection(){
    let result = await client.connect();
    if(!result)
    {
        console.log("Error to Connect With MongoDB");
    }
    else
    {
        let db = result.db("EventHub");
        return db.collection("users");       
    }
}

router.get('/' , async (req , res) => {
    res.send(await readData());
})


router.post('/register' , async (req , res) =>{
    let data = req.body;
    let conn = await getConnection()    
    let query = conn.insertOne({"email" : data.email , "password" : data.password})
    if((await query).acknowledged) {
        res.status(200).send("Succes")
    }
    else
    {
        res.status(400).send("Failed")
    }

})

router.post( '/login' , async (req ,res) => {
    let conn = await getConnection();
    let data = req.body;

    let query = await conn.find({}).toArray();
    console.log(query);
    let iCnt= 0;
    for (iCnt = 0 ; iCnt< query.length; iCnt++)
    {
        if(query[iCnt].email == data.email)
        {
            if(query[iCnt].password == data.password)
            {
                res.status(200).send("Password and email Match Success")
            }
            else
            {
                res.status(402).send("Password Doesnt match")
            }
            break;
        }     
    }
    if(iCnt == query.length)
    {
        res.status(404).send("Email Not Found")
    }
} )

module.exports = router



async function readData(){
    let result = await  getConnection();
    let data = result.find({}).toArray();
    return data;
}