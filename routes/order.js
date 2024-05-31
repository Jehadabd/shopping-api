var express = require('express');
var router = express.Router();
const newOrder = require('../Models/Order');
const Order = require('../Models/Order');


router.post('/addOrder', (req, res) => {
    const newOrder = new Order({
        user: req.body.user,
        product: req.body.product
    });
    newOrder.save().then(result => {
        res.status(200).json({
            message: ` Done  New Order ${result}`
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message
        });
    });
});
router.get('/', (req, res) => {
    Order.find().populate('user',"name").then(result => {
        res.status(200).json({
            message: result
        })
    }).catch(err => {
        res.status(404).json({
            message: err.message
        });
    });
});

router.patch('/updateOrder/:id', (req, res) => {
    let newProuct = req.body.product;
    Order.find({ _id: req.params.id }).then(dco => {
        let oldProduct = dco[0].product;


        for (let indexOfnewProduct = 0; indexOfnewProduct < newProuct.length; indexOfnewProduct++) {
            for (let indexOfOldProduct = 0; indexOfOldProduct < oldProduct.length; indexOfOldProduct++) {

                if (newProuct[indexOfnewProduct]._id == oldProduct[indexOfOldProduct]._id) {
                    oldProduct[indexOfOldProduct].Quantity = String(parseInt(oldProduct[indexOfOldProduct].Quantity) + parseInt(newProuct[indexOfnewProduct].Quantity));


                } else {
                    oldProduct.concat(newProuct[indexOfnewProduct])

                }
            }

        }


        const newProduct = {
            product: oldProduct
        }

        Order.updateOne({ _id: req.params.id }, { $set: newProduct }).then(result => {


        }).catch(err => {
            res.status(404).json({
                message: err.message
            });
        });
        res.status(200).json({
            message: newProduct
        });
    }).catch(err => {
        res.status(404).json({
            message: err.message
        });
    });
});
router.delete('/delete/:id', (req, res) => {
    Order.findOneAndDelete({ _id: req.params.id }).then(result => {
        res.status(202).json({
            message: "User delete successfully"
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});

module.exports = router