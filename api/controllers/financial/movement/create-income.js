module.exports = {
  friendlyName: 'Create income',

  description: '',

  inputs: {
    amount: { type: 'number' },
    concept: { type: 'string' },
    publicId: { type: 'string', description: 'Assistant public Id' },
  },

  exits: {},

  fn: async function (inputs) {
    const type = 'income';
    const sessionUser = this.req.session.user;
    const { amount, concept, publicId } = inputs;

    if (amount <= 0) {
      return this.res.badRequest('El monto no puede ser menor a 1.');
    }

    if (!concept) {
      return this.res.badRequest('Es necesario indicar el concepto');
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

    const newMovement = await FinancialMovement.create({
      type,
      amount,
      concept,
      period: period.id,
      publicId: '-',
      createdBy: sessionUser.id,
    }).fetch();

    return ApiService.response(this.res, newMovement);
  },
};
