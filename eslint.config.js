module.exports = [
  {
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },  {
    files: ['**/*.ts', '**/*.tsx'],
  },
];
