import { Query } from "mongoose";
import type { IOptions, QueryBuilderInstance } from "./types";
import { excludesFields } from "./constants";

const genQueryBuilder = (options: IOptions) => {
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
    constructor(
      public modelQuery: Query<Array<T>, T>,
      public readonly query: Record<string, string>
    ) {}

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
          [field]: { $regex: this.query.searchTerm || "", $options: "i" },
        })),
      });
      return this;
    }

    public sort() {
      this.modelQuery = this.modelQuery.sort(
        this.query.sort || defaultSortField
      );
      return this;
    }

    public fields() {
      this.modelQuery = this.modelQuery.select(
        this.query.fields?.split(",").join(" ") || ""
      );
      return this;
    }

    public paginate() {
      const page = Number(this.query.page) || defaultPage;
      const limit = Number(this.query.limit) || defaultLimit;
      const skip = (page - 1) * limit;
      this.modelQuery = this.modelQuery.skip(skip).limit(limit);
      return this;
    }

    public async getMeta() {
      const totalDocuments = await this.modelQuery.model.countDocuments();
      const page = Number(this.query.page) || defaultPage;
      const limit = Number(this.query.limit) || defaultLimit;
      const totalPage = Math.ceil(totalDocuments / limit);
      return { page, limit, total: totalDocuments, totalPage };
    }

    public async resolver(): Promise<{
      data: Array<T>;
      meta: { page: number; limit: number; total: number; totalPage: number };
    }> {
      const [meta, data] = await Promise.all([this.getMeta(), this.modelQuery]);
      return { meta, data };
    }
  };
};

const createUseQuery = (QueryBuilder: ReturnType<typeof genQueryBuilder>) => {
  return function useQuery<T>(
    modelQuery: Query<Array<T>, T>,
    query: Record<string, string>
  ): QueryBuilderInstance<T> {
    return new QueryBuilder(modelQuery, query) as QueryBuilderInstance<T>;
  };
};

export { genQueryBuilder, createUseQuery };
