module.exports = async function (req, res, next) {
  let reqToken = req.headers.authorization;
  if (!reqToken) {
    send401();
    return;
  }
  reqToken = reqToken.toString().replace('Bearer', '').trim();
  try {
    const result = await sails.helpers.validateToken(reqToken);
    if (!result) {
      send401();
    } else {
      next();
    }
  } catch {
    send401();
  }

  function send401() {
    res.status(401).send('Acceso Denegado');
  }
};
