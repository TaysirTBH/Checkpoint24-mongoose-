const express = require('express');
const router = express.Router();
const Person = require('../models/personSchema')


    /*Add Persons to database*/
router.post('/record',(req,res)=>{
    //Create and Save a Record of a Model
    const newOne = req.body
    const newPerson = new Person(newOne);
    newPerson.save()
            .then( data => res.json(data))
            .catch(err => res.status(400).json(err.message))
});

router.post('/create',(req,res)=>{
    //Create Many Records
    const newOne = req.body
    Person.create(newOne)
            .then( data => res.json(data))
            .catch(err => res.status(400).json(err.message))
});

    /*Select data from the Database*/

router.get('/getpersons',(req,res)=>{
    //Find all the people having a given name
    Person.find({name:'nouha'})
            .then( data => res.json(data))
            .catch(err => res.status(400).json(err))
});

router.get('/getbyfood',(req,res)=>{
    //Find one person which has a certain  favorite food  
    Person.findOne({favoriteFood:"orange"})
            .then( data => res.json(data))
            .catch(err => res.status(400).json(err.message))
});

router.get('/getpersonbyid',(req,res)=>{
    //Find person having a given _id
    Person.findById({_id: "60d8562b8779c232a0f00408"})
            .then( data => res.json(data))
            .catch(err => res.status(400).json(err))
});


    /*Update DATA*/

router.post('/findeditupdate',(req,res)=>{
    //Classic Updates by Running Find, Edit, then Save
    let personId = "60d8562b8779c232a0f00408";
    let foodToAdd  =  "hamburger";
    Person.findById({_id:personId},async (err,data)=>{
      data.favoriteFood.push(foodToAdd)
      await data.save();
      done(null,data);
    })
        .then( data => res.json(data))
        .catch(err => res.status(400).json(err.message))
});

router.post('/findandupdate',(req,res)=>{
    //Find a person by Name and set the person's age to 20
    Person.findOneAndUpdate({name: "Mounib"},{$set :{age : 20}},{new:true})
            .then( data => res.json(data))
            .catch(err => res.status(400).json(err.message))
});


    /*Delete data*/
router.delete('/delete/:id',(req,res)=>{
    // Delete One person by his ID
    Person.findByIdAndRemove(req.params.id)
            .then( () => res.json('Successfully deleted'))
            .catch(err => res.status(401).json(err))
});

router.delete('/remove',(req,res)=>{
    // Remove By name
    Person.remove({name:'Marry'})
            .then( () => res.json('Marry is deleted from the database') )
            .catch(err => res.status(401).json(err))
});

    /* Chain Search Query Helpers to Narrow Search Results */
router.get('/helpers',(req,res)=>{
    let foodToSearch = 'burritos';
    Person.find({favoriteFood :foodToSearch})
          .sort({ name: 1 }) // sorting by name
          .limit(2)  // limit to documents
          .select({ age: 0 }) // hide the age
          .exec() // execute the query
          .then( (data) => res.json(data))
          .catch(err => res.status(401).json(err.message))
    });

module.exports = router;