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
  paginateCollection: function (req, res, collection, defaults) {
    var limited = req.param('limited') || 'true';
    limited = limited === '1' || limited === 'true';

    collection = collection || [];
    defaults = defaults || {};

    var params = {
      page: req.param('page') || defaults['page'] || 1,
      perPage: req.param('perPage') || defaults['perPage'] || 10,
      orderBy: req.param('orderBy') || defaults['orderBy'] || 'id',
      orderDir: req.param('orderDir') || defaults['orderDir'] || 'asc',
    };

    if (typeof params.page === 'string') {
      params.page = parseInt(params.page);
    }
    if (typeof params.perPage === 'string') {
      params.perPage = parseInt(params.perPage);
    }

    let sortedCollection = _.sortBy(collection, function (item) {
      return item[params.orderBy];
    });
    if (params.orderDir === 'desc') {
      sortedCollection = sortedCollection.reverse();
    }

    const start = (params.page - 1) * params.perPage;
    const end = +start + +params.perPage;
    const subset = sortedCollection.slice(start, end);
    const responseCollection = limited ? subset : sortedCollection;

    var response = {
      model: responseCollection,
      totalRecords: collection.length,
      isSuccess: true,
      totalPages: Math.ceil(collection.length / params.perPage),
    };

    res.send(response);
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
      .find()
      .populate(populateData)
      .where(criteria)
      .skip(skip)
      .limit(paginate.perPage)
      .sort(sort);
    //var result = await model
    //.find({
    //where: criteria,
    //skip: skip,
    //limit: paginate.perPage,
    //sort: sort,
    //})
    //.populate(populateData);

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
