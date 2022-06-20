/**
 * ContributionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async function (req, res) {
    const query = {
      deletedAt: '',
      deletedBy: '',
    };

    let users = await User.find().populate('roles').populate('contributions');

    users = users.filter((f) => f.roles.some((g) => g.name === 'consejo'));
    return ApiService.paginateCollection(req, res, users, {});
  },
  create: async function (req, res) {
    const { publicId, contribution } = req.allParams();
    const user = await User.findOne({ publicId }).populate('roles');

    if (!user) {
      return res.notFound('Usuario no encontrado');
    }

    if (!user.roles.some((f) => f.name === 'consejo')) {
      return res.badRequest('El usuario no es parte del consejo');
    }

    const newContribution = await Contribution.create({
      contribution: contribution,
      user: user.id,
      publicId: '-',
    }).fetch();

    return ApiService.response(res, newContribution);
  },
};
