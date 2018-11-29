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

module.exports.addIndividualCar = function(individualId, carId) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'insert into individual_owns (IndividualID, CarID) values ?';
        dbUtil.query(queryStr, [individualId, carId], function(err, result, fields) {
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

module.exports.addIndividualAccount = function(firstName, lastName, password) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'insert into individual (LastName, FirstName, Password) values ?';
        let values = [
            [lastName, firstName, password],
        ];
        dbUtil.query(queryStr, [values], function(err, result, fields) {
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

module.exports.updateIndividualAccount = function(id, firstName, lastName, password) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'update individual set LastName = ?, FirstName = ?, password = ? where IndividualID = ?';
        let values = [
            [firstName, lastName, password, id],
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

module.exports.deleteIndividualAccountById = function(id) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'delete from individual where IndividualID =  ?';
        dbUtil.query(queryStr, id, function(err, result, fields) {
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
