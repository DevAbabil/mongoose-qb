import { Query, Model, RootFilterQuery } from "mongoose";
import { excludesFields } from "./constants";
import { QBError } from "./Error";
import type * as types from "./types";

const createQueryBuilder = (config: types.IQBConfig) => {
  const { defaultLimit, defaultPage, defaultSortField } = config;

  if (defaultLimit <= 0)
    throw new QBError("'defaultLimit' must be greater than 0");

  if (defaultPage <= 0)
    throw new QBError("'defaultPage' must be greater than 0");

  if (defaultSortField?.trim() === "")
    throw new QBError("'defaultSortField' must be a contentful string");

  const getSearchQuery = <T>(
    searchableField?: Array<string>,
    searchQuery?: string
  ) => {
    return searchableField?.length
      ? ({
          $or: searchableField.map((field) => ({
            [field]: {
              $regex: searchQuery || "",
              $options: "i",
            },
          })),
        } as RootFilterQuery<T>)
      : {};
  };

  const sanitizeQuery = (querySting: string) => {
    return querySting?.trim().split(",").join(" ") || "";
  };

  return class<T> {
    public modelQuery: Query<Array<T>, T>;

    constructor(
      public model: Model<T>,
      public readonly query: Record<string, string>,
      public readonly options?: types.IUseQueryOptions
    ) {
      this.modelQuery = this.model.find();
    }

    public search(searchableField: Array<string>, searchQuery: string) {
      this.modelQuery = this.modelQuery.find(
        getSearchQuery<T>(searchableField, searchQuery)
      );
    }

    public filter(filterQuery: Record<string, string>) {
      this.modelQuery = this.modelQuery.find(filterQuery);
    }

    public sort(sortQuery: string) {
      this.modelQuery = this.modelQuery.sort(sortQuery);
    }

    public fields(fieldsQuery: string) {
      this.modelQuery = this.modelQuery.select(fieldsQuery);
    }

    public paginate(page: number, limit: number) {
      this.modelQuery = this.modelQuery.skip((page - 1) * limit).limit(limit);
    }

    public populate(populateList: Array<types.IQBPopulate>) {
      for (const { path, select } of populateList) {
        this.modelQuery = this.modelQuery.populate(path, select);
      }
    }

    public async getMeta(
      page: number,
      limit: number,
      options?: types.IUseQueryOptions
    ) {
      const total = await this.modelQuery.model.countDocuments({
        ...getSearchQuery<T>(
          options?.search,
          sanitizeQuery(this.query.search) ||
            sanitizeQuery(this.query.searchTerm)
        ),
        ...(() => {
          const filter = { ...this.query };
          for (const filed of excludesFields) {
            delete filter[filed];
          }
          return filter;
        })(),
      });

      let totalPage = Math.ceil(total / limit);

      page = options?.paginate ? page : 1;
      limit = options?.paginate ? limit : total;
      totalPage = options?.paginate ? totalPage : 1;

      return { page, limit, total, totalPage };
    }

    public async resolver(): Promise<{
      data: Array<T>;
      meta: types.IQBMeta;
    }> {
      let options = this.options || {};
      let page = Number(this.query.page) || defaultPage;
      let limit = Number(this.query.limit) || defaultLimit;
      const meta = await this.getMeta(page, limit, this.options);

      const query = {
        search:
          sanitizeQuery(this.query.search) ||
          sanitizeQuery(this.query.searchTerm),
        sort: sanitizeQuery(this.query.sort),
        fields: sanitizeQuery(this.query.fields),
      };

      if (options.populate?.length) {
        this.populate(options.populate);
      }

      if (options.sort && query.sort) {
        this.sort(query.sort);
      }

      if (options.fields && query.fields) {
        this.fields(query.fields);
      }

      if (options.search?.length && query.search) {
        this.search(options.search, query.search);
      }

      if (options.filter) {
        const filter = { ...this.query };
        for (const filed of excludesFields) {
          delete filter[filed];
        }
        this.filter(filter);
      }

      if (options.paginate !== void 0) {
        if (options.paginate) {
          this.paginate(page > meta.totalPage ? 1 : page, limit);
        } else {
          this.paginate(defaultPage, defaultLimit);
        }
      }

      const data = await this.modelQuery;

      return { meta, data };
    }
  };
};

const createQuery: types.TCreateQuery = (config) => {
  const QueryBuilder = createQueryBuilder(config);
  return async (model, query, options) => {
    const qb = new QueryBuilder(model, query, options);
    return await qb.resolver();
  };
};

export { createQueryBuilder, createQuery };
