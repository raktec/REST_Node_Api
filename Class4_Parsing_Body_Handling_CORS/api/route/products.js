const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message :"Handing get request to /products"
    });

});

router.post('/',(req,res,next)=>{
    const product = {
        name: req.body.name,
        price: req.body.price   
    }
    res.status(200).json({
        message :"Handing post request to /products",
        createProduct: product
    });

});

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    if (id === "special"){
        res.status(200).json({
            message :"You discovered the special id",
            id : id
        });
    }else {
        res.status(200).json({
            message :"You passed id",
            id : id
        });

    }
});

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    res.status(200).json({
        message : 'Updated product',
        id : id
    });
});

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    res.status(200).json({
        message : 'Product deleted',
        id : id
    });
});

module.exports = router;