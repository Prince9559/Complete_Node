const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const {jwtAuthMiddleware, generateToken}=require('./../jwt');

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("Data saved");

    const payload={
      id:response.id,
      username:response.username
    }
    const token=generateToken(payload);
    console.log("Token is :",token);

    res.status(200).json({response:response, token:token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//login route

router.post('/login',async(req,res)=>{
  try{
    const {username,password}=req.body;
    const user=await Person.findOne({username:username});

    if(! user || (!await user.comparePassword(password))){
      return res.status(401).json({error:'Invaild username or password'});
    }

    const payload={
      id:user.id,
      username:user.username
    }

    const token=generateToken(payload);
    res.json({token});

  }catch(err){

    console.log(err);
    res.status(500).json({error:'Internal server error !'});

  }
})


// Profile route

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
  try{
    const userData=req.user;
    
    const userId=userData.id;
    const user=await Person.findById(userId);
    res.status(200).json({user});
    console.log(req.user);
console.log(userId);

  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

router.get("/",async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetch!");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invaild work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPerson = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPerson, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("Data Updated !");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Intertnal server error !" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    console.log("Person Deleted Sucessfully !");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
