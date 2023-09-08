//Code that we can use to generate ids
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")
const path = require('path');
let notes = require("../db/db.json")
const express = require("express")
const router = express.Router()

// let notes = notesData
//This saveNotes function will transfer data to db.json
const saveNotes = (notes) => {
    fs.writeFileSync(path.resolve(__dirname, "../db/db.json"), JSON.stringify(notes))
}

router.get("/notes", (req, res) => {
    console.log("Hello");
    res.json(notes)
})
//     let allNotes = notes.map((note,index) => ({
// ...note,
// id: index

// res.json(notes)
//     }))

// })

router.post("/notes", (req, res) => {
    console.log(req.body)
    req.body.id = uuidv4()
    console.log(req.body)
    notes.push(req.body)
    saveNotes(notes)
    res.json(notes)

})

router.delete("/notes/:id", (req, res) => {
   console.log(req.params.id);
   //notes.splice(req.params.id, 1);
   notes = notes.filter((note)=> note.id !== req.params.id)
   saveNotes(notes)
   res.json(notes)
})

module.exports = router;