module.exports = function (req, res, next) {
  // only log requests in staging and dev.
  // load balancer will handle this in production.
  // if (sails.config.environment != 'production') {
  //var now = moment().format("ddd MMM DD HH:mm:ss z YYYY");
  sails.log(req.method, req.url);
  if (req.body && !_.isEmpty(req.body)) {
    sails.log("Request Body: \n", req.body);
  }
  //}
  next();
};
