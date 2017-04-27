module.exports = function (req, res, next) {

  sails.log('----------------------------');
  sails.log(req.url);
  sails.log(req.method);
  sails.log(req.allParams());

  return next();
};
