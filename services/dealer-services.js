var dbUtil = require('../utils/mySQLUtils');

module.exports.getAllDealer = function() {
    return new Promise((resolve, reject) => {
        let queryStr =
            'select * from dealer ';
        dbUtil.query(queryStr, [], function(err, result, fields) {
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

module.exports.getDealerByUsername = function(username) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'select * from dealer ' +
            'where DealerUsername = ?';
        dbUtil.query(queryStr, username, function(err, result, fields) {
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
		
		function callback (retJson) {
			let queryStr =
				'insert into dealer (DealerName, DealerUsername, DealerPassword, Salt, Hash) values ?';
			let values = [
				[dealerName, dealerUsername, dealerPassword, retJson["salt"], retJson["hash"]],
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
		}
		
		encryptPassword(dealerPassword, callback);
    });
};

function encryptPassword (password, callback) {
	
	const bcrypt = require('bcrypt');
	const saltRounds = 10;
	const myPlaintextPassword = password;
	
	bcrypt.genSalt(saltRounds, function(err, salt) {
		console.log(salt);
		
		bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
			// Store hash in your password DB.
			
			console.log(hash)
			console.log('\n')
			
			callback({"salt":salt, "hash": hash});
		});
	});

};

module.exports.addDealerCar = function(dealerID, carID) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'insert into dealer_owns (DealerID, CarID) values ?';
        let values = [
            [dealerID, carID],
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

module.exports.addDealerServices = function(dealerID, serviceID, price) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'insert into provide (DealerID, ServiceID, Price) values ?';
        let values = [
            [dealerID, serviceID, price],
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

module.exports.deleteDealerById = function(dealerId) {
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

module.exports.getDealerPostedCar = function(dealerId) {
    return new Promise((resolve, reject) => {
        let queryStr =
            'select * from dealer_owns do join car c on do.CarID = c.CarID ' +
            'where do.DealerId = ?';
        dbUtil.query(queryStr, dealerId, function(err, result, fields) {
            if (err) {
                reject(err);
                return;
            }
            if (result.length === 0) {
                result.push({});
            }
            // console.log(result);
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
};

module.exports.getDealerTransaction = function(dealerId) {
    return new Promise((resolve, reject) => {
        let queryStrOne =
            'select * from dealer_buy_involve dbi join transaction t on dbi.TransactionID = t.TransactionID' +
            ' where dbi.DealerID = ?';
        dbUtil.query(queryStrOne, dealerId, function(err, result, fields) {
            if (err) {
                reject(err);
                return;
            }
            if (result.length === 0) {
                result.push({});
            }
            let buyInvolve = result;
            let queryStrTwo =
                'select * from dealer_sell_involve dsi join transaction t on dsi.TransactionID = t.TransactionID' +
                ' where dsi.DealerID = ?';
            dbUtil.query(queryStrTwo, dealerId, function(err, result, fields) {
                if (err) {
                    reject(err);
                    return;
                }
                if (result.length === 0) {
                    result.push({});
                }
                result = buyInvolve.concat(result);
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    });
};
