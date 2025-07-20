# mongoose-qb

A powerful and flexible query builder for **Mongoose** that simplifies building complex queries with filtering, searching, sorting, field limiting, and pagination.

## 🚀 Installation

```bash
npm install mongoose-qb
```

or

```bash
yarn add mongoose-qb
```

## 🌟 Overview

`mongoose-qb` helps you create **reusable query builder hooks/functions** that wrap around Mongoose queries, making it easy to apply common query patterns such as:

- 🔍 Searching (across multiple fields)
- 🎯 Filtering
- 🔃 Sorting
- 📦 Field selection
- 📚 Pagination

## 📘 Core Concepts

- **`genQueryBuilder(options)`**: Generate a customized query builder instance.
- **`createUseQuery(QueryBuilder)`**: Create a reusable query function based on your builder.
- **Chainable API**: Use `.search()`, `.filter()`, `.sort()`, `.fields()`, `.paginate()`.
- **`.resolver()`**: Executes the query and returns data with metadata.

## ⚙️ Usage

### ✅ Option 1: Use the built-in `useQuery` (with default config)

```ts
import { useQuery } from "mongoose-qb";

export const retrieveAllTour = async (query: Record<string, string>) => {
  const result = await useQuery<ITour>(Tour.find(), query)
    .search(["title", "description", "location"])
    .filter()
    .sort()
    .fields()
    .paginate()
    .resolver();

  return result;
};
```

### 🛠️ Option 2: Create a custom-configured query builder

#### Step 1: Generate a QueryBuilder

```ts
import { genQueryBuilder } from "mongoose-qb";

const QueryBuilder = genQueryBuilder({
  defaultLimit: 10,
  defaultPage: 1,
  defaultSortField: "-createdAt",
});
```

> 🧠 `mongoose-qb` automatically excludes common control keys like `searchTerm`, `sort`, `fields`, `page`, and `limit` from filtering. You don’t need to configure that manually.

#### Step 2: Create a reusable query function

```ts
import { createUseQuery } from "mongoose-qb";

export const useQuery = createUseQuery(QueryBuilder);
```

#### Step 3: Use it in your service or controller

```ts
import { useQuery } from "./your-query-file";

export const retrieveAllTour = async (query: Record<string, string>) => {
  const result = await useQuery<ITour>(Tour.find(), query)
    .search(["title", "description", "location"])
    .filter()
    .sort()
    .fields()
    .paginate()
    .resolver();

  return result;
};
```

## 🔧 `genQueryBuilder` Options

```ts
genQueryBuilder({
  defaultLimit?: number;        // Default limit per page (default: 10)
  defaultPage?: number;         // Default starting page (default: 1)
  defaultSortField?: string;    // Default sort key (e.g. "-createdAt")
});
```

## 🧠 Chainable Methods

| Method                      | Description                                                   |
| --------------------------- | ------------------------------------------------------------- |
| `.search(fields: string[])` | Performs text search using the `searchTerm` query param       |
| `.filter()`                 | Filters documents based on query keys (ignoring control keys) |
| `.sort()`                   | Sorts using the `sort` query param or default                 |
| `.fields()`                 | Selects fields using `fields=title,description`               |
| `.paginate()`               | Uses `page` and `limit` to paginate                           |
| `.resolver()`               | Executes and returns `{ meta, data }`                         |

## 📦 Return Format

```ts
{
  meta: {
    total: number;  // Total matching documents
    limit: number;  // Documents per page
    page: number;   // Current page
    pages: number;  // Total pages
  },
  data: T[]         // Results (typed)
}
```

### Example Response

```json
{
  "meta": {
    "total": 42,
    "limit": 10,
    "page": 2,
    "pages": 5
  },
  "data": [
    {
      "_id": "66a12c...",
      "title": "Explore Sundarbans",
      "location": "Khulna",
      "description": "A 3-day adventurous tour into the world's largest mangrove forest."
    }
  ]
}
```

## 🔍 Supported Query Parameters

- `searchTerm=...`
- `sort=createdAt` or `sort=-price`
- `fields=title,location`
- `page=2`
- `limit=5`

## 🧑‍💻 TypeScript Support

Built with full TypeScript support.

```ts
const result = await useQuery<ITour>(Tour.find(), query).resolver();
result.data[0].title; // ✅ type-safe
```

## 🤝 Contributing

We welcome contributions!

1. Fork this repo
2. Create a feature branch
3. Submit a pull request 🚀

## 📄 License

MIT License © 2025 [DevAbabil](https://github.com/DevAbabil)

## 🧭 Vision

`mongoose-qb` aims to bring a clean, fluent, and highly customizable querying experience for Mongoose developers by reducing API boilerplate and making powerful features easy to use.

> Built with 🖤 by [DevAbabil](https://devababil.com) — designed to be simple, powerful, and lovable.
