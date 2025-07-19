# mongoose-qb

A powerful and flexible query builder for Mongoose to simplify building complex queries with filtering, searching, sorting, field limiting, and pagination.

## Installation

```bash
npm install mongoose-qb
```

or

```bash
yarn add mongoose-qb
```

## Overview

`mongoose-qb` helps you create reusable query builder hooks/functions that wrap around Mongoose queries, making it easy to apply common query patterns such as:

- Searching (across multiple fields)
- Filtering
- Sorting
- Selecting specific fields
- Pagination

## Core Concepts

- **GenQueryBuilder(options)**: Generate a customized query builder instance with configuration.
- **createUseQuery(QueryBuilder)**: Creates a reusable query function based on your QueryBuilder.
- **Query chaining**: Chain methods like `.search()`, `.filter()`, `.sort()`, `.fields()`, and `.paginate()` on your query.
- **resolver()**: Executes the built query and returns data along with metadata.

## Usage

### Step 1: Generate a QueryBuilder

```ts
import { GenQueryBuilder } from "mongoose-qb";

const QueryBuilder = GenQueryBuilder({
  excludesFields: ["searchTerm", "sort", "fields", "page", "limit"],
  defaultLimit: 10,
  defaultPage: 1,
  defaultSortField: "-createdAt",
});
```

- `excludesFields`: Array of query parameter keys that should be excluded from filtering logic.
- `defaultLimit`: Default number of documents per page.
- `defaultPage`: Default page number.
- `defaultSortField`: Default sorting field (prefix with `-` for descending).

### Step 2: Create a reusable query function

```ts
import { createUseQuery } from "mongoose-qb";

export const useQuery = createUseQuery(QueryBuilder);
```

### Step 3: Use the query builder in your data fetching function

```ts
import { useQuery } from "./your-query-file";

export const retrieveAllTour = async (query: Record<string, string>) => {
  const tour = await useQuery<ITour>(Tour.find(), query)
    .search(["title", "description", "location"]) // Search across multiple fields
    .filter() // Filter based on query parameters (excluding the excluded ones)
    .sort() // Sort based on query or default
    .fields() // Select specific fields from the query
    .paginate() // Apply pagination
    .resolver(); // Execute and return results

  return tour; // Returns { meta, data }
};
```

- **Parameters:**

  - `Tour.find()`: Mongoose query to start with.
  - `query`: Query parameters (usually from request query).

- **Chainable methods:**

  - `.search(fields: string[])`: Performs a text search on the specified fields using the `searchTerm` query parameter.
  - `.filter()`: Filters documents based on query parameters except those in `excludesFields`.
  - `.sort()`: Sorts documents based on the `sort` query parameter or uses `defaultSortField`.
  - `.fields()`: Selects fields based on the `fields` query parameter (comma-separated).
  - `.paginate()`: Applies pagination using `page` and `limit` query parameters.
  - `.resolver()`: Executes the built query and returns the results along with meta information such as total count, page info, etc.

## Return Value

The `.resolver()` method returns a promise resolving to an object:

```ts
{
  meta: {
    total: number;       // total matching documents count
    limit: number;       // documents per page
    page: number;        // current page number
    pages: number;       // total number of pages
  },
  data: T[]               // array of documents of type T
}
```

## Example Query Parameters

- `searchTerm`: Text to search across specified fields.
- `sort`: Field(s) to sort by, prefix with `-` for descending (e.g., `sort=-createdAt`).
- `fields`: Comma-separated fields to include (e.g., `fields=title,description`).
- `page`: Page number for pagination.
- `limit`: Number of documents per page.
