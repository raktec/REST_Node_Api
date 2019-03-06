const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require("./api/route/products");
const orderRoutes = require("./api/route/orders");
const userRoutes = require("./api/route/users");

mongoose.connect("mongodb://localhost:27017/shopping", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;

const morgan = require('morgan');

const app = express();


app.use(morgan('combined'));
// app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow_Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Autorization"
    );
    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT","POST","PATCH","DELETE");
        return res.status.json({})
    }
});


app.use((req,res,next)=>{
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;