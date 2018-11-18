var dbUtil = require('../utils/mySQLUtils');

module.exports.getDealerById = function(dealerId) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'select * from dealer ' +
            'where DealerId = ?';
        dbUtil.query(queryStr, dealerId, function(err, result, fields) {
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

module.exports.addDealer = function(dealerName, dealerUsername, dealerPassword) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'insert into dealer (DealerName, DealerUsername, DealerPassword) values ?';
        let values = [
            [dealerName, dealerUsername, dealerPassword],
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

module.exports.updateDealer = function(dealerId, dealerName, dealerUsername, dealerPassword) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'update dealer set DealerName = ?, Dealerusername = ?, DealerPassword = ? where DealerId = ?';
        let values = [
            [dealerName, dealerUsername, dealerPassword, dealerId],
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

module.exports.deleteDealer = function(dealerId) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'delete from dealer where DealerId =  ?';
        dbUtil.query(queryStr, dealerId, function(err, result, fields) {
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
