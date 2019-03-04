const express = require('express');

const router = express.Router();
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message :"Order were fetches"
    });

});

router.post('/',(req,res,next)=>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message :"order was created",
        order: order
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