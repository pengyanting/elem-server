const db = require('./db');

function shop(option){
    this.formData=option.formData;
    this.pageSize=10;
    this.pageIndex=option.pageIndex;
    this.id=option.id
}
//添加
shop.prototype.add = function(callback){
    const self = this;
    if(!self.formData.shopname.length||!self.formData.address.length||!self.formData.phone.length){
        console.log('name,address,phone不能为空');
        return callback('name,address,phone不能为空');
    }
    db.con(function(connect){
        const data=[
            self.formData.shopname,
            self.formData.address,
            self.formData.phone,
            self.formData.intro,
            self.formData.sign,
            self.formData.category.join(','),
            self.formData.characteristic.join(','),
            parseFloat(self.formData.deliveryfee),
            parseFloat(self.formData.startprice),
            self.formData.starttime,
            self.formData.endtime,
            self.formData.shopavatar,
            self.formData.businesslicense,
            self.formData.servicelicense
        ];
        connect.query('INSERT INTO `shop`(`shopname`, `address`, `phone`, `intro`, `sign`, `category`, `characteristic`, `deliveryfee`, `startprice`, `starttime`, `endtime`, `shopavatar`, `businesslicense`, `servicelicense`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',data,function(err,result){
          if(err){
              console.log(err);
              return callback(err);
          }
            callback(null,result)
        })
    })
}
//查询
shop.prototype.query = function(callback){
  const self = this;
  db.con(function(connect){
      connect.query('select * from shop limit ?,?',[self.pageIndex*self.pageSize,self.pageSize],function(err,result){
          if(err){
              console.log(err);
              return callback(err);
          }
          callback(null,result)
      })
  })
}

//删除
shop.prototype.del=function(callback){
  const self=this;
  if(self.id.length==0){
      console.log('id不能为空');
      return callback('id不能为空');
  }
  db.con(function(connect){
      connect.query('delete from shop where id = ?',[self.id],function(err,result){
          if(err){
            return callback(err);
          }
        callback(null,result)
      })
  })
}

//编辑
shop.prototype.edit=function(callback){
    const self = this
    
    db.con(function(connect){
        const data=[
            self.formData.shopname,
            self.formData.address,
            self.formData.phone,
            self.formData.intro,
            self.formData.sign,
            self.formData.category.join(','),
            self.formData.characteristic.join(','),
            parseFloat(self.formData.deliveryfee),
            parseFloat(self.formData.startprice),
            self.formData.shopavatar,
            self.formData.id
        ];
        const sql='UPDATE `shop` SET `shopname`=?,`address`=?,`phone`=?,`intro`=?,`sign`=?,`category`=?,`characteristic`=?,`deliveryfee`=?,`startprice`=?,`shopavatar`=? WHERE id=?'
        connect.query(sql,data,function(err,result){
          if(err){
              return callback(err);
          }
            callback(null,result)
        })
    })
}
module.exports = shop;