module.exports = {
  'root': true,
  'plugins': [
    'webdriverio',
    '@typescript-eslint'
  ],
  'env': {
    'webdriverio/wdio': true
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 2015
  },
  rules: {
    'semi': 'off',
    '@typescript-eslint/semi': ['error'],
    'no-mixed-spaces-and-tabs': 'error',
    'no-tabs': 'error',
    'quotes': ['error', 'single', {
      avoidEscape: true
    }],
    'camelcase': 'off',
    'no-trailing-spaces': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'default',
        'format': ['camelCase']
      },

      {
        'selector': 'variable',
        'format': ['camelCase', 'UPPER_CASE']
      },
      {
        'selector': 'parameter',
        'format': ['camelCase'],
        'leadingUnderscore': 'allow'
      },

      {
        'selector': 'memberLike',
        'modifiers': ['private'],
        'format': ['camelCase'],
        'leadingUnderscore': 'allow'
      },

      {
        'selector': 'typeLike',
        'format': ['PascalCase']
      }
    ],
    'space-before-function-paren': ['warn', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'spaced-comment': ['warn', 'always', {
      'markers': ['/']
    }],
    'object-curly-spacing': ['warn', 'always'],
    'space-infix-ops': 'warn',
    'space-unary-ops': ['warn', {
      'words': true,
      'nonwords': false,
    }],
    'space-in-parens': ['warn', 'never'],
    'indent': ['warn', 2, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'SwitchCase': 1
    }],
    'space-before-blocks': ['warn', 'always'],
    'keyword-spacing': 'warn',
    'key-spacing': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-use-before-define': 'error',
    'require-await': 'warn',
    '@typescript-eslint/member-delimiter-style': 'warn'
  }
};