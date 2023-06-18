const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const api = require('./Routes/api');

app.use(bodyParser.json());
app.use('/api' , api);

const PORT = 5100;

app.listen(PORT , () => {
    console.log(":Server is Running on Port Number"  + PORT);
})

app.get('/' , ( req , res) => {
    res.send("Hello From the App ..");
})