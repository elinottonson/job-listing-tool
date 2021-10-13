//Note: set rules to warn instead of error to avoid confusion with real errors
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsdoc/recommended',
    'plugin:jest-dom/recommended'
  ],
  plugins: ['jsdoc','jest-dom','react'],
  rules: {
    'indent': ['warn', 2],
    'linebreak-style': ['warn', 'windows'],
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'always'],
    'max-len': ['warn', { code: 120 }],
    'quote-props': ['warn','consistent-as-needed'],
    'space-infix-ops':['warn']
  }
};