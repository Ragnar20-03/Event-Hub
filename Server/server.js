const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const api = require('./routes/api')

app.use(bodyParser.json());
app.use('/api' , api)

const PORT = 3000;
app.listen( PORT , ()=> { console.log("|Server Started on port number :" + PORT)});
app.get('/' , (req , res)=> {res.send("Hello From Server")})