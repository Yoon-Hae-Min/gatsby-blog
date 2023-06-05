module.exports = {
  extends: ['prettier'],
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'unused-imports', 'simple-import-sort'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto'
      }
    ],
    'no-console': 'warn',
    'unused-imports/no-unused-imports-ts': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
};
