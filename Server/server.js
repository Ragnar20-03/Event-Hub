const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

const api = require('./Routes/api');
app.use('/api' , api)


const PORT = 5100;

app.listen(
PORT ,      () => {
    console.log("Server Started at Prot No . " + PORT);
})


app.get('/' , (req , res) =>{
    res.send("Hello From Server")
})