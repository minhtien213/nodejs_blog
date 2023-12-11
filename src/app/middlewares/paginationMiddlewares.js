function paginationMiddlewares(req, pageSize) {
  let pageNumber = req.query.page ? parseInt(req.query.page) : 1;
  let currentPage = pageNumber;
  let skipPage = (pageNumber - 1) * pageSize;

  if (req.query.hasOwnProperty('_pagi')) {
    pageNumber = req.query.page ? parseInt(req.query.page) : 1;
    currentPage = pageNumber;
    skipPage = (pageNumber - 1) * pageSize;
  }

  return {
    pageNumber,
    currentPage,
    skipPage
  };
}

module.exports = paginationMiddlewares;