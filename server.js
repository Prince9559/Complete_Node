const express = require("express");
const app = express();
const port = 5500;
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const personRouter=require('./routes/personRouter');
const menuRouter=require('./routes/menuRouter');

app.use('/person',personRouter);
app.use('/menu',menuRouter);


app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
