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

// TODO: get individual by username 

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

module.exports.addIndividual = function(firstName, lastName, username, password) {
    return new Promise((resolve, reject) => {
		
		function callback (retJson) {
			let queryStr =
				'insert into individual (LastName, FirstName, Password, Salt, Hash, Username) values ?';
			let values = [
				[lastName, firstName, password, retJson["salt"], retJson["hash"], username]
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
		
		encryptPassword(password, callback);
		
        
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


module.exports.testEncryption = function(password) {
    return new Promise((resolve, reject) => {
		
		
		const bcrypt = require('bcrypt');
		const saltRounds = 10;
		const myPlaintextPassword = 's0/\/\P4$$w0rD';
		const someOtherPlaintextPassword = 'not_bacon';
		
		bcrypt.genSalt(saltRounds, function(err, salt) {
			console.log(salt);
			
			bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
				// Store hash in your password DB.
				
				console.log(hash)
				
				
				
				console.log('\n')
			});
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



