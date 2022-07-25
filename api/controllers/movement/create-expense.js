module.exports = {
  friendlyName: 'Create expense',

  description: '',

  inputs: {
    name: { type: 'string' },
    concept: { type: 'string' },
    amount: { type: 'number' },
    publicId: { type: 'string', description: 'Assistant public Id' },
  },

  exits: {},

  fn: async function (inputs) {
    const type = 'expense';
    const sessionUser = this.req.session.user;
    const { name, concept, amount, publicId } = inputs;

    if (!name) {
      return this.res.badRequest(
        'El nombre es requerido para registrar un gasto'
      );
    }
    if (!concept) {
      return this.res.badRequest(
        'El concepto es requerido para registrar un gasto'
      );
    }
    if (amount <= 0) {
      return this.res.badRequest('El monto no puede ser menor a 1.');
    }

    const assistant = await FinancialAssistant.findOne({
      deletedAt: null,
      deletedBy: null,
      publicId,
    });

    if (!assistant) {
      return this.res.notFound('No se encontro el asistente indicado');
    }

    let period = await FinancialPeriod.validateAndCreate(assistant.isPettyCash);

    if (!period) {
      period = await FinancialPeriod.findOne({
        deletedAt: null,
        deletedBy: null,
        assistant: assistant.id,
        active: true,
      });
    }

    const newMovement = await FinancialMovement.create({
      type,
      amount,
      concept,
      period: period.id,
      publicId: '-',
      name,
      createdBy: sessionUser.email,
    }).fetch();

    return ApiService.response(this.res, newMovement);
  },
};
