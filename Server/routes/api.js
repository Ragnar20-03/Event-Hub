const express = require('express');
const router = express.Router();

const {MongoClient} = require ('mongodb');
const URL = "mongodb://127.0.0.1:27017"
const client = new MongoClient(URL)

const cors = require('cors');
router.use(cors())

const jwt = require('jsonwebtoken')

// ///////////////////////////////////////////////////////
// Connection Methods to  different Collections
async function getConnectionUser(){
    let result = await client.connect();
    if(!result)
    {
        console.log("Error to Connect With MongoDB");
    }
    else
    {
           let db = result.db("EventHub");
            return db.collection("users")
    }
}
async function getConnectionEvents(){
    let result = await client.connect();
    if(!result)
    {
        console.log("Error to Connect With MongoDB");
    }
    else
    {
           let db = result.db("EventHub");
            return db.collection("events")
    }
}

async function getConnectionSpecialEvents(){
    let result = await client.connect();
    if(!result)
    {
        console.log("Error to Connect With MongoDB");
    }
    else
    {
           let db = result.db("EventHub");
            return db.collection("specialevents")
    }
}

///////////////////////////////////////////

router.get('/' , async (req , res) => {
    res.send(await readDataUser());
})

// Register Component
router.post('/register' , async (req , res) =>{
    let userdata = req.body;
    let conn = await getConnectionUser()   
    let data = await readDataUser();
    let iCnt = 0;
    for (iCnt = 0; iCnt<data.length; iCnt++)
    {
        if(data[iCnt].email == userdata.email )
        {
            res.status(400).send("Already register with that email..")
            break;
        }
    } 
    if (iCnt == data.length)
    {
        let query = conn.insertOne({"email" : userdata.email , "password" : userdata.password})
        
        if((await query).acknowledged) {

            // For Creating JWT token
            let conn = await getConnectionUser();
            let data = await conn.findOne({"email" : userdata.email})
            
            let payload = {subject :data._id }
            let token = jwt.sign( payload , 'MahaDev' )
            
            res.status(200).send({token})
        }
        else
        {
            res.status(400).send("Failed to Inser data")
        }
    }

})
// Login Component
router.post( '/login' , async (req ,res) => {
    let conn = await getConnectionUser();
    let userData = req.body;

    let query = await conn.find({}).toArray();
    let iCnt= 0;
    for (iCnt = 0 ; iCnt< query.length; iCnt++)
    {
        if(query[iCnt].email == userData.email)
        {
            if(query[iCnt].password == userData.password)
            {
                let conn = await getConnectionUser();
                let data  = await conn.findOne({email: userData.email })

                let payload = {subject : data._id};
                let token = jwt.sign(payload , 'MahaDev')
                res.status(200).send({token})
             
            }
            else
            {
                res.status(402).send("Password Doesnt match");
                break;
            }
            break;
        }     
    }
    if(iCnt == query.length)
    {
        res.status(404).send("Email Not Found")
    }
} )

// '/events' Component
router.get( '/events' , async( req , res) => {
    res.send(await readDataEvents());
})

router.get( '/SpecialEvents' , async( req , res) => {
    res.send(await readDataSpecialEvents());
})


//  ///////////////////////////////
module.exports = router
//  ///////////////////////////////


// //////////////////////////////////
// Read data from database for different components

async function readDataUser(){
    let result = await  getConnectionUser();
    let data = result.find({}).toArray();
    return data;
}
async function readDataEvents(){
    let result = await getConnectionEvents();
    let data = result.find({}).toArray();
    return data;
}
async function readDataSpecialEvents(){
    let result = await  getConnectionSpecialEvents();
    let data = result.find({}).toArray();
    return data;
}

// //////////////////////////////////
