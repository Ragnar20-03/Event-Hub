const express = require('express');

const app = express();

const PORT = 5100;

app.listen(PORT , () => {
    console.log(":Server is Running on Port Number"  + PORT);
})

app.get('/' , ( req , res) => {
    res.send("Hello From the App ..");
})