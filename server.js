const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();



const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT =process.env.PORT || 5500;

const personRouter=require('./routes/personRouter');
const menuRouter=require('./routes/menuRouter');

app.use('/person',personRouter);
app.use('/menu',menuRouter);



app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
