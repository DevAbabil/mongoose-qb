"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BookOpen } from "lucide-react";
import CodeBlock from "../global/code-block";

const ExampleSection = () => {
  const [activeTab, setActiveTab] = useState<string>("usequery");

  const useQueryExample = `import { useQuery } from 'mongoose-qb'

export const retrievePosts = async (query: Record<string, string>) => {
  /* 
     useQuery<T>(model, query, options)
  */
  const post = await useQuery<IPost>(Post, query, {
    fields: true,
    filter: true,
    sort: true,
    paginate: true,
    excludes: ['comments', 'likes'],
    search: ['title', 'description', 'slug'],
    populate: [{ path: 'author', select: '-__v' }],
  })

  return post // returns { meta, data }
}`;

  const createQueryExample = `import { createQuery } from 'mongoose-qb'

// Create a custom instance in utils/useQuery.ts
export const useQuery = createQuery({
  defaultLimit: 30,
  defaultPage: 1,
  defaultSortField: '-createdAt',
})

// Then use it
import { useQuery } from '@/utils/useQuery'

export const retrievePosts = async (query: Record<string, string>) => {
  const post = await useQuery<IPost>(Post, query, {
    search: ['title', 'description', 'slug'],
    fields: true,
    filter: true,
    sort: true,
    paginate: true,
    /* ...more options */
  })

  return post // returns { meta, data }
}`;

  const populateExample = `// Supports flat and nested Mongoose populate
const result = await useQuery(Post, query, {
  populate: [
    { path: 'author', select: '-__v -password' },
    { path: 'comment', select: '-__v' },
    { path: 'field.inner', select: '-__v -title' },
  ],
})

// Exclude sensitive fields
const result = await useQuery(User, query, {
  excludes: ['password', '_id'],
})`;

  const responseExample = `{
  meta: {
    total: number       // Total documents
    page: number        // Current page
    limit: number       // Items per page
    totalPage: number   // Total pages
  },
  data: Array<T>        // Your documents
}

// Example response
{
  "meta": {
    "total": 156,
    "page": 1,
    "limit": 20,
    "totalPage": 8
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with MongoDB",
      "author": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe"
      }
    }
  ]
}`;

  return (
    <section id="usage" className="scroll-mt-20 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-700 dark:text-orange-400">
          <BookOpen className="h-4 w-4" />
          Code Examples
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Usage Examples</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Common patterns and use cases with TypeScript
        </p>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-orange-500/20 bg-linear-to-br from-orange-500/5 via-background to-red-500/5 p-6 shadow-lg shadow-orange-500/10">
        <div className="absolute -right-20 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="relative w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="usequery">useQuery</TabsTrigger>
            <TabsTrigger value="createquery">createQuery</TabsTrigger>
            <TabsTrigger value="populate">Advanced</TabsTrigger>
            <TabsTrigger value="response">Response</TabsTrigger>
          </TabsList>

          <TabsContent value="usequery" className="space-y-4 pt-6">
            <CodeBlock
              code={useQueryExample}
              language="typescript"
              title="Built-in useQuery Handler"
            />
            <p className="text-sm text-muted-foreground">
              Use the built-in handler to query any Mongoose model with full configuration options
            </p>
          </TabsContent>

          <TabsContent value="createquery" className="space-y-4 pt-6">
            <CodeBlock
              code={createQueryExample}
              language="typescript"
              title="Custom Query Factory"
            />
            <p className="text-sm text-muted-foreground">
              Create a custom query instance with default configurations for reusability
            </p>
          </TabsContent>

          <TabsContent value="populate" className="space-y-4 pt-6">
            <CodeBlock
              code={populateExample}
              language="typescript"
              title="Population & Exclusion"
            />
            <p className="text-sm text-muted-foreground">
              Populate related documents (including nested paths) and exclude sensitive fields
            </p>
          </TabsContent>

          <TabsContent value="response" className="space-y-4 pt-6">
            <CodeBlock code={responseExample} language="typescript" title="Response Format" />
            <p className="text-sm text-muted-foreground">
              Every response includes comprehensive metadata with pagination info and typed data
              array
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ExampleSection;
