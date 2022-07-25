module.exports = {
  friendlyName: 'Update',
  description: 'Update users.',
  inputs: {
    publicId: { type: 'string' },
    user: { type: 'ref' },
  },
  exits: {},
  fn: async function (inputs) {
    const { publicId, user } = inputs;
    const sessionUser = req.session.user;

    if (user.sponsor) {
      const sponsor = _.clone(user.sponsor);
      delete user.sponsor;
      await SponsorProfile.update({ publicId: sponsor.publicId }).set({
        useNickName: sponsor.useNickName,
        nickName: sponsor.nickName,
        updatedBy: sessionUser.id,
      });
    }
    if (user.associated) {
      const associated = _.clone(user.associated);
      delete user.associated;
      await AssociatedProfile.update({
        publicId: associated.publicId,
        updatedBy: sessionUser.email,
      }).set({
        maritalStatus: associated.maritalStatus,
      });
    }
    if (user.council) {
      const council = _.clone(user.council);
      delete user.council;
    }
    user.updatedBy = sessionUser.email;

    const updatedUser = await User.update({ publicId: publicId })
      .set(user)
      .fetch();

    return ApiService.response(this.res, updatedUser[0]);
  },
};
