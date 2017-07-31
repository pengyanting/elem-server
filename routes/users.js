var express = require('express');
var router = express.Router();
var db = require('../modules/db');
router.post('/login', function (req, res, next) {
  //解决跨域
  res.setHeader('Access-Control-Allow-Origin', 'http://10.7.34.231:8089');
  console.log(req.body.phone)
  db.con (function (connection) {
    connection.query('select id from user where phone= "'+req.body.phone+'"',function(error,result){
      if(error) throw error
      if(JSON.stringify(result)=='[]'){//手机号未注册，自动注册
        connection.query('INSERT INTO user(name,phone) VALUES (?,?)',['aa',req.body.phone],function(error,result){
          if(error) throw error
          result=JSON.parse(JSON.stringify(result).replace('OkPacket'));
          res.send({
            message:'success',
            id:result.insertId
          })
        })
      }else{//手机号因存在
        res.send({
          message:'success',
          id:result[0].id
        })
      }
    })
  })
})

module.exports = router;
