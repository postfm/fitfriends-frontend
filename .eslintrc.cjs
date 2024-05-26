/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "htmlacademy/react-typescript",
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: 'tsconfig.json', tsconfigRootDir: __dirname, },
  settings: { react: { version: 'detect' } },
  ignorePatterns: ['.eslintrc.cjs', 'jest.config.js'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/no-shadow': 'off',
  },
  overrides: [
    {
      files: [ '*test*' ],
      rules: { '@typescript-eslint/unbound-method': 'off' }
    },
  ],
}
