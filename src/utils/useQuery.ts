import { genQueryBuilder, createUseQuery } from "../core";

export default createUseQuery(
  genQueryBuilder({
    defaultLimit: 10,
    defaultPage: 1,
  })
);
