import { Query, Model } from "mongoose";
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

  return class<T> {
    public modelQuery: Query<Array<T>, T>;

    constructor(
      public model: Model<T>,
      public readonly query: Record<string, string>,
      public readonly options?: types.IUseQueryOptions
    ) {
      this.modelQuery = this.model.find();
    }

    public populate() {
      if (this.options?.populate?.length) {
        for (const { path, select } of this.options.populate) {
          this.modelQuery = this.modelQuery.populate(path, select);
        }
      }
    }

    public filter() {
      const filter = { ...this.query };
      for (const filed of excludesFields) {
        delete filter[filed];
      }
      this.modelQuery = this.modelQuery.find(filter);
    }

    public search(searchableField: Array<string>) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableField.map((field) => ({
          [field]: {
            $regex:
              this.query.search?.trim() || this.query.searchTerm?.trim() || "",
            $options: "i",
          },
        })),
      });
    }

    public sort() {
      this.modelQuery = this.modelQuery.sort(
        this.query.sort?.trim() || defaultSortField
      );
    }

    public fields() {
      this.modelQuery = this.modelQuery.select(
        this.query.fields?.trim().split(",").join(" ") || ""
      );
    }

    public paginate(page: number, limit: number) {
      this.modelQuery = this.modelQuery.skip((page - 1) * limit).limit(limit);
    }

    public async getMeta(
      page: number,
      limit: number,
      options?: types.IUseQueryOptions
    ) {
      const search = {
        $or: options?.search?.map((field) => ({
          [field]: {
            $regex:
              this.query.search?.trim() || this.query.searchTerm?.trim() || "",
            $options: "i",
          },
        })),
      };

      const total = await this.modelQuery.model.countDocuments(
        options?.search?.length ? search : {}
      );

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
      const { fields, filter, paginate, search, sort } = this.options || {};
      const page = Number(this.query.page) || defaultPage;
      const limit = Number(this.query.limit) || defaultLimit;

      this.populate();

      if (fields) this.fields();
      if (filter) this.filter();
      if (sort) this.sort();
      if (search) this.search(search);
      console.log(search);

      if (paginate !== undefined)
        paginate
          ? this.paginate(page, limit)
          : this.paginate(defaultPage, defaultLimit);

      return {
        meta: await this.getMeta(page, limit, this.options),
        data: await this.modelQuery,
      };
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
