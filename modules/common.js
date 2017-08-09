var db = require('./db');

function common(opt) {
    this.type = opt.type
}

common.prototype.getCount = function (callback) {
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

module.exports=common