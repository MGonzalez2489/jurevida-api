module.exports = {
  friendlyName: 'Delete',

  description: 'Delete movement.',

  inputs: {
    publicId: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function (inputs) {
    const { publicId } = inputs;
    const user = this.req.session.user;

    const movement = await FinancialMovement.findOne({
      publicId,
      deletedAt: null,
      deletedBy: null,
    });

    if (!movement) {
      return this.res.notFound('Movimiento no encontrado');
    }

    const period = await FinancialPeriod.findOne({
      deletedAt: null,
      deletedBy: null,
      active: true,
    });

    if (!period) {
      return this.res.notFound('Periodo no encontrado');
    }

    if (movement.period !== period.id) {
      return this.res.badRequest(
        'No se puede eliminar un movimiento de periodos anteriores.'
      );
    }

    await FinancialMovement.update({ publicId })
      .set({
        deletedAt: new Date().toISOString(),
        deletedBy: user.email,
      })
      .fetch();

    return ApiService.response(this.res, true);
  },
};
