const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const api = require('./routes/api')

app.use(bodyParser.json());
app.use('/api' , api)
app.use(cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");

    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept");

    next();
});

const PORT = 3000;
app.listen( PORT , ()=> { console.log("|Server Started on port number :" + PORT)});
app.get('/' , (req , res)=> {res.send("Hello From Server")})