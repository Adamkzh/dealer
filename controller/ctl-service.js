let serviceServices = require('../services/service-services');

module.exports.getAllService = function(req, res, next) {
    serviceServices.getAllService()
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
};