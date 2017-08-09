const express = require('express');
const router = express.Router();
const shop = require('../modules/shop');
const common = require('../modules/common')

router.post('/add', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const newShop = new shop({
        formData: req.body
    })
    newShop.add(function (err, result) {
        if (err) {
            console.log(err);
            res.send({ err: err, code: 1 })
            return;
        }
        res.send({ message: 'success', code: 0 })
    })
})

router.post('/query', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const newShop = new shop({
        pageSize: 10,
        pageIndex: Number(req.body.pageIndex) - 1
    })
    const _common = new common({ type: 'shop' });
    _common.getCount(function (err, result) {
        if (err) {
            res.send({ err: err, 'message': '查询总数出错', code: 1 })
            return;
        }
        const count = JSON.parse(JSON.stringify(result).replace('(0)', ''))[0].count
        if (count == 0) {
            res.send({ message: 'success', code: 0, result: [], total: count, pageSize: 10, pageIndex: req.body.pageIndex });
        } else {
            newShop.query(function (err, result) {
                if (err) {
                    res.send({ err: err, code: 1 })
                }
                res.send({ message: 'success', code: 0, result: result, total: count, pageSize: 10, pageIndex: req.body.pageIndex })
            })
        }
    })
})

module.exports = router