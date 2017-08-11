var db = require('./db');

function food(opt) {
    this.category = opt.category
    this.shopid = opt.shopid
    this.foodForm = opt.foodForm
    this.specifForm = opt.specifForm
}

food.prototype.categoryAdd = function (callback) {
    const self = this
    if (self.category.name.length == 0) {
        return callback('name不能为空');
    }
    if (self.category.descript.length == 0) {
        return callback('descript不能为空');
    }
    if (self.category.shopid.length == 0) {
        return callback('shopid不能为空')
    }
    db.con(function (connect) {
        const sql = 'INSERT INTO `foodcategory`(`name`, `descript`, `shopid`) VALUES (?,?,?)';
        const data = [self.category.name, self.category.descript, self.category.shopid]
        connect.query(sql, data, function (err, result) {
            if (err) {
                return callback(err)
            }
            callback(null, result)
        })
    })
}

food.prototype.queryCategory = function (callback) {
    const self = this;
    let sql
    if (self.shopid.length == 0) {
        sql = 'select * from foodCategory'
    } else {
        sql = 'select * from foodCategory where shopid =?'
    }
    db.con(function (connect) {
        connect.query(sql, [self.shopid], function (err, result) {
            if (err) {
                return callback(err)
            }
            callback(null, result)
        })
    })
}

food.prototype.addFood = function (callback) {
    const self = this
    if (self.foodForm.foodname.length == 0) {
        return callback('foodname')
    }
    if (self.foodForm.shopid.length == 0) {
        return callback('shopid不能为空')
    }
    db.con(function (connect) {
        const data = [
            self.foodForm.foodname,
            self.foodForm.activity,
            self.foodForm.fooddetail,
            self.foodForm.img,
            typeof self.foodForm.characteristic === 'string' ? self.foodForm.characteristic[0] : self.foodForm.characteristic.join('/'),
            self.foodForm.sigel,
            self.foodForm.category,
            self.foodForm.shopid
        ]
        const sql = 'INSERT INTO `food`(`foodname`, `activity`, `fooddetail`, `img`, `characteristic`, `sigel`, `category`, `shopid`) VALUES (?,?,?,?,?,?,?,?)'
        connect.query(sql, data, function (err, result) {
            if (err) {
                return callback(err)
            }
            callback(null, result)
        })
    })
}

food.prototype.addSpecifications = function (callback) {
    const self = this
    db.con(function (connect) {
        let sql
        let data = []
        if (self.specif.sigel == 0) {//单规格
            sql = 'INSERT INTO `specifications`(`name`, `packagefee`, `price`, `foodid`, `sigel`) VALUES (?,?,?,?,?)'
            data = [
                self.specifForm.specif[0].name,
                self.specifForm.specif[0].packagefee,
                self.specifForm.specif[0].price,
                self.specifForm.foodid,
                self.specifForm.sigel
            ]
        }else {
            sql='INSERT INTO `specifications`(`name`, `packagefee`, `price`, `foodid`, `sigel`) VALUES'
            self.specifForm.specif.forEach(function(item){
                sql+='('+item.specifname+','+item.packagefee+','+item.price+','+self.specifForm.foodid+','+self.specifForm.sigel+'),'
            })
            sql.substr(0, str.length);
            console.log(sql)
        }
        connect.query(sql, data, function (err, result) {
            if (err) {
                return callback(err)
            }
            callback(null, result)
        })
    })
}
//添加规格
module.exports = food;
