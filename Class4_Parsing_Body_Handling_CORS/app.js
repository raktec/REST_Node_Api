const express = require('express');
const productRoutes = require("./api/route/products");
const orderRoutes = require("./api/route/orders");
const bodyParser = require('body-parser');

const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

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