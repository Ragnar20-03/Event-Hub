const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const router  = require('./routes')
app.use('/api' , router)

app.listen(5100 , () => {
    console.log("Server started on 5100");
})

app.get('/' , (req , res) =>{
    res.status(200).send("Server is running ")
})