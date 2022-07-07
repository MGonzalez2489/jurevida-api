module.exports = async function (req, res, next) {
  let reqToken = req.headers.authorization;

  if (!reqToken) {
    return res.forbidden();
  }

  reqToken = reqToken.toString().replace('Bearer', '').trim();

  try {
    const result = await sails.helpers.validateToken(reqToken);
    if (!result) {
      return res.forbidden();
    }
    return next();
  } catch (e) {
    return res.forbidden();
  }
};
