export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export const INSTALL_COMMANDS: Record<PackageManager, string> = {
  npm: "npm install mongoose-qb",
  pnpm: "pnpm add mongoose-qb",
  yarn: "yarn add mongoose-qb",
  bun: "bun add mongoose-qb",
};

export const STORAGE_KEY = "preferred-package-manager";
