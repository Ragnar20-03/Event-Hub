const express = require('express');
const router = express.Router();

const {MongoClient, ReturnDocument} = require ( 'mongodb');
const URL = "mongodb://127.0.0.1:27017"
const client = new MongoClient(URL);


async function getConnection () {
    let result = await client.connect();
    let database = (await result).db("EventHub");
    if (database)
    {
        console.log("Succes Connection");
    }
    return await database.collection("users");
}
async function getConnectionEvents () {
    let result = await client.connect();
    let database = (await result).db("EventHub");
    if (database)
    {
        console.log("Succes Connection");
    }
    return await database.collection("events");
}
async function getConnectionSpecialEvents () {
    let result = await client.connect();
    let database = (await result).db("EventHub");
    if (database)
    {
        console.log("Succes Connection");
    }
    return await database.collection("specialevents");
}

router.get('/' , (req , res) => {
    res.send("Hello From API..")
})

router.post('/register' , async (req , res) => {
    let userdata = req.body;
    let conn = await getConnection();

    let data = await ReadUser();
    console.log(data);
    let iCnt = 0;   
    for (iCnt = 0; iCnt < (await data).length ; iCnt ++)
    {
        if ( data[iCnt].email == userdata.email)
        {
            res.status(400).send("Alredy Register with this Email !");
            break;
        }
    }
    if (iCnt == (await data).length)
    {
        let query = await conn.insertOne({email : userdata.email , password : userdata.password});
        if (query.acknowledged)
        {
            res.status(200).send("Succesfully Registerd");
        }
    }
})

router.post('/login' , async (req, res)=> {
    let conn = await getConnection();
    let userdata = req.body;
    let data  = await ReadUser();
    let iCnt = 0 ;
    for (iCnt = 0 ; iCnt < data.length; iCnt++)
    {
        if (data[iCnt].email == userdata.email)
        {
            if ( data[iCnt].password == userdata.password)
            {
                res.status(400).send("Succesfully Login .. ");
                break;
            }
            else
            {
                res.status(400).send("Password didn't  Match .. ");
                break;
            }
        }
    }
    if ( data.length == iCnt)
    {
        res.status(404).send("No Account with That email ..");
    }
})

router.get('/events' , async (req , res) => {
    let data = await Events();
    res.status(200).send(data);
})
router.get('/specialevents' , async (req , res) => {
    let data = await SpecialEvents();
    res.status(200).send(data);
})

module.exports = router;

async function ReadUser ()
{
    let conn = await getConnection();
    let query = await conn.find({}).toArray();
    return query;
}
async function Events () 
{
    let conn = await getConnectionEvents();
    let data = await conn.find({}).toArray();
    return data;
}
async function SpecialEvents () 
{
    let conn = await getConnectionSpecialEvents();
    let data = await conn.find({}).toArray();
    return data;
}