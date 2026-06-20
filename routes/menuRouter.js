const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("MenuItem Data Saved !");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("MenuItem data fetch sucessfully");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get('/:taste',async(req,res)=>{

    try{

        const tasteType=req.params.taste;

        if(tasteType=='cool' || tasteType=='sweet' || tasteType=='spicy')
        {
            const response=await MenuItem.find({taste:tasteType});
            console.log("response fetch");
            res.status(200).json(response);
        }else
        {
            res.status(404).json({error:'Taste not found'});
        }

    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:'Internal server error'});

    }
})


router.put('/:id',async(req,res)=>{

    try{
    const menuId=req.params.id;
    const updatedMenu=req.body;
 
    const response=await MenuItem.findByIdAndUpdate(menuId,updatedMenu,{
        new:true,
        runValidators:true,
    })
    
    if(!response)
    {
        res.status(404).json({error:'Menu bar not found'});
    }

    console.log("Data Updated sucessfully !");
    res.status(200).json(response);

    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:'Internal server error !'});
    }

})

router.delete('/:id',async(req,res)=>{

    try{

        const menuId=req.params.id;
        const response=await MenuItem.findByIdAndDelete(menuId);

        if(!response)
        {
            res.status(404).json({error:'Menu not found !'});
        }
        console.log("Menu Deleted !");
        res.status(200).json(response);

    }catch(error)
    {
        console.log(error);
        res.status(500).json({error:'Internal server !'});

    }

})

module.exports = router;
