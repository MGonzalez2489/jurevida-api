module.exports = {
  paginateCollection: function (collection, paginationParams) {
    var limited = paginationParams['limited'] || 'true';
    limited = limited === '1' || limited === 'true';

    collection = collection || [];
    paginationParams = paginationParams || {};

    const params = {
      page: paginationParams['page'] || 1,
      perPage: paginationParams['perPage'] || 10,
      orderBy: paginationParams['orderBy'] || 'id',
      orderDir: paginationParams['orderDir'] || 'asc',
    };

    if (typeof params.page === 'string') {
      params.page = parseInt(params.page);
    }
    if (typeof params.perPage === 'string') {
      params.perPage = parseInt(params.perPage);
    }

    let sortedCollection = _.sortBy(collection, (item) => {
      return item[params.orderBy];
    });
    if (params.orderDir === 'desc') {
      sortedCollection = sortedCollection.reverse();
    }

    const start = (params.page - 1) * params.perPage;
    const end = +start + +params.perPage;
    const subset = sortedCollection.slice(start, end);
    const responseCollection = limited ? subset : sortedCollection;

    const response = {
      model: responseCollection,
      totalRecords: collection.length,
      isSuccess: true,
      totalPages: Math.ceil(collection.length / params.perPage),
    };
    return response;
  },
};
