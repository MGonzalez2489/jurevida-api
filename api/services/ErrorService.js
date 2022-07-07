module.exports = {
  internalError: function (res, errorMessage) {
    return res.serverError(errorMessage);
  },
  badRequest: function (res, errorMessage) {
    return res.badRequest(errorMessage);
  },
  forbidden: function (res, errorMessage) {
    const message = errorMessage ? errorMessage : 'Acceso Denegado';
    return res.forbidden(message);
  },
  notFound: function (res, errorMessage) {
    return res.notFound(errorMessage);
  },
};
