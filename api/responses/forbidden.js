module.exports = function forbidden(message) {
  message = message ? message : 'Acceso Denegado';
  return this.res.status(401).send(message);
};
