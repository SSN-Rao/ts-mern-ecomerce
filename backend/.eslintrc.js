module.exports = {
  env: {
    es2016: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
}
