const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require("../models/product");

router.get('/', (req, res, next) => {

    Product.find()
    .exec()
    .then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
        // if(docs.length >= 0){
        //     res.status(200).json(docs);
        // }else{
        //     res.status(404).json({
        //         message:"NO entries found"
        //     });
        // }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    }
    );
});

router.post('/', (req, res, next) => {

    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price

    });

    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handing post request to /products",
            createProduct: result
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });


});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From Database" ,doc);
            res.status(200).json({ doc });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });

        });

});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;

    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;    
    }
    Product.update({_id:id},{ $set: updateOps })
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(error);
        res.status(500).json({
            error:err
        });
    });


    // Product.update({_id:id},{ $set:{name:req.body.newName,price:req.body.newPrice}});



    // res.status(200).json({
    //     message: 'Updated product',
    //     id: id
    // });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);

    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });



    // res.status(200).json({
    //     message: 'Product deleted',
    //     id: id
    // });
});

module.exports = router;