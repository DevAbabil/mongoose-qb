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

export interface IQBPopulate {
  path: string;
  select?: string;
}
export interface IUseQueryOptions {
  search?: Array<string>;
  filter?: boolean;
  sort?: boolean;
  fields?: boolean;
  paginate?: boolean;
  populate?: Array<IQBPopulate>;
}

export interface IUseQueryResult<T> {
  data: Array<T>;
  meta: IQBMeta;
}

export type TCreateQuery = (
  config: IQBConfig
) => <T>(
  model: Model<T>,
  query: Record<string, string>,
  options?: IUseQueryOptions
) => Promise<IUseQueryResult<T>>;
