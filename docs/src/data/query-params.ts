export interface QueryParam {
  name: string;
  type: string;
  example: string;
  description: string;
}

export const QUERY_PARAMS: QueryParam[] = [
  {
    name: "search",
    type: "string",
    example: "search=sundarban",
    description: "Searches across configured fields",
  },
  {
    name: "filter",
    type: "string",
    example: "title=Beach Holiday",
    description: "Exact match filtering on any field",
  },
  {
    name: "sort",
    type: "string",
    example: "sort=-createdAt,price",
    description: "Sort with - prefix for descending",
  },
  {
    name: "fields",
    type: "string",
    example: "fields=title,price",
    description: "Field projection (select specific fields)",
  },
  {
    name: "page",
    type: "number",
    example: "page=2",
    description: "Page number for pagination",
  },
  {
    name: "limit",
    type: "number",
    example: "limit=20",
    description: "Number of items per page",
  },
];
