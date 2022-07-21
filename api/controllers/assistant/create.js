module.exports = {
  friendlyName: 'Create',

  description: 'Create assistant.',

  inputs: {
    bank: { type: 'string' },
    accountNumber: { type: 'string' },
    isPettyCash: { type: 'boolean' },
    amount: { type: 'number' },
  },

  exits: {},

  fn: async function (inputs) {
    const { bank, accountNumber, isPettyCash } = inputs;
    let { amount } = inputs;
    const sessionUser = this.req.session.user;

    if (!amount) {
      amount = 0;
    }

    if (amount < 0) {
      return this.res.badRequest('El monto inicial no puede ser menor a 0.');
    }

    if (!isPettyCash && (!bank || !accountNumber)) {
      return this.res.badRequest(
        'El nombre del banco y la cuenta son necesarios para el auxiliar bancario.'
      );
    }

    const query = {
      deletedAt: null,
      deletedBy: null,
      isPettyCash,
    };
    if (!isPettyCash) {
      query.bank = { '!=': null };
      query.accountNumber = { '!=': null };
    }

    const existingAssistant = await FinancialAssistant.findOne(query);

    if (existingAssistant && isPettyCash) {
      return this.res.badRequest('Ya hay una cuenta para caja chica.');
    } else if (existingAssistant) {
      //this validation needs to be deleted once the application is ready to
      //handle more than one financial assistant (bank)
      return this.res.badRequest('Ya hay una cuenta para auxiliar bancario.');
    }

    const newAssistant = {
      bank: isPettyCash ? null : bank,
      accountNumber: isPettyCash ? null : accountNumber,
      isPettyCash,
      publicId: '-',
      createdBy: sessionUser.id,
    };

    //creating financial assistants
    const resultAssistant = await FinancialAssistant.create(
      newAssistant
    ).fetch();
    //creating a new period
    const lastDayOfTheYear = await sails.helpers.getLastDayOfTheYear();
    const resultPeriod = await FinancialPeriod.create({
      startDate: new Date().toISOString(),
      endDate: lastDayOfTheYear.toISOString(),
      startAmount: amount,
      currentAmount: amount,
      endAmount: 0,
      active: true,
      assistant: resultAssistant.id,
      createdBy: sessionUser.id,
      publicId: '-',
    }).fetch();

    return ApiService.response(this.res, resultAssistant);
  },
};
