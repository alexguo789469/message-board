const express = require('express');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/message")

var Schema = mongoose.Schema;
const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date()
    }
})

const Message = mongoose.model("Message", messageSchema);

const router = express.Router()

//Get post
router.get("/", (req, res) => {
    Message.find()
    .then(function(data){
        res.send(data);
    })
    .catch(function(err){
        console.log(err);
        res.json({
            err_code: 500,
            err_message: err.message
        })
    })
})

//Get By text 请求
// router.get("/ByText/:text", (req, res)=> {
//     Message.find({
//         text: req.params.text
//     }).then(function(data){

//         if(data.length == 0){
//             return res.status(201).send();
//         }
//         return res.status(200).send();

//     }).catch(err => {
//         console.log(err);
//         res.json({
//             err_code: 500,
//             err_message: err.message
//         })
//     })
// })

//add post 
router.post("/", (req, res) => {
    new Message({
        text: req.body.text
    }).save().then(function(data){
        res.status(201).send();
    }).catch(function(err){
        console.log(err);
        res.json({
            err_code: 500,
            err_message: err.message
        })
    })
})


//delete post
router.delete("/:id", (req, res) => {
    Message.findByIdAndRemove(req.params.id)
    .then(function(data){
        res.status(200).send()
    }).catch(function(err){
        console.log(err);
        res.json({
            err_code:500,
            err_message: err.message
        })
    })
})

module.exports = router