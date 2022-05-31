module.exports = {
  response: function (res, data) {
    const response = {
      isSuccess: true,
      model: data,
      message: null,
      httpError: null,
    };
    return res.send(response);
  },
  paginateResponse: async function (
    req,
    res,
    model,
    criteria,
    paginateOptions
  ) {
    var paginate = {
      page: req.param('page') || paginateOptions['page'] || 1,
      perPage: req.param('perPage') || paginateOptions['perPage'] || 10,
      orderBy: req.param('orderBy') || paginateOptions['orderBy'] || 'id',
      orderDir: req.param('orderDir') || paginateOptions['orderDir'] || 'asc',
    };

    var skip = (paginate.page - 1) * paginate.perPage;
    var sort = paginate.orderBy + ' ' + paginate.orderDir;

    var result = await model.find({
      where: criteria,
      skip: skip,
      limit: paginate.perPage,
      sort: sort,
    });

    var totalCount = await model.count(criteria);

    var responseResult = {
      model: result,
      totalRecords: totalCount,
      isSuccess: true,
      totalPages: Math.ceil(totalCount / paginate.perPage),
    };

    res.send(responseResult);
  },

  paginatePopulatedResponse: async function (
    req,
    res,
    model,
    criteria,
    populateData,
    paginateOptions
  ) {
    var paginate = {
      page: req.param('page') || paginateOptions['page'] || 1,
      perPage: req.param('perPage') || paginateOptions['perPage'] || 10,
      orderBy: req.param('orderBy') || paginateOptions['orderBy'] || 'id',
      orderDir: req.param('orderDir') || paginateOptions['orderDir'] || 'asc',
    };

    var skip = (paginate.page - 1) * paginate.perPage;
    var sort = paginate.orderBy + ' ' + paginate.orderDir;

    var result = await model
      .find({
        where: criteria,
        skip: skip,
        limit: paginate.perPage,
        sort: sort,
      })
      .populate(populateData);

    var totalCount = await model.count(criteria);

    var responseResult = {
      model: result,
      totalRecords: totalCount,
      isSuccess: true,
      totalPages: Math.ceil(totalCount / paginate.perPage),
    };

    res.send(responseResult);
  },
};
