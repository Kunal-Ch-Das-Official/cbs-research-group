import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      'no-unused-vars': ['warn'], // Warn on unused variables
      'consistent-return': 'error', // Require consistent return statements
      eqeqeq: ['error', 'always'], // Enforce strict equality
      curly: 'error', // Require curly braces for all control statements
      'no-duplicate-imports': 'error', // Disallow duplicate imports
      'no-throw-literal': 'error', // Disallow throwing literals as exceptions
      'prefer-const': 'warn', // Suggest using const if variable is never reassigned
      'object-shorthand': 'warn', // Encourage shorthand syntax for object literals
      'array-callback-return': 'error', // Enforce return statement in callbacks of array methods
    },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
];
