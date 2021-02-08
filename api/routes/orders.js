const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');


// Handle incoming GET requests to /orders
router.get('/', (req, res, next) =>{
   Order.find()
   .select('product quantity')   
   .populate('product', 'name')
   .exec()
   .then(docs => {
       res.status(200).json({
           count: docs.length,
           orders: docs.map(doc => {
               return {
               _id: doc._id,
               product: doc.product,
               quantity: doc.quantity,
               request: {
                   type: 'GET',
                   url: 'http://localhost:2000/orders/' + doc._id
               }
            }
           })
       });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({
            error: err
       });
   });
});

// Handle incoming POST requests to /orders
router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
      .then(product => {
          if(!product){
              return res.status(404).json({
                  message: 'Product not Found'
              });
          }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
            
        });
         return order
        .save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:2000/orders/' + result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:orderId', (req, res, next) =>{
    const id = req.params.orderId;
    Order.findById(id)
        .select('quantity product')
        .populate('product')
        .exec()
        .then(order => {
            if (!order){
                res.status(404).json({
                    message: 'Order not found'
                })
            }
            res.status(200).json({
               order: order,
               request: {
                   type: 'GET',
                   url: 'http://localhost:2000/orders'
               } 
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    
})

router.patch('/:orderId', (req, res, next) =>{
   res.status(200).json({
       message: 'updated product'
   });
})

router.delete('/:orderId', (req, res, next) =>{
    const id = req.params.orderId;
     Order.findByIdAndDelete(id)
        .exec()
        .then(doc => {
            res.status(200).json({
                message: 'Successfully deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:2000/orders',
                    body: { productId: 'ID', quantity: 'NUMBER'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
 })




module.exports = router;