var db = require('./db')  
function User(user) {       // 这是一个User类，传递的参数是一个对象，这个对象可以具有两个属性，分别是name和password  
    this.name = user.name;  // 如果传递的user不是空，那么将其赋值给User类的实例的name属性  
    this.phone = user.phone;  // 同上，赋给password属性 
    this.id=user.id,
    this.password=user.password
}  

// 这个是插入方法  
User.prototype.save = function (callback) {  
    var self = this  
    if (this.phone.length == 0 || this.name.length == 0) {    //如果在没账号/密码的情况下就调用插入方法，则提示错误并返回  
        console.log("You can't save user information without NAME or PASSWORD!");  
        return callback("You can't save user information without NAME or PASSWORD!");  
    }  
    db.con(function (connect) {  
        // 数据库的表名为user，字段名为name和password  
        connect.query("INSERT INTO user(name,phone) VALUES (?,?)", [self.name, self.phone], function (err, result) {  
            // 上面的两个问号，表示第二个参数的self.name和self.password依次被替换到问号的位置；  
            // 需要注意的是：  
            // ①必须以数组形式依次排列；  
            // ②必须是字符串形式（不能是number）  
            if (err) {  //如果出错，那么错误信息作为回调函数的参数返回  
                console.log("INSERT name:" + self.name + ", password:" + self.password + " error, the err information is " + err);  
                return callback(err);  
            }  
            callback(null, JSON.parse(JSON.stringify(result).replace('OkPacket',''))); //如果正常执行，那么第一个参数为null（无错误），第二个参数为返回的结果  
        })  
    })  
}  
// 这个是查询方法  
User.prototype.get = function (callback) {  
    var self = this;  
    if (this.phone.length == 0) {    //如果在没账号/密码的情况下就调用插入方法，则提示错误并返回  
        console.log("You can't select user information without NAME!");  
        return callback("You can't select user information without NAME!");  
    }  
    var selectResult;  
    db.con(function (connect) {
        connect.query('select * from user where phone = ?', [self.phone], function (err, result) {  
            if (err) {  //报错  
                console.log("select name:" + self.name + " error, the err information is " + err);  
                return callback(err);  
            }  
            //注意，这里返回的是带账号和密码的，另外，理论上是有可能有多个元素的，但由于在注册时，用户名限制了重复，因此只会返回一个  
            selectResult =  JSON.parse(JSON.stringify(result).replace('RowDataPacket', ''));  //这里的result是一个数组，只包含一个元素（或者是空）  
            if (selectResult.length) {  //查询到的话，数组是有元素的（即length > 0）  
                return callback(null, selectResult[0]) //这里的selectResult就是user对象，包含name和password属性  
            } else {  
                return callback(null, null);    //如果查询不到，两个参数都为空  
            }  
        })  
    })  
}  
//修改用户名
User.prototype.updateName=function(callback){
  var self=this;
  if(this.id.length==0){
      console.log('id不能为空');
      return callback('id不能为空')
  }
    db.con(function(connect){
        connect.query('UPDATE `user` SET `name`=? , `isUpdateName`="1" WHERE `id`=? ',[self.name,self.id],function(err,result){
            if(err){
                console.log(err)
                return callback(err)
            }
            callback(null,result);
        })
    })
}
//通过id获取用户信息
User.prototype.getById=function(callback){
    var self=this;
    if(self.id.length===0){
        console.log('id不能为空');
        return callback('id不能为空');
    }
    db.con(function(connect){
        connect.query('select * from user where id=?',[self.id],function(err,result){
            if(err){
                console.log(err);
                return callback(err);
            }
            callback(null,JSON.parse(JSON.stringify(result).replace('RowDataPacket',''))[0])
        })
    })
}
//修改密码
User.prototype.updatePwd=function(callback){
    var self=this;
    if(self.id.length==0||self.password.length==0){
        console.log('id或password不能为空');
        return callback('id或password不能为空');
    }
    db.con(function(connect){
        console.log(self.password)
        connect.query('update user set password=? where id=?',[self.password,self.id],function(err,result){
            if(err){
                console.log(err);
                return callback(err);
            }
            callback(null,JSON.parse(JSON.stringify(result).replace('RowDataPacket','')))
        })
    })
}
module.exports = User; 