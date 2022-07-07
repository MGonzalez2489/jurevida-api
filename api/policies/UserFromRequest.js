module.exports = async function (req, res, next) {
  const token = await sails.helpers.getTokenFromRequest(req);

  if (!token || token === '') {
    return res.forbidden();
  }

  const accessToken = await AccessToken.findOne({ access_token: token });

  if (!accessToken) {
    return res.forbidden();
  }
  const user = await User.findOne({ id: accessToken.user });

  req.session.user = user;

  return next();
};
