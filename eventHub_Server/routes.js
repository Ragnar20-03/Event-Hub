const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken')

const {MongoClient} = require('mongodb')
const URL = "mongodb://127.0.0.1:27017"
const client = new MongoClient(URL)

async function verifyToken(req , res , next)
{
    if (!req.headers.myauthorizhation){
       return res.status(400).send({msg : "Invalid Request "})
    }
    let token = req.headers.myauthorizhation.split(' ')[1];
    if (token === null)
    {
        return res.status(400).send({msg : "Invalid Request"})
    }
    try {
        let payload = jsonwebtoken.verify(token , "Hanuman")
        if (!payload)
        {
            return res.status(400).send({msg:"Invalid Reuest"})
        }
    }
    catch ( e)
    {
        // console.log(e);
        return res.status(400).send({msg:"Invalid Reuest"})

    }
    console.log("Inside Next");
    next();
}

async function getConnection (param) 
{
    let conn =  await client.connect();
    if (!conn)
    {
        console.log("Connection to database failed");
    }
    let db = await conn.db("EventHub") 
    if (param === "user")
    {
        return (await db.collection("users"))
    }
    else if (param == "events")
    {
        return await db.collection("events")
    }
    else if (param == "special") 
    {
        return (await db.collection("specialEvents"))
    }
}

router.use(bodyParser.json());
router.use(cors());

router.get('/' , (req, res) => {
    res.status(200).send("Hello from routes")
})

router.get("/events" , async(req , res)  => {
    let conn = await getConnection("events")
    res.status(200).send((await conn.find({}).toArray() ))
}  )

router.get("/specialEvents" ,verifyToken ,  async(req , res)  => {
    let conn = await getConnection("special")
    res.status(200).send((await conn.find({}).toArray() ))
}  )

router.post("/register" , async(req ,res) => {
    console.log(req.headers.myauthorizhation);
    let conn = await  getConnection("user")

    if ( await conn.findOne({"username" : req.body.username }))
    {
        res.status(400).send({msg : "User Already Regsiter"})
    }
    else 
    {
       let  query = await conn.insertOne({"username" : req.body.username , "password" : req.body.password})
        if (query.acknowledged)
        {
            let payload = {subject : query.insertedId}
            let token = jsonwebtoken.sign(payload , "Hanuman")
            console.log(token);
            res.status(200).send({ token , msg : "Registreation Succesful" })
        }
    }
})

router.post("/login" , async(req ,res) => {
    console.log(req.headers.Myauthorizhation );

    let conn = await  getConnection("user")

    if ( await conn.findOne({"username" : req.body.username }))
    {
        let query = await conn.findOne({"username" : req.body.username  , "password" : req.body.password}) 
        if ( query)
        {
            let payload = {subject : query._id}
            let token = jsonwebtoken.sign(payload , "Hanuman")
         res.status(200).send({ token , msg : "Login Success" })
        }
        else 
        {
            res.status(400).send("Password Not Matched ")
        }
    }
    else 
    {
        res.status(400).send({msg : "Account Not Found ! Please Login"})

    }
})

module.exports = router