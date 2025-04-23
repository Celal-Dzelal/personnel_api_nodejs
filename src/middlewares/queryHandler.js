"use strict";

module.exports = (req, res, next) => {
  const filter = req.query?.filter || {}; //* If there is a filter in the query parameters which inside of req, use it, otherwise assign as an empty object

  const search = req.query?.search || {}; //* If there is a search in the query parameters which comes from URL, use it, otherwise use an empty object.

  for (let key in search) search[key] = { $regex: search[key] }; //* It transform every single value in search object to the MongoDB regex query.

  const sort = req.query?.sort || {}; //* If there is a sort in the query, use it, otherwise use an empty object

  let limit = Number(req.query?.limit); //* Records per page
  limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20);

  let page = Number(req.query?.page); //* Current page number
  page = page > 0 ? page : 1;

  let skip = Number(req.query?.skip); //* Number of records to skip
  skip = skip > 0 ? skip : (page - 1) * limit;

  res.getModelList = async function (Model, populate = null) {
    //* LISTING FUNCTION: A function to fetch data with filter and pages according to Model
    return await Model.find({ ...filter, ...search })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate(populate);
  };

  res.getModelListDetails = async (Model) => {
    //* IDENTIFY QUERY: It starts the query to calculate details
    const data = await Model.find({ ...filter, ...search });

    const details = {
      //* Pagination and filtering information
      filter: filter,
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous: page > 1 ? page - 1 : false,
        current: page,
        next: page + 1,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };
    details.pages.next =
      //* If there is no next page, do not show
      details.pages.next > details.pages.total ? false : details.pages.next;
    if (details.totalRecords <= limit) details.pages = false;
    //* If all the records fit the single page do not show the pagination info
    return details;
  };
  next();
};
