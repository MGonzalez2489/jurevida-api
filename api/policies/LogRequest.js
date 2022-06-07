module.exports = function (req, res, next) {
  sails.log(req.method, req.url);
  //if (req.body && !_.isEmpty(req.body)) {
  //sails.log('Request Body: \n', req.body);
  //}

  next();
};
