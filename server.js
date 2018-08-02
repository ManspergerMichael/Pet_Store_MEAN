const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
require('mongoose-double')(mongoose);
//var SchemaTypes = mongoose.Schema.Types;
const app = express();
app.use(bodyParser.json());
var path = require('path');
app.use(express.static(__dirname + '/MEANTwo/dist/MEANTwo'));

mongoose.connect('mongodb://localhost/products');
//refrence MEANOne for schema
var productSchema = new mongoose.Schema({
    name:{type:String, required:[true,"Name is required"], minlength:[3,"Name must be at least 3 characters long"]},
    quantity:{type:Number, required:[true,"Quantity is required"], min:[0,"Quantity must be greater than or equal to 0"]},
    price:{type:Number, required:[true,"Price is Required"], min:[0,"Price must be greater than or equal to $0.0"]}
})

mongoose.model('Product',productSchema);
var Product = mongoose.model('Product');

app.get('/getAll', function(req,res){
    Product.find({}, function(err,product){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({data:product})
        }
    })
})

app.get('/find/:id', function(req,res){
    Product.findById({_id:req.params.id}, function(err,product){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({data:product})
        }
    })
})

app.post('/create', function(req,res){
    Product.create({name: req.body.name, quantity: req.body.quantity, price: req.body.price},function(err,product){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", data:product})
        }
    })
})

app.get('/delete/:id', function(req,res){
    Product.findOneAndRemove({_id:req.params.id}, function(err,prod){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", data:prod})
        }
    })
})

app.post('/update/:id', function(req,res){
    Product.findOneAndUpdate({_id:req.params.id}, 
        {
        name:req.body.name,
        quantity:req.body.quantity,
        price:req.body.price
    }, {runValidators:true}, function(err,prod){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", data:prod})
        }
    })
})

app.all("*", (request,response,next) =>{
    response.sendFile(path.resolve('./MEANTwo/dist/MEANTwo/index.html'))
});


app.listen(8000, function(errs){
    console.log("Server at 8000");
})