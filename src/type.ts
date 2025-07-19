import { Query } from "mongoose";

export type QueryBuilderInstance<T> = {
  modelQuery: Query<T[], T>;
  query: Record<string, string>;
  filter(): QueryBuilderInstance<T>;
  search(fields: string[]): QueryBuilderInstance<T>;
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
    data: T[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
  }>;
};
