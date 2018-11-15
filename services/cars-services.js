var dbUtil = require('../utils/mySQLUtils');

module.exports.getAllCars = function() {
    return new Promise((resolve, reject) => {
        let queryStr = 'select * from car';
        dbUtil.query(queryStr, function(err, result, fields) {
            if (err) {
                reject(err);
                return;
            }
            if (result.length === 0) {
                result.push({});
            }
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
};
