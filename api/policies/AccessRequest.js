module.exports = async function (req, res, next) {
  next();
  //const reqToken = req.headers.authorization;
  //console.log(reqToken);

  //try {
  //const isValid = await sails.helpers.validateToken(reqToken);
  //next();
  //} catch (e) {
  //return res.forbidden("Sin Acceso");
  //}
};
