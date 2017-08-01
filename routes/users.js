var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var User = require('../modules/users');   // 调用刚才封装好的user类  
router.get('/login', function (req, res, next) {
  res.send('aa')
})
//登录
router.post('/login', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var newUser = new User({   //生成一个User的实例，并赋给他name和passowrd属性  
    name: Math.random().toString(16).substring(2),
    phone: req.body.phone  //这里的password是加密过的（存储在数据库里也是加密过后的形式）  
  })
  newUser.get(function (err, result) {
    if (result == null) {//手机号未注册
      newUser.save(function (errs, result) {
        if (result.affectedRows == 1) {
          res.send({
            message: 'success',
            code: 0,
            result: {
              id: result.insertId,
              phone: req.body.phone,
              password: '',
              name: newUser.name
            }
          })
        }
      })
    } else {//手机号已注册
      //如果前端传入密码，通过密码登录
      var resData = {}
      if (req.body.password) {
        if (req.body.password == result.password) {
          resData.message = 'success'
          resData.code = 0
          resData.result = result
        } else {
          resData.message = '输入的密码有误'
          resData.code = 1
        }
      } else {
        //否则通过验证码登录，校验验证码
        if (req.body.checkCode == '111111') {
          resData.message = 'success'
          resData.code = 0
          resData.result = result
        } else {
          resData.message = '输入的验证码有误'
          resData.code = 1
        }
      }
      res.send(resData)
    }
  })
})
router.post('/getUser', function (req, res, next) {
  var newUser = new User({   //生成一个User的实例，并赋给他name和passowrd属性  
    phone: req.body.phone  //这里的password是加密过的（存储在数据库里也是加密过后的形式）  
  })
  newUser.get(function(err,result){
     if(err){
       console.log(err);
       return;
     }
      console.log(result)
  })
})
module.exports = router;
