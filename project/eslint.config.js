import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { ESLint } from '@typescript-eslint/parser';

export default {
  ignores: ['dist'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: [
        js.configs.recommended,
        '@typescript-eslint/eslint-recommended',
        '@typescript-eslint/recommended',
      ],
      plugins: ['react', 'react-hooks', 'react-refresh'],
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        // Any custom rules for TypeScript can be added here
      },
      env: {
        browser: true,
        node: true,
      },
      globals: {
        ...globals.browser,
      },
    },
  ],
};
