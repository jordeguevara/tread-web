import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:7777/query",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
