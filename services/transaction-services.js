var dbUtil = require('../utils/mySQLUtils');

module.exports.getTransactionById = function(tId) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'select * from transaction ' +
            'where TransactionID = ?';
        dbUtil.query(queryStr, tId, function(err, result, fields) {
            if (err) {
                reject(err);
                return;
            }
            if (result.length === 0) {
                result.push({});
            }
            resolve(JSON.parse(JSON.stringify(result[0])));
        });
    });
};

module.exports.addTransaction = function(dateTime, Price) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'insert into transaction (DateTime, Price) values ?';
        let values = [
            [dateTime, Price]
        ];
        dbUtil.query(queryStr, [values], function(err, result, fields) {
            if (err) {
                reject(err);
                return;
            }
            if (result.length === 0) {
                result.push({});
            }
            resolve(JSON.parse(JSON.stringify(result[0])));
        });
    });
};

module.exports.deleteTransactionById = function(tId) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'delete from transaction where TransactionID = ?';
        dbUtil.query(queryStr, tId, function(err, result, fields) {
            if (err) {
                reject(err);
                return;
            }
            if (result.length === 0) {
                result.push({});
            }
            resolve(JSON.parse(JSON.stringify(result[0])));
        });
    });
};
