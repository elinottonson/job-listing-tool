//Note: set rules to warn instead of error to avoid confusion with real errors
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended',
    'plugin:jest/recommended'
  ],
  plugins: ['jsdoc','jest'],
  rules: {
    'indent': ['warn', 2],
    'linebreak-style': ['warn', 'windows'],
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'always'],
    'max-len': ['warn', { code: 80 }],
    'object-property-newline':['warn'],
    'quote-props': ['warn','consistent-as-needed'],
    'space-infix-ops':['warn'],
    'array-element-newline': [
      'warn',
      {
        minItems: 3,
        multiline: true
      }
    ],
    'array-bracket-newline': [
      'warn',
      {
        minItems: 3,
        multiline: true
      }
    ]
  }
};
