import {
  Search,
  Filter,
  ArrowUpDown,
  Layers,
  NavigationIcon as PaginationIcon,
  Lock,
  Database,
  Zap,
  Code,
} from "lucide-react";

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Full-text Search",
    description: "Search across specified fields with flexible query syntax",
  },
  {
    icon: <Filter className="h-6 w-6" />,
    title: "Dynamic Filtering",
    description: "Exact match filtering on any model field",
  },
  {
    icon: <ArrowUpDown className="h-6 w-6" />,
    title: "Flexible Sorting",
    description: "Sort by any field with ascending or descending order",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Field Projection",
    description: "Limit returned fields for optimized responses",
  },
  {
    icon: <PaginationIcon className="h-6 w-6" />,
    title: "Pagination with Meta",
    description: "Built-in pagination with comprehensive metadata",
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Population Support",
    description: "Populate related documents including nested paths",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "TypeScript Support",
    description: "Full type safety with strict TypeScript definitions",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Built-in Handler",
    description: "Ready-to-use useQuery function for instant integration",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Custom Factory",
    description: "Optional createQuery factory for custom configurations",
  },
];
