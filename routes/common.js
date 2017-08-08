var express = require('express')
var router = express.Router()
var formidable = require('formidable')
var fs = require('fs')
var AVATAR_UPLOAD_FOLDER = '/avatar/'
//图片上传
router.all('/upload', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    form.avatarName = Math.random().toString(16).substring(2)
    form.extName = ''
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.locals.error = err;
            return;
        }
         //后缀名
        if (files.fulAvatar == undefined) { return }
        var result = JSON.parse(JSON.stringify(files.fulAvatar))
        switch (result.type) {
            case 'image/pjpeg':
                form.extName = 'jpg';
                break;
            case 'image/jpeg':
                form.extName = 'jpg';
                break;
            case 'image/png':
                form.extName = 'png';
                break;
            case 'image/x-png':
                form.extName = 'png';
                break;
        }
        if (form.extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            return;
        }
        var newPath = form.uploadDir + form.avatarName+'.'+form.extName;
        fs.renameSync(result.path, newPath);  //重命名
    });
    res.send({ message: '上传成功', code: 0, result: AVATAR_UPLOAD_FOLDER + form.avatarName })
});
//商铺分类
router.get('/getCategory',function(req,res,next){
  fs.readFile('../data/category.js', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步读取: " + data.toString());
});
})
module.exports = router;