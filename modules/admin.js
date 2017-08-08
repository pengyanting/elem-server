var db = require('./db');

function admin(user) {
    this.name = user.name
    this.password = user.password
    this.address = user.address
    this.id = user.id,
        this.pageSize = user.pageSize,
        this.pageIndex = user.pageIndex,
        this.type = user.type
}

admin.prototype.getByName = function (callback) {
    var self = this;
    if (self.name.length == 0) {
        console.log('id不能为空');
        return callback('id不能为空');
    }
    db.con(function (connect) {
        connect.query('select * from manager where name=?', [self.name], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            if (result.length) {
                callback(null, JSON.parse(JSON.stringify(result).replace('RowDataPacket', ''))[0])
            } else {
                callback(null, null)
            }
        })
    });
}

admin.prototype.save = function (callback) {
    var self = this;
    if (self.name.length == 0 || self.password.length == 0) {
        console.log('name或password不能为空');
        return callback('name或password不能为空');
    }
    db.con(function (connect) {
        connect.query('insert into manager(name,password,address) values (?,?,?)', [self.name, self.password, self.address], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            callback(null, JSON.parse(JSON.stringify(result).replace('OkPacket', '')));
        })
    })
}

admin.prototype.getUser = function (callback) {
    var self = this;
    db.con(function (connect) {
        console.log(self.pageIndex)
        connect.query('select id,phone,name from user limit ?,?', [self.pageIndex * self.pageSize, self.pageSize], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            callback(null, result)
        })
    })
}
admin.prototype.getCount = function (callback) {
    var self = this;
    db.con(function (connect) {
        connect.query('select count(0) from ' + self.type, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            callback(null, result)
        })
    })
}

admin.prototype.getManager = function (callback) {
    var self = this;
    db.con(function (connect) {
        console.log(self.pageIndex)
        connect.query('select id,name,auth,address from manager limit ?,?', [self.pageIndex * self.pageSize, self.pageSize], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            callback(null, result)
        })
    })
}

module.exports = admin