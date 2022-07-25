module.exports = {
  searchMovements: async function (
    assistantPublicId,
    startDate,
    endDate,
    name,
    concept,
    type,
    periodPublicId
  ) {
    let response = [];

    if (!assistantPublicId || !periodPublicId) {
      throw Error('Invalid request');
    }
    const assistant = await FinancialAssistant.findOne({
      publicId: assistantPublicId,
    });

    if (!assistant) {
      return response;
    }

    const period = await FinancialPeriod.findOne({
      assistant: assistant.id,
      publicId: periodPublicId,
    });

    if (!period) {
      return response;
    }

    let query = `
      select
		    fn.publicId as publicId,
            (case WHEN fn.name is NULL Then sponsor.FullName else fn.name END) as name,
            fn.createdAt,
            fn.concept,
            fn.type,
            fn.amount
        from jurevidadb.financialmovement fn
            left join
                (select sp.id, fullname from jurevidadb.user u
                join jurevidadb.sponsorprofile sp on u.sponsor = sp.id
                ) as sponsor on fn.sponsor = sponsor.id
                where fn.deletedAt IS NULL and fn.deletedBy IS NULL and fn.period = ${period.id}
            `;

    if (startDate || endDate) {
      if (startDate) {
        let filter = '';
        let date = new Date(startDate);
        date.setHours(0, 0, 0, 0);
        filter = ` AND fn.createdAt >= '${date.toISOString()}'`;
        query = query.concat(filter);
      }
      if (endDate) {
        let filter = '';
        let date = new Date(endDate);
        date.setHours(23, 59, 59, 999);
        filter = ` AND fn.createdAt <= '${date.toISOString()}'`;
        query = query.concat(filter);
      }
    }

    if (name) {
      let nameFilter = ` AND (sponsor.fullName LIKE '%${name}%' or fn.name LIKE '%${name}%' )`;
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
    response = await sails.sendNativeQuery(query);
    return response.rows;
  },
};
