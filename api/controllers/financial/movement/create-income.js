module.exports = {
  friendlyName: 'Create income',

  description: '',

  inputs: {
    amount: { type: 'number' },
    concept: { type: 'string' },
    publicId: { type: 'string', description: 'Assistant public Id' },
    sponsor: { type: 'string' },
    existingSponsor: { type: 'boolean' },
  },

  exits: {},

  fn: async function (inputs) {
    const type = 'income';
    const sessionUser = this.req.session.user;
    const { amount, concept, publicId, sponsor, existingSponsor } = inputs;
    let dbSponsor = null;
    let otSponsor = null;

    if (amount <= 0) {
      return this.res.badRequest('El monto no puede ser menor a 1.');
    }

    if (!concept) {
      return this.res.badRequest('Es necesario indicar el concepto');
    }

    if (existingSponsor) {
      dbSponsor = await User.findOne({
        publicId: sponsor,
        sponsor: { '!=': null },
      }).populate('sponsor');

      if (!dbSponsor) {
        return this.res.notFound('El Sponsor no existe');
      }
      dbSponsor = dbSponsor.sponsor.id;
    } else {
      otSponsor = await OneTimeSponsor.findOne({ name: sponsor });
      if (!otSponsor) {
        console.log('entro a crear otSponsor');
        otSponsor = await OneTimeSponsor.create({
          name: sponsor,
          publicId: '-',
          createdBy: sessionUser.id,
        }).fetch();
      }
      otSponsor = otSponsor.id;
    }

    const assistant = await FinancialAssistant.findOne({
      deletedAt: null,
      deletedBy: null,
      publicId,
    });

    if (!assistant) {
      return this.res.notFound('No se encontro el asistente indicado');
    }

    const period = await FinancialPeriod.findOne({
      deletedAt: null,
      deletedBy: null,
      assistant: assistant.id,
    });

    const n = {
      type,
      amount,
      concept,
      period: period.id,
      publicId: '-',
      createdBy: sessionUser.id,
      oTSponsor: otSponsor,
      sponsor: dbSponsor,
    };
    console.log('new movement', n);

    const newMovement = await FinancialMovement.create(n).fetch();

    return ApiService.response(this.res, newMovement);
  },
};
