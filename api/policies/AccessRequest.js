module.exports = async function (req, res, next) {
  const reqToken = req.headers.authorization;
  console.log(reqToken);

  try {
    await sails.helpers.validateToken(reqToken);
    next();
  } catch {
    return res.forbidden('Sin Acceso');
  }
};
