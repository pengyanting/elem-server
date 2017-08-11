var express = require('express');
var router = express.Router();
var food = require('../modules/food');
var common = require('../modules/common');
//添加食品种类
router.post('/category/add', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const _food = new food({
        category: req.body
    })
    _food.categoryAdd(function (err, result) {
        if (err) {
            console.log(err);
            res.send({ message: 'error', err: err, code: 1 });
            return;
        }
        res.send({ message: 'success', code: 0, result: result })
    })
})
//查询食品种类
router.post('/category/query/:shopid', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*")
    const _food = new food({ shopid: req.body.shopid })
    _food.queryCategory(function (err, result) {
        if (err) {
            res.send({ message: 'err', err: err, code: 1 })
            return
        }
        res.send({ message: 'success', code: 0, result: result })
    })
})
//添加食品
router.post('/add', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const _food = new food({ foodForm: req.body })
    _food.addFood(function (err, result) {
        if (err) {
            res.send({ message: 'err', err: err, code: 1 })
            return
        }
        res.send({ message: 'success', code: 0, result: result })
    })
})

//添加规格
router.post('/specification/add',function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    const _food = new foof({specifForm:req.body})
    _food.addSpecifications(function(err,result){
        if (err) {
            res.send({ message: 'err', err: err, code: 1 })
            return
        }
        res.send({ message: 'success', code: 0, result: result })
    })
})
module.exports = router