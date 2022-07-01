module.exports = async function (req, res, next) {
  const token = await sails.helpers.getTokenFromRequest(req);

  if (!token || token === '') {
    send401();
    return;
  }

  const accessToken = await AccessToken.findOne({ access_token: token });

  if (!accessToken) {
    send401();
    return;
  }
  const user = await User.findOne({ id: accessToken.user });

  req.session.user = user;

  return next();

  function send401() {
    res.status(401).send('Acceso Denegado');
  }
};
