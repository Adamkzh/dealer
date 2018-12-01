module.exports.getLogout = function(req, res, next) {
    delete req.session.user;
    delete req.session.position;
    res.redirect("/");
}