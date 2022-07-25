module.exports = {
  friendlyName: 'Export',

  description: 'Export movement.',

  inputs: {
    startDate: { type: 'string' },
    endDate: { type: 'string' },
    name: { type: 'string' },
    concept: { type: 'string' },
    type: { type: 'string' },
    assistantId: { type: 'string' },
    periodId: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { startDate, endDate, name, concept, type, assistantId, periodId } =
      inputs;

    const movements = await MovementService.searchMovements(
      assistantId,
      startDate,
      endDate,
      name,
      concept,
      type,
      periodId
    );

    const formatedArray = movements.map((obj) => {
      const nObject = {
        nombre: obj.name,
        fecha: obj.createdAt,
        concepto: obj.concept,
        tipo: obj.type === 'income' ? 'Entrada' : 'Salida',
        monto: '$' + obj.amount.toFixed(2),
      };
      return nObject;
    });

    const headers = [
      { id: 'nombre', title: 'Nombre' },
      { id: 'fecha', title: 'Fecha' },
      { id: 'concepto', title: 'Concepto' },
      { id: 'tipo', title: 'Tipo' },
      { id: 'monto', title: 'Monto' },
    ];

    const file = await ExportCSVService.exportData(formatedArray, headers);
    return ApiService.response(this.res, file);
  },
};
