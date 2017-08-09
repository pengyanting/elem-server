var express = require('express');
var router = express.Router();
var admin = require('../modules/admin');
var common = require('../modules/common');


router.post('/login', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var newAdmin = new admin({
        name: req.body.name,
        password: req.body.password,
        address: '上海',
    })
    newAdmin.getByName(function (err, result) {
        if (err) {
            res.send({ err: err, code: 1 })
            console.log(err)
            return;
        }
        if (result == null) {//未注册直接去注册
            newAdmin.save(function (err, result) {
                if (err) {
                    res.send({ err: err, code: 1 })
                    console.log(err)
                    return
                }
                res.send({ message: 'success', code: 0, result: '' })
            })
        } else {
            //已经注册过，则校验密码
            if (result.password == req.body.password) {
                res.send({ message: 'success', code: 0, result: '' });
            } else {
                res.send({ err: '密码错误或账号已被注册', code: 2, result: '' })
            }
        }
    })
})

router.post('/getUser', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var newAdmin = new admin({
        pageSize: 10,
        pageIndex: Number(req.body.pageIndex) - 1
    })
    var _common = new common({ type: 'user' })
    _common.getCount(function (err, result) {
        if (err) {
            res.send({ err: err, code: 1 });
            return;
        }
        var count = JSON.parse(JSON.stringify(result).replace('(0)', ''))[0].count;
        if (count == 0) {
            res.send({
                message: 'success',
                code: 0,
                result: [],
                total: count,
                pageSize: 10,
                pageIndex: req.body.pageIndex
            })
        } else {
            newAdmin.getUser(function (err, result) {
                if (err) {
                    res.send({ err: err, code: 1 });
                    return;
                }
                res.send({
                    message: 'success',
                    code: 0,
                    result: result,
                    total: count,
                    pageSize: 10,
                    pageIndex: req.body.pageIndex
                })
            })
        }
    })

})
router.post('/getAdmin', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var newAdmin = new admin({
        pageSize: 10,
        pageIndex: Number(req.body.pageIndex) - 1
    })
    var _common = new common({ type: 'manager' })
    _common.getCount(function (err, result) {
        if (err) {
            res.send({ err: err, code: 1 });
            return;
        }
        var count = JSON.parse(JSON.stringify(result).replace('(0)', ''))[0].count
        if (count == 0) {
            res.send({
                message: 'success',
                code: 0,
                result: [],
                total: count,
                pageSize: 10,
                pageIndex: req.body.pageIndex
            })
        } else {
            newAdmin.getManager(function (err, result) {
                if (err) {
                    res.send({ err: err, code: 1 });
                    return;
                }
                res.send({
                    message: 'success',
                    code: 0,
                    result: result,
                    total: count,
                    pageSize: 10,
                    pageIndex: req.body.pageIndex
                })
            })
        }
    })
})
module.exports = router;