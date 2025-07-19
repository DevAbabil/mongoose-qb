import { Query } from "mongoose";

export type QueryBuilderInstance<T> = {
  modelQuery: Query<Array<T>, T>;
  query: Record<string, string>;
  filter(): QueryBuilderInstance<T>;
  search(fields: Array<string>): QueryBuilderInstance<T>;
  sort(): QueryBuilderInstance<T>;
  fields(): QueryBuilderInstance<T>;
  paginate(): QueryBuilderInstance<T>;
  getMeta(): Promise<{
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  }>;
  resolver(): Promise<{
    data: Array<T>;
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
  }>;
};
