var dbUtil = require('../utils/mySQLUtils');

module.exports.getAllService = function() {
    return new Promise((resolve, reject) => {
        let queryStr =
            'select * from service';
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

module.exports.getServiceById = function(serviceId) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'select * from service ' +
            'where ServiceId = ?';
        dbUtil.query(queryStr, serviceId, function(err, result, fields) {
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

module.exports.addService = function(serviceType) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'insert into service (ServiceType) values ?';
        dbUtil.query(queryStr, serviceType, function(err, result, fields) {
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

module.exports.addServiceCar = function(serviceID, carID, dateTime) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'insert into service_on (ServiceID, CarID, Date_Time) values ?';
        dbUtil.query(queryStr, [serviceID, carID, dateTime], function(err, result, fields) {
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

module.exports.updateService = function(serviceId, serviceType) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'update service set ServiceType = ? where ServiceId = ?';
        let values = [
            [serviceType, serviceId],
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

module.exports.deleteServiceById = function(serviceId) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'delete from service where ServiceId = ?';
        dbUtil.query(queryStr, serviceId, function(err, result, fields) {
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
