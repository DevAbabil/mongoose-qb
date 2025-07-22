import { Model } from "mongoose";

export interface IQBConfig {
  defaultLimit: number;
  defaultPage: number;
  defaultSortField?: string;
}

export interface IQBMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IUseQueryOptions {
  search?: Array<string>;
  filter?: boolean;
  sort?: boolean;
  fields?: boolean;
  paginate?: boolean;
  populate?: Array<{ path: string; select?: string }>;
}

export type TQueryBuilderInstance<T> = {
  resolver(): Promise<{
    data: Array<T>;
    meta: IQBMeta;
  }>;
};

export type TCreateQuery = (
  config: IQBConfig
) => <T>(
  model: Model<T>,
  query: Record<string, string>,
  options?: IUseQueryOptions
) => TQueryBuilderInstance<T>;

export type TUseQuery = ReturnType<TCreateQuery>;
