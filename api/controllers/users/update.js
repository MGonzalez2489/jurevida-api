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

    if (user.sponsor) {
      const sponsor = _.clone(user.sponsor);
      delete user.sponsor;
      await SponsorProfile.update({ publicId: sponsor.publicId }).set({
        useNickName: sponsor.useNickName,
        nickName: sponsor.nickName,
      });
    }
    if (user.associated) {
      const associated = _.clone(user.associated);
      delete user.associated;
      await AssociatedProfile.update({
        publicId: associated.publicId,
      }).set({
        maritalStatus: associated.maritalStatus,
      });
    }
    if (user.council) {
      const council = _.clone(user.council);
      delete user.council;
    }

    const updatedUser = await User.update({ publicId: publicId })
      .set(user)
      .fetch();

    return ApiService.response(this.res, updatedUser[0]);
  },
};
