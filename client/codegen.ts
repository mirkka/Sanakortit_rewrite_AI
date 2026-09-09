import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../server/src/lambda/schema.graphql',
  documents: 'src/**/*.{tsx,ts}',
  generates: {
    './src/generated/': {
      preset: 'client',
    },
  },
}

export default config
