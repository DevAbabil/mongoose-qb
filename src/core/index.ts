import { Query, Model } from "mongoose";
import { excludesFields } from "./constants";
import type {
  IQBMeta,
  IQBConfig,
  IUseQueryOptions,
  TCreateQuery,
} from "./types";

const createQueryBuilder = (options: IQBConfig) => {
  const { defaultLimit, defaultPage, defaultSortField } = options;

  if (defaultLimit <= 0)
    throw new Error("[mongoose-qb]: 'defaultLimit' must be greater than 0");

  if (defaultPage <= 0)
    throw new Error("[mongoose-qb]: 'defaultPage' must be greater than 0");

  if (defaultSortField?.trim() === "")
    throw new Error(
      "[mongoose-qb]: 'defaultSortField' must be a contentful string"
    );

  return class<T> {
    public modelQuery: Query<Array<T>, T>;

    constructor(
      public model: Model<T>,
      public readonly query: Record<string, string>,
      public readonly config?: IUseQueryOptions
    ) {
      this.modelQuery = this.model.find();
    }

    public filter() {
      const filter = { ...this.query };
      for (const filed of excludesFields) {
        delete filter[filed];
      }

      this.modelQuery = this.modelQuery.find(filter);
      return this;
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
      return this;
    }

    public sort() {
      this.modelQuery = this.modelQuery.sort(
        this.query.sort?.trim() || defaultSortField
      );
      return this;
    }

    public fields() {
      this.modelQuery = this.modelQuery.select(
        this.query.fields?.trim().split(",").join(" ") || ""
      );
      return this;
    }

    public paginate(page: number, limit: number) {
      this.modelQuery = this.modelQuery.skip((page - 1) * limit).limit(limit);
      return this;
    }

    public async getMeta(
      page: number,
      limit: number,
      options?: IUseQueryOptions
    ) {
      const total = await this.modelQuery.model.countDocuments();
      let totalPage = Math.ceil(total / limit);

      page = options?.paginate ? page : 1;
      limit = options?.paginate ? limit : total;
      totalPage = options?.paginate ? totalPage : 1;

      return { page, limit, total, totalPage };
    }

    public async resolver(): Promise<{
      data: Array<T>;
      meta: IQBMeta;
    }> {
      const { fields, filter, paginate, search, sort } = this.config || {};
      const page = Number(this.query.page) || defaultPage;
      const limit = Number(this.query.limit) || defaultLimit;

      if (fields) this.fields();
      if (filter) this.filter();
      if (sort) this.sort();
      if (search) this.search(search);

      if (paginate !== undefined)
        paginate
          ? this.paginate(page, limit)
          : this.paginate(defaultPage, defaultLimit);

      return {
        meta: await this.getMeta(page, limit, this.config),
        data: await this.modelQuery,
      };
    }
  };
};

const createQuery: TCreateQuery = (config) => {
  const QueryBuilder = createQueryBuilder(config);
  return (model, query, options) => {
    return new QueryBuilder(model, query, options);
  };
};

export { createQueryBuilder, createQuery };
