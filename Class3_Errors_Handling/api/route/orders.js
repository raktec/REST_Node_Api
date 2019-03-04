const express = require('express');

const router = express.Router();
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message :"Handing get request to /orders"
    });

});

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message :"Handing post request to /orders"
    });

});

router.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
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

router.patch('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        message : 'Updated product',
        id : id
    });
});

router.delete('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        message : 'Product deleted',
        id : id
    });
});

module.exports = router;