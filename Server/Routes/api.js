const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json())

const { MongoClient } = require('mongodb');
const URL = "mongodb://127.0.0.1:27017";
const Client = new MongoClient(URL);

const jwt = require('jsonwebtoken');


 function verifyToken(req , res , next) {
    console.log("inside verify");
    if (!req.headers.authorization)
    {
        return res.status(401).send("Unauthorized Request")
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null')
    {
        return   res.status(401).send("Unauthorized Request")
    }
    console.log("inside verify 1");

    
        let payLoad = jwt.verify(token , 'EventHub')
        if (!payLoad)
        {
            return   res.status(401).send("Unauthorized Request")
        }
        req.username = payLoad.subject
        // console.log(username);
        next();
    
    
        
    }


async function getConnection( params) {
    let conn = await Client.connect();
    if (!conn) {
        console.log("Server Connection with Database Failed ");
        return;
    }
    let db = conn.db("EventHub")
    if ( params == 1)
    {
        return db.collection("events");
    }
    else if ( params == 2)
    {
        return db.collection("specialEvents");
    }
    else if( params == 3)
    {
        return db.collection("users");
    }
    else 
    {
        console.log("Invalid Parameter to Get Connection");
    }
}

router.get('/events' , async (req , res) => {
    let  collection = await getConnection(1);
    res.status(200).send(await collection.find({}).toArray());
})

router.get('/specialevents' , verifyToken ,  async (req , res) => {
    let  collection = await getConnection(2);
    res.status(200).send( await collection.find({}).toArray());
})


router.post('/register' , async(req , res) => {
    let collection = await getConnection(3);
    let data = await collection.find({}).toArray();
    let iCnt = 0 ; 
    for (iCnt = 0 ; iCnt < data.length ; iCnt++)
    {
        if (data[iCnt].username == req.body.username )
        {
            res.status(403).send({msg : "Already Registered ! please Login"})
            break;
        }
    }
    if (iCnt == data.length)
    {
        let query =  await collection.insertOne({username : req.body.username , password : req.body.password});
        console.log(query.insertedId);
        if (query.acknowledged)
        {
            let payload = {subject : query.insertedId }
            let token = jwt.sign(payload , 'EventHub')
            console.log(token);
            res.status(200).send({msg : "Registration succesful" , token})

        }
        else 
        {
            res.status(403).send("Unkown error Ocuured")
        }

    }
})


router.post('/login' , async (req , res) => {
    console.log("Inside Login");
    let collection = await getConnection(3);
    let data = await collection.find({}).toArray();
    let iCnt = 0 ; 
    for (iCnt = 0 ; iCnt < data.length ; iCnt++)
    {
        if (data[iCnt].username == req.body.username)
        {
            if (data[iCnt].password == req.body.password)
            {
                let payload = {subject : data[iCnt]._id};
                let token = jwt.sign(payload , 'EventHub')
                res.status(200).send({ msg : "Login Succesful" , token })
            }
            else 
            {
                res.status(403).send({msg : "Password Not Mathced"})
            }
            break;
        }
    }
    if (data.length == iCnt)
    {
        res.status(404).send({ msg : "Account Not Found"})
    }
})



router.get('/', (req, res) => {
    res.send("Hello from api")
})



module.exports = router