
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose')
var indexRouter = require('./routes/index');
var productRouter=require('./routes/product')
var usersRouter = require('./routes/user');
const orderRouter=require('./routes/order')
var app = express();
mongoose.connect('mongodb://localhost:27017/shopping')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'productImage')));

app.use((err,req,res,next)=>{
    res.locals.message=err.message;
    res.locals.error=res.app.get('evn')==='development'?err:{}
    res.status(err.status||500);
    res.join({
        message:err.message
    })
})

app.use('/', indexRouter);

app.use('/user',usersRouter)
app.use('/product',productRouter)
app.use('/order',orderRouter)
module.exports = app;