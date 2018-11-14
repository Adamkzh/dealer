var dbUtil = require('../utils/mySQLUtils');

module.exports.getAllDealers = function() {
    return new Promise((resolve, reject) => {
        let queryStr = 'select * from dealer';
        dbUtil.query(queryStr, function(err, result, fields) {
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
