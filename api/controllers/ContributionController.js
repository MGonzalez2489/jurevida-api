/**
 * ContributionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    const { publicId, contribution } = req.allParams();
    const user = await User.findOne({ publicId }).populate('council');

    const newContribution = await Contribution.create({
      contribution: contribution,
      council: user.council.id,
      publicId: '-',
    }).fetch();
    return ApiService.response(res, newContribution);
  },
  delete: async function (req, res) {
    const { publicId } = req.allParams();
    const user = req.session.user;
    await Contribution.update({ publicId: publicId })
      .set({
        deletedAt: new Date().toISOString(),
        deletedBy: user.emai,
      })
      .fetch();

    return ApiService.response(res, true);
  },
};
