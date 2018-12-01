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

// Done: testing
module.exports.getDealerToIndividualTransaction = function(tId) {
    return new Promise((resolve, reject) => {
        let queryStr =
			'select * from transaction t inner join ' +
			'car_involve cii on t.transactionID = cii.transactionID inner join ' + 
			'car c on cii.carid = c.carid inner join ' +
			'dealer_sell_involve dbi on t.transactionid = dbi.transactionid inner join ' +
			'dealer d on dbi.dealerid = d.dealerid inner join ' + 
			'individual_buy_involve isi on t.transactionid = isi.transactionid inner join ' +
			'individual i on isi.individualid = i.individualid ' +
			'order by t.transactionID';

        dbUtil.query(queryStr, tId, function(err, result, fields) {
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

// Done: testing
module.exports.getIndividualToDealerTransaction = function(tId) {
    return new Promise((resolve, reject) => {
        let queryStr =
			'select * from transaction t inner join ' +
			'car_involve cii on t.transactionID = cii.transactionID inner join ' +
			'car c on cii.carid = c.carid inner join ' +
			'dealer_buy_involve dbi on t.transactionid = dbi.transactionid inner join ' +
			'dealer d on dbi.dealerid = d.dealerid inner join ' + 
			'individual_sell_involve isi on t.transactionid = isi.transactionid inner join ' +
			'individual i on isi.individualid = i.individualid ' +
			'order by t.transactionID;';

        dbUtil.query(queryStr, tId, function(err, result, fields) {
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

// TODO: Missing Duplicated IndividualID and assoc information
module.exports.getIndividualToIndividualTransaction = function(tId) {
    return new Promise((resolve, reject) => {
        let queryStr =
			'select * from transaction t inner join ' +
			'car_involve cii on t.transactionID = cii.transactionID inner join ' +
			'car c on cii.carid = c.carid inner join ' +
			'individual_buy_involve dbi on t.transactionid = dbi.transactionid inner join ' +
			'individual d on dbi.individualId = d.individualId inner join ' + 
			'individual_sell_involve isi on t.transactionid = isi.transactionid inner join ' +
			'individual i on isi.individualid = i.individualid ' +
			'order by t.transactionID;';

        dbUtil.query(queryStr, tId, function(err, result, fields) {
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



// Done: need to test out the function if works correctly			
module.exports.addDealerToIndividualTransaction = function(dealerId, transactionId, IndividualID, carID) {
    return new Promise((resolve, reject) => {
        let queryStrOne =
            'insert into dealer_sell_involve (DealerID, TransactionID) values ?';
        let valuesOne = [
            [dealerId, transactionId]
        ];
        dbUtil.query(queryStrOne, [valuesOne], function(err, result, fields) {
            if (err) {
                reject(err);
                return;
            }
            if (result.length === 0) {
                result.push({});
            }
            var resultQueryOne = result;
			let queryStrTwo = 
				'insert into individual_buy_involve (TransactionID, IndividualID) values ?';
			let valuesTwo = [
				[transactionId, IndividualID]
			];
			dbUtil.query(queryStrTwo, [valuesTwo], function(err, result, fields) {
				if (err) {
					reject(err);
					return;
				}
				if (result.length === 0) {
					result.push({});
				}
				var resultQueryTwo = result;
				let queryStrThree = 
					'insert into car_involve (TransactionID, CarID) values ?';
				let valuesThree = [
					[transactionId, carID]
				];
				dbUtil.query(queryStrThree, [valuesThree], function(err, result, fields) {
					if (err) {
						reject(err);
						return;
					}
					if (result.length === 0) {
						result.push({});
					}
					var resultQueryThree = result;
					let queryStrFour = 'delete from dealer_owns where CarId = ?';
					dbUtil.query(queryStrFour, [carID], function(err, result, fields) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (result.length === 0) {
                            result.push({});
                        }
                        let resultQueryFour = result;
                        let queryStrFive = 'insert into individual_owns (CarID, IndividualID) values ?';
                        let valuesFive = [
                            [carID, IndividualID]
                        ];
                        dbUtil.query(queryStrFive, [valuesFive], function(err, result, fields) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (result.length === 0) {
                                result.push({});
                            }
                            let resultQueryFive = result;
                            var totalResult = JSON.parse(JSON.stringify({resultQueryOne, resultQueryTwo,
                                resultQueryThree, resultQueryFour, resultQueryFive}));
                            resolve(totalResult);
                        });
                    });
				});
			});
        });
    });
};

// Done: need to test out the function if works correctly
module.exports.addIndividualToDealerTransaction = function(dealerId, transactionId, individualID, carID) {
    return new Promise((resolve, reject) => {
        let queryStrOne =
            'insert into individual_sell_involve (IndividualID, TransactionID) values ?';
        let valuesOne = [
            [individualID, transactionId]
        ];
        dbUtil.query(queryStrOne, [valuesOne], function(err, result, fields) {
            if (err) {
                reject(err);
                return;
            }
            if (result.length === 0) {
                result.push({});
            }
            
			var resultOne = result;
			
			let queryStrTwo = 
				'insert into dealer_buy_involve (DealerID, TransactionID) values ?';
				
			let valuesTwo = [
				[dealerId, transactionId]
			];
			
			dbUtil.query(queryStrTwo, [valuesTwo], function(err, result, fields) {
				if (err) {
					reject(err);
					return;
				}
				if (result.length === 0) {
					result.push({});
				}
				
				resultTwo = result;
				
				let queryStrThree = 
					'insert into car_involve (TransactionID, CarID) values ?';
					
				let valuesThree = [
					[transactionId, carID]
				];
				
				dbUtil.query(queryStrThree, [valuesThree], function(err, result, fields) {
					if (err) {
						reject(err);
						return;
					}
					if (result.length === 0) {
						result.push({});
					}
					
					totalResult = JSON.parse(JSON.stringify({resultOne, resultTwo, result}));					
					resolve(totalResult);
					
				});
			});
        });
		

	
    });
};

// Done: individual to individual transactions
module.exports.addIndividualToIndividualTransaction = function(individualSellerID, transactionId, individualBuyerID, carID) {
    return new Promise((resolve, reject) => {
        let queryStrOne =
            'insert into individual_sell_involve (IndividualID, TransactionID) values ?';
        let valuesOne = [
            [individualSellerID, transactionId]
        ];
        dbUtil.query(queryStrOne, [valuesOne], function(err, result, fields) {
            if (err) {
                reject(err);
                return;
            }
            if (result.length === 0) {
                result.push({});
            }
            
			resultOne = result;
			
			let queryStrTwo = 
				'insert into individual_buy_involve (IndividualID, TransactionID) values ?';
				
			let valuesTwo = [
				[individualBuyerID, transactionId]
			];
			
			dbUtil.query(queryStrTwo, [valuesTwo], function(err, result, fields) {
				if (err) {
					reject(err);
					return;
				}
				if (result.length === 0) {
					result.push({});
				}
				
				resultTwo = result;
				
				let queryStrThree = 
					'insert into car_involve (TransactionID, CarID) values ?';
					
				let valuesThree = [
					[transactionId, carID]
				];
				
				dbUtil.query(queryStrThree, [valuesThree], function(err, result, fields) {
					if (err) {
						reject(err);
						return;
					}
					if (result.length === 0) {
						result.push({});
					}
					
					resultTotal = JSON.parse(JSON.stringify({resultOne, resultTwo, result}));
					resolve(resultTotal);
				});
			});
        });
		

		

    });
};

// TODO: add car

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
            resolve(JSON.parse(JSON.stringify(result)));
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
