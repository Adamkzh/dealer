let config = require('config');
let mysql = require('mysql');
let pool = mysql.createPool({
  connectionLimit : config.get('dbConfig.connectionLimit'),
  host            : config.get('dbConfig.host'),
  user            : config.get('dbConfig.user'),
  password        : config.get('dbConfig.password'),
});

module.exports.query = function(sql, options, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null);  
        } else {
            conn.beginTransaction(function(err) {
               if (err) {
                   throw err;
               }
               conn.query(sql, options, function(err, results, fields) {
                   if (err) {
                       return conn.rollback(function() {
                           throw err;
                       })
                   }
                   conn.commit(function(err) {
                       if (err) {
                           return connection.rollback(function() {
                               throw err;
                           });
                       }
                       console.log('commit success!');
                   });
                   // release connection
                   conn.release();
                   callback(err, results, fields);
               });
            });
        }  
    });  
};

module.exports.getDBPool = function() {
    return pool;
};


module.exports.handleError = function(err) {
 if(err) {
   console.log(err);
    throw err;
 }
};


module.exports.getDBName = function() {
 return config.get('dbConfig.user');
};