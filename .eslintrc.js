const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'import',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2019,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
    },
  },
  rules: {
    'no-console': isProduction ? 'error' : 'off',
    'no-debugger': isProduction ? 'error' : 'off',
    'prettier/prettier': 0,
    'generator-star-spacing': 0,
    'space-before-function-paren': ['error', 'always'],
    'no-undef': 0,
    'object-shorthand': ['error', 'never'],
    'func-names': ['error', 'never'],
    indent: ['error', 2],
    semi: [2, 'always'],
    'no-plusplus': ['off'],
    'import/no-unresolved': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'linebreak-style': ['error', 'unix'],
    'eslint-comments/no-unlimited-disable': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': 0,
    'global-require': 0,
    'no-param-reassign': 0,
    'max-len': 0,
  },
  overrides: [
    // Jest - tests
    {
      env: {
        jest: true,
      },
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      plugins: [
        'jest',
      ],
    },
    // Typescript
    {
      files: ['**/*.ts', '**/*.tsx', '*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/all',
      ],
      plugins: [
        '@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/indent': ['error', 2],
        '@typescript-eslint/no-type-alias': 0,
        '@typescript-eslint/strict-boolean-expressions': 0,
        '@typescript-eslint/no-magic-numbers': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: { delimiter: 'comma', requireLast: true },
          singleline: { delimiter: 'comma', requireLast: true },
        }],
        '@typescript-eslint/consistent-type-definitions': 0,
        '@typescript-eslint/default-param-last': 0,
        '@typescript-eslint/no-require-imports': 0,
        '@typescript-eslint/no-unnecessary-condition': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/prefer-readonly-parameter-types': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars-experimental': 0,
        '@typescript-eslint/no-extra-parens': 0,
        '@typescript-eslint/prefer-nullish-coalescing': 0,
        '@typescript-eslint/init-declarations': 0,
        '@typescript-eslint/prefer-optional-chain': 0,
        'no-await-in-loop': 0,
      },
    },
  ],
};
