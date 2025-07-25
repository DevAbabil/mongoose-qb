<h1 align='center'>mongoose-qb</h1>

<div align="center">
  <p>
    <em>A powerful and extensible query builder for Mongoose</em>
  </p>
  <p>Simplify complex query operations like filtering, searching, sorting, pagination and field projection — all from HTTP query parameters.</p>

  <div>
    <a href="https://www.npmjs.com/package/mongoose-qb">
      <img src="https://img.shields.io/npm/v/mongoose-qb.svg" alt="npm version">
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white" alt="TypeScript">
    </a>
  </div>
</div>

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

## Installation

```bash
npm install mongoose-qb
# or
yarn add mongoose-qb
```

## Concept

Build flexible and clean Mongoose queries from HTTP query parameters.

**Example request:**

```
GET /tours?search=sundarban&sort=-createdAt,price&d=title,price&page=2&limit=20
```

## Supported Query Parameters

| Parameter      | Example                  | Description                         |
| -------------- | ------------------------ | ----------------------------------- |
| **Search**     | `?search=sundarban`      | Searches across configured fields   |
| **Filter**     | `?title=Beach Holiday`   | Exact match filtering               |
| **Sort**       | `?sort=-createdAt,price` | Sort with `-` prefix for descending |
| **Fields**     | `?fields=title,price`    | Field projection                    |
| **Pagination** | `?page=2&limit=20`       | Pagination control                  |

### Population

Supports flat and nested Mongoose `populate`.

```ts
populate: [
  { path: "author", select: "-__v -password" },
  { path: "comment", select: "-__v" },
  { path: "field.inner", select: "-__v -title" },
];
```

## Usage Examples

### Basic Example (with built-in `useQuery`)

```typescript
import { useQuery } from "mongoose-qb";

export const retrievePosts = async (query: Record<string, string>) => {
  /* 
     useQuery<T>(model, query, options)
  */
  const post = await useQuery<IPost>(Post, query, {
    fields: true,
    filter: true,
    sort: true,
    paginate: true,
    search: ["title", "description", "slug"],
    populate: [{ path: "author", select: "-__v" }],
  });

  return post; // returns { meta, data }
};
```

### Custom Query Factory

Create a custom instance in `utils/useQuery.ts`:

```typescript
import { createQuery } from "mongoose-qb";

export const useQuery = createQuery({
  defaultLimit: 30,
  defaultPage: 1,
  defaultSortField: "-createdAt",
});
```

Then use it:

```typescript
import { useQuery } from "@/utils/useQuery";

export const retrievePosts = async (query: Record<string, string>) => {
  const post = await useQuery<IPost>(Post, query, {
    search: ["title", "description", "slug"],
    fields: true,
    filter: true,
    sort: true,
    paginate: true,
  });

  return post; // returns { meta, data }
};
```

## Response Format

```typescript
{
  meta: {
    total: number;       // Total documents
    page: number;        // Current page
    limit: number;       // Items per page
    totalPages: number;  // Total pages
  },
  data: Array<T>;       // Your documents
}
```

## Configuration Options

| Option     | Type                 | Description                  |
| ---------- | -------------------- | ---------------------------- |
| `search`   | `Array<string>`      | Fields to search in          |
| `fields`   | `boolean`            | Enable field projection      |
| `filter`   | `boolean`            | Enable exact match filtering |
| `sort`     | `boolean`            | Enable sorting               |
| `paginate` | `boolean`            | Enable pagination            |
| `populate` | `Array<IQBPopulate>` | Population configuration     |

## License

MIT License © 2025 [DevAbabil](https://devababil.com)

## Vision

`mongoose-qb` aims to bring a clean, fluent, and highly customizable querying experience to Mongoose-based applications — reducing boilerplate and unlocking the full potential of query parameters.

> Built with ❤️ by [DevAbabil](https://github.com/DevAbabil)
