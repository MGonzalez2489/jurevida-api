module.exports = {
  friendlyName: 'Get bank all',

  description: '',

  inputs: {
    startDate: { type: 'string' },
    endDate: { type: 'string' },
    name: { type: 'string' },
    concept: { type: 'string' },
    type: { type: 'string' },
  },

  exits: {},

  fn: async function (inputs) {
    const { startDate, endDate, name, concept, type } = inputs;

    const assistant = await FinancialAssistant.findOne({
      deletedAt: null,
      deletedBy: null,
      isPettyCash: false,
    });

    if (!assistant) {
      return ApiService.paginateCollection(this.req, this.res, [], {});
    }

    const period = await FinancialPeriod.findOne({ assistant: assistant.id });

    if (!period) {
      return ApiService.paginateCollection(this.req, this.res, [], {});
    }
    let query = `
        select
		    fn.publicId as publicId,
            COALESCE(sponsor.fullName,ots.name) as name,
            fn.createdAt,
            fn.concept,
            fn.type,
            fn.amount
        from jurevidadb.financialmovement fn
            left join
                (select sp.id, fullname from jurevidadb.user u
                join jurevidadb.sponsorprofile sp on u.sponsor = sp.id
                ) as sponsor on fn.sponsor = sponsor.id
                left join jurevidadb.onetimesponsor ots on fn.oTSponsor = ots.id
                where fn.deletedAt IS NULL and fn.deletedBy IS NULL and fn.period = ${period.id}
      `;

    if (startDate || endDate) {
      if (startDate) {
        let filter = '';
        let date = new Date(startDate);
        date.setHours(0, 0, 0, 0);
        filter = ` AND fn.createdAt >= ${date.toString()}`;
        query.concat(filter);
      }
      if (endDate) {
        let filter = '';
        let date = new Date(endDate);
        date.setHours(23, 59, 59, 999);
        filter = ` AND fn.createdAt <= ${date.toString()}`;
        query.concat(filter);
      }
    }

    if (name) {
      let nameFilter = ` AND (sponsor.fullName LIKE '%${name}%' or ots.name LIKE '%${name}%' )`;
      query = query.concat(nameFilter);
    }

    if (concept) {
      const conceptFilter = ` AND fn.concept LIKE '%${concept}%'`;
      query = query.concat(conceptFilter);
    }
    if (type) {
      const typeFilter = ` AND fn.type LIKE '%${type}%'`;
      query = query.concat(typeFilter);
    }

    const results = await sails.sendNativeQuery(query);
    return ApiService.paginateCollection(this.req, this.res, results.rows, {});
  },
};
