const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');
const multer= require('multer')
const path=require('path')
const fileFilter=(req,file,cb)=>{
  if (file.mimetype==='image/jpeg'|| file.mimetype==='image/png'){
    cb(null,true)
  }else{
    cb(new Error('please upload jpeg or png'),false)
  }
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'productImage');
    },
    filename: (req, file, cb) => {
      const name = Date.now();
      const extname = path.extname(file.originalname);
      cb(null, file.originalname + '-' + name + extname);   
    },
    

  });
  
  const upload = multer({
    storage: storage,
    dest: 'productImage',
    limits: {
      fileSize: 1024 * 1024 *5
    },
    fileFilter:fileFilter

  });
router.post('/addProduct', upload.single('myfile'),(req, res) => {
    
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.path
    });
    newProduct.save()
        .then(result => {
            res.status(200).json({ message: result });
        })
        .catch(err => {
            res.status(404).json({ message: err.message, message1: 'Error' });
        });
});
router.get('/', (req, res) => {
    Product.find().then(dco => {
        const dcos = {
            dco: dco.map(dco => {
                return {
                    name: dco.name,
                    price: dco.price,
                    _id: dco._id,
                    getpr: {
                        type: 'get',
                        url: `localhost:3000/product/product/${dco._id}`
                    }
                };
            })
        };
        res.status(200).json({
            message: dcos
        });
    }).catch(err => {
        res.status(404).json({
            message: err.message
        });
    });
});
router.get('/product/:id', (req, res) => {
    Product.findById({ _id: req.params.id }).then(dco => {
        res.status(200).json({ message: dco })
    }).catch(err => {
        res.status(404).json({ message: err })
    })
})
router.delete('/delete/:id', (req, res) => {
    Product.findOneAndDelete({ _id: req.params.id }).then(result => {
        res.status(202).json({
            message: "User delete successfully"
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});
router.put('/update/:id', (req, res) => {
    const up = {
        name: req.body.name,
        price: req.body.price,
        image:req.file.path
    }
    Product.updateOne({ _id: req.params.id }, { $set: up }).then(result => {
        res.status(202).json({
            message: "User updated successfully"
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});
module.exports = router;