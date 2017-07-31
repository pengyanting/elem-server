var mysql = require('mysql');//调用mysql模块

var pool = mysql.createPool({
    host: 'localhost',  //表示本地的数据库  
    user: 'root',       //账号  
    password: '', //密码  
    database: 'elem'    //库名  
})

var db = {};
db.con = function (callback) {   //callback是回调函数，连接建立后的connection作为其参数  
    pool.getConnection(function (err, connection) { //创建一个链接  
        if (err) {      //对异常进行处理  
            throw err;  //抛出异常  
        } else {
            callback(connection);   //如果正常的话，执行回调函数（即请求），具体请求在回调函数中写  
        }
        connection.release();   //释放连接  
    })
}
module.exports = db;  