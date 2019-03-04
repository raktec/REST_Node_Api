const express = require('express');
const productRoutes = require("./api/route/products");
const orderRoutes = require("./api/route/orders");

const app = express();

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:"Its Work"
//     });

// });

module.exports = app;