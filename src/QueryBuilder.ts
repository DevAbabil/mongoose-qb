import { Query } from "mongoose";
import type { QueryBuilderInstance } from "./type"; // or wherever you put it

interface IOptions {
  excludesFields: Array<string>;
  defaultLimit: number;
  defaultPage: number;
  defaultSortField: string;
}

export const GenQueryBuilder = (options: IOptions) => {
  const { defaultLimit, defaultPage, defaultSortField, excludesFields } =
    options;
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

export const createUseQuery = (
  QueryBuilder: ReturnType<typeof GenQueryBuilder>
) => {
  return function useQuery<T>(
    modelQuery: Query<T[], T>,
    query: Record<string, string>
  ): QueryBuilderInstance<T> {
    return new QueryBuilder(
      modelQuery,
      query
    ) as unknown as QueryBuilderInstance<T>;
  };
};
