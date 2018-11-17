var dbUtil = require('../utils/mySQLUtils');

module.exports.getIndividualById = function(userId) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'select * from individual ' +
            'where individual.IndividualID = ?';
        dbUtil.query(queryStr, userId, function(err, result, fields) {
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

module.exports.getIndividualByFirstAndLast = function(firstName, lastName) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'select * from individual ' +
            'where FirstName = ? and LastName = ?';
        dbUtil.query(queryStr, [firstName, lastName], function(err, result, fields) {
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
