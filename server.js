const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const passport=require('./auth');

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT =process.env.PORT || 3000;


const logRequest =(req,res,next)=>{
  // console.log(`${new Date().toLocaleString()} Request Mode to : ${req.originalUrl}`);
  next();
}

app.use(logRequest);
app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false})

app.get('/',function(req,res){
  res.send("Welcome to our Hotel");
})


const personRouter=require('./routes/personRouter');
const menuRouter=require('./routes/menuRouter');


app.use('/person',personRouter);
app.use('/menu',menuRouter);



app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
