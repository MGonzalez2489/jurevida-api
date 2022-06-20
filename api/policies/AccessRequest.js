module.exports = async function (req, res, next) {
  let reqToken = req.headers.authorization;
  if (!reqToken) {
    console.log(1);
    send401();
    return;
  }
  reqToken = reqToken.toString().replace('Bearer', '').trim();
  try {
    const result = await sails.helpers.validateToken(reqToken);
    if (!result) {
      console.log(2);
      send401();
    } else {
      next();
    }
  } catch {
    console.log(3);
    send401();
  }

  function send401() {
    res.status(401).send('Acceso Denegado');
  }
};
