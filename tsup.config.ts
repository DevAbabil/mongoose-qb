import { defineConfig, Options } from "tsup";

const sharedConfig: Options = {
  esbuildOptions(options) {
    options.mangleProps = /^_/;
    options.mangleQuoted = true;
    return options;
  },
  dts: true,
  clean: true,
};

export default defineConfig([
  {
    ...sharedConfig,
    entry: ["src/index.ts"],
    format: ["esm"],
    outExtension: () => ({ js: ".mjs" }),
    outDir: "dist",
  },
  {
    ...sharedConfig,
    entry: ["src/index.cts"],
    format: ["cjs"],
    outExtension: () => ({ js: ".cjs" }),
    outDir: "dist",
  },
]);
