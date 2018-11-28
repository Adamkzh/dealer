let transactionServices = require('../services/transaction-services');

module.exports.buyCar = function(req, res, next) {
    let {dateTime, price} = {...req.body};
    transactionServices.addTransaction(dateTime, price)
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
};