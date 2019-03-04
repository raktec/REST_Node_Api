const express = require('express');
const productRoutes = require("./api/route/products");
const orderRoutes = require("./api/route/orders");

const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

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