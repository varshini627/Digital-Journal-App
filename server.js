const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));


let journals = [];


if (fs.existsSync("./data/journals.json")) {

    journals = JSON.parse(
        fs.readFileSync("./data/journals.json")
    );

}



// Get all journals

app.get("/journals", (req,res)=>{

    res.json(journals);

});




// Create journal

app.post("/journals",(req,res)=>{


    const journal = {

        id: Date.now(),

        title:req.body.title,

        content:req.body.content,

        mood:req.body.mood,

        date:new Date()

    };


    journals.push(journal);


    fs.writeFileSync(
        "./data/journals.json",
        JSON.stringify(journals,null,2)
    );


    res.json(journal);

});




// Update journal

app.put("/journals/:id",(req,res)=>{


    let journal = journals.find(
        j => j.id == req.params.id
    );


    if(!journal){

        return res.json({
            message:"Not found"
        });

    }


    journal.title = req.body.title;

    journal.content = req.body.content;

    journal.mood = req.body.mood;



    fs.writeFileSync(
        "./data/journals.json",
        JSON.stringify(journals,null,2)
    );


    res.json(journal);


});




// Delete journal

app.delete("/journals/:id",(req,res)=>{


    journals =
    journals.filter(
        j => j.id != req.params.id
    );


    fs.writeFileSync(
        "./data/journals.json",
        JSON.stringify(journals,null,2)
    );


    res.json({
        message:"Deleted"
    });


});




// Start server

app.listen(3000,()=>{

    console.log(
        "Server running at http://localhost:3000"
    );

});