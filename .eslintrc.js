module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  'global-requie': 'off',
  plugins: ['react', 'jsx-ally', 'import'],
  rules: {
    'react/jsx-filename-extension': ['error', {extensions: ['.js', '.jsx']}],
    'global-require': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-expressions': ['error', {allowTaggedTemplates: true}],
    strict: 0,
  },
};
