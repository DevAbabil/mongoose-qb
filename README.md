<h1 align='center'>mongoose-qb</h1>

A powerful and extensible query builder for Mongoose that simplifies complex query operations like filtering, searching, sorting, pagination, and field projection — all from HTTP query parameters.

[![npm version](https://img.shields.io/npm/v/mongoose-qb.svg)](https://www.npmjs.com/package/mongoose-qb)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 📦 Installation

```bash
npm install mongoose-qb
```

or

```bash
yarn add mongoose-qb
```

## Features

- Full-text search across specified fields
- Dynamic filtering with exact match
- Sorting by any model field
- Field limiting (projection)
- Pagination with meta info
- TypeScript support
- Built-in default query handler: `useQuery`

## Concept

This library generates flexible Mongoose queries based on your HTTP query parameters.

Example:

```
GET /tours?search=sundarban&sort=-price&fields=title,price&page=2&limit=10
```

## Syntax

1. ### Search

   ```http
   ?search=beach
   ```

   Searches across specified fields (e.g. `title`, `description`).

2. ### Filter (Exact Match)

   ```http
   ?title=Beach Holiday&slug=beach-holiday
   ```

   Filters by exact field match. Only enabled if `filter: true`.

3. ### Sort

   ```http
   ?sort=-createdAt,price
   ```

   Prefix field with `-` for descending order.

4. ### Field Projection

   ```http
   ?fields=title,price,createdAt
   ```

   Only include selected fields in the response.

5. ### Pagination

   ```http
   ?page=2&limit=20
   ```

## Usage Example

### With built-in `useQuery`

`service/tour.service.ts`

```ts
import { useQuery, IUseQueryOptions } from "mongoose-qb";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

export const retrieveAllTour = async (query: Record<string, string>) => {
  const options: IUseQueryOptions = {
    search: ["title", "description", "slug"],
    fields: true,
    filter: true,
    sort: true,
    paginate: true,
  };

  const query = useQuery<ITour>(Tour, query, options);

  return await query.resolver(); // returns { meta, data }
};
```

### With custom _`createQuery`_

`utils/useQuery.ts`

```ts
import { createQuery } from "mongoose-qb";

export const useQuery = createQuery({
  defaultLimit: 30,
  defaultPage: 1,
  defaultSortField: "-createdAt",
});
```

`service/tour.service.ts`

```ts
import { useQuery } from "@/utils/useQuery";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

export const retrieveAllTour = async (query: Record<string, string>) => {
  const query = useQuery<ITour>(Tour, query, {
    search: ["title", "description", "slug"],
    fields: true,
    filter: true,
    sort: true,
    paginate: true,
  });

  return await query.resolver(); // { meta, data }
};
```

## Return Format

```ts
{
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  },
  data: Array<T>
}
```

## 📄 License

MIT License © 2025 [DevAbabil](https://github.com/DevAbabil)

## 🧭 Vision

`mongoose-qb` aims to bring a clean, fluent, and highly customizable querying experience for Mongoose developers by reducing API boilerplate and making powerful features easy to use.

> Built with 🖤 by [DevAbabil](https://devababil.com) — designed to be simple, powerful, and lovable.
