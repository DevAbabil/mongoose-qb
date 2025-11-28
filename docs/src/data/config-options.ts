export interface ConfigOption {
  option: string;
  type: string;
  description: string;
}

export const CONFIG_OPTIONS: ConfigOption[] = [
  {
    option: "search",
    type: "Array<string>",
    description: "Fields to search in",
  },
  {
    option: "fields",
    type: "boolean",
    description: "Enable field projection",
  },
  {
    option: "filter",
    type: "boolean",
    description: "Enable exact match filtering",
  },
  {
    option: "sort",
    type: "boolean",
    description: "Enable sorting",
  },
  {
    option: "paginate",
    type: "boolean",
    description: "Enable pagination",
  },
  {
    option: "populate",
    type: "Array<IQBPopulate>",
    description: "Population configuration",
  },
  {
    option: "excludes",
    type: "Array<keyof T>",
    description: "Fields to exclude from results",
  },
];
