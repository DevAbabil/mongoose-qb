<h1 align="center">mongoose-qb</h1>

<p align="center">
  A powerful and extensible query builder for Mongoose that simplifies complex query operations like filtering, searching, sorting, pagination, field projection, and population — all from HTTP query parameters.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/mongoose-qb">
    <img src="https://img.shields.io/npm/v/mongoose-qb.svg" alt="npm version">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white" alt="TypeScript">
  </a>
</p>

## Installation

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
- Population support (including nested paths)
- TypeScript support
- Built-in handler: `useQuery`
- Optional factory: `createQuery`

## Concept

This library builds flexible and clean Mongoose queries from HTTP query parameters.

#### Example request:

```
GET /tours?search=sundarban&sort=-price&fields=title,price&page=2&limit=10
```

## Supported Query Parameters

1. ### Search

   ```http
   ?search=beach
   ```

   - Searches across configured fields (e.g., `title`, `description`, etc.)
   - Requires `search: string[]` in config

2. ### Filter (Exact Match)

   ```http
   ?title=Beach Holiday&slug=beach-holiday
   ```

   - Matches documents with exact field values
   - Enabled via `filter: true`

3. ### Sort

   ```http
   ?sort=-createdAt,price
   ```

   - Prefix with `-` for descending order
   - Multiple fields supported

4. ### Field Limiting

   ```http
   ?fields=title,price,createdAt
   ```

   - Includes only the selected fields in the result

5. ### Pagination

   ```http
   ?page=2&limit=20
   ```

   - Default values can be customized with `createQuery()`

6. ### Population

   Supports flat and nested Mongoose `populate()` paths.

   ```ts
   populate: [
     { path: "author", select: "-__v" },
     { path: "comment", select: "-__v" },
     { path: "filed.inner", select: "-__v -title" },
   ];
   ```

## Usage Examples

`useQuery options:`

```ts
const options: IUseQueryOptions = {
  search: ["title", "description", "slug"], // searchable fields for `search` or `searchTerm` query
  fields: true, //  to enable projection to select specific filed, default false
  filter: true, // to enable filed filtering, default false
  sort: true, // to enable sorting, default false
  paginate: true, // to enable pagination, default false
  populate: [{ path: "author", select: "-__v" }], // to populate fields
};
```

### Basic Example (with built-in `useQuery`)

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
    populate: [{ path: "author", select: "-__v" }],
  };

  const qb = useQuery<ITour>(Tour, query, options); // useQuery<T>(model, query, options)

  return await qb.resolver(); // returns { meta, data }
};
```

### Custom `createQuery` Factory

`utils/useQuery.ts`:

```ts
import { createQuery } from "mongoose-qb";

export const useQuery = createQuery({
  defaultLimit: 30,
  defaultPage: 1,
  defaultSortField: "-createdAt",
});
```

Usage:

```ts
import { useQuery } from "@/utils/useQuery";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

export const retrieveAllTour = async (query: Record<string, string>) => {
  const qb = useQuery<ITour>(Tour, query, {
    search: ["title", "description", "slug"],
    fields: true,
    filter: true,
    sort: true,
    paginate: true,
  });

  return await qb.resolver(); // { meta, data }
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
  data: Array<T>;
}
```

## License

MIT License © 2025 [DevAbabil](https://devababil.com)

## Vision

`mongoose-qb` aims to bring a clean, fluent, and highly customizable querying experience to Mongoose-based applications — by reducing boilerplate and unlocking the full potential of query parameters.

> Built with 🖤 by [DevAbabil](https://github.com/DevAbabil) — designed to be simple, powerful, and lovable.
