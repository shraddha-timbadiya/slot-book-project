const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const slotRoute = require('./routes/slot-route')
require("dotenv").config();

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/api',slotRoute );


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
app.listen(port,()=>{
    try{
        console.log(`server running on port ${port}`)
    }catch(e){
        console.log(e)
    }
})