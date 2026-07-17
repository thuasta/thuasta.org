import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import regexp from 'eslint-plugin-regexp';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      'build/**',
      '.docusaurus/**',
      'node_modules/**',
      'static/**',
      '.stylelintrc.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  regexp.configs['flat/recommended'],
  reactHooks.configs.flat.recommended,
  prettier,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
);
