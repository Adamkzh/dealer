var dbUtil = require('../utils/mySQLUtils');

module.exports.getCarByOwner = function(firstName, lastName) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'select * from car ' +
            'where car.Owner = ?';
        let ownerFullName = firstName + " " + lastName;
        dbUtil.query(queryStr, ownerFullName, function(err, result, fields) {
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

module.exports.getCarById = function(carId) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'select * from car ' +
            'where car.CarID = ?';
        dbUtil.query(queryStr, carId, function(err, result, fields) {
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

module.exports.getAllCars = function() {
    return new Promise((resolve, reject) => {
        let queryStr =
            'select * from car ';
        dbUtil.query(queryStr, [], function(err, result, fields) {
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

module.exports.addCar = function(manufacture, model, year, owner) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'insert into car (Manufacture, Model, Year, Owner) values ?';
        let values = [
            [manufacture, model, year, owner],
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

module.exports.updateCarOwner = function(carId, owner) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'update car set Owner = ? where CarID = ?';
        let values = [
            [owner, carId],
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

module.exports.deleteCarById = function(carId) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'delete from car where CarID =  ?';
        dbUtil.query(queryStr, carId, function(err, result, fields) {
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
