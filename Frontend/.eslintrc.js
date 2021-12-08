//Note: set rules to warn instead of error to avoid confusion with real errors
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    browser: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended'
  ],
  plugins: ['jest'],
  rules: {
    'indent': ['warn', 2],
    'linebreak-style': ['warn', 'windows'],
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'always'],
    'max-len': ['warn', { code: 120 }],
    'quote-props': ['off'],
    'space-infix-ops':['warn'],
    'react/prop-types': [0],
    'no-unused-vars': ['off'],
    'no-constant-condition': ['off']
  }
};
