module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended', // Add accessibility linting rules
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y', // Add accessibility plugin
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // General rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'warn',

    // React rules
    'react/prop-types': 'warn',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Accessibility rules
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/no-static-element-interactions': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'either',
        depth: 25
      }
    ],
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      },
    ],
    'jsx-a11y/tabindex-no-positive': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/aria-role': [
      'error',
      {
        ignoreNonDOM: true,
      },
    ],
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/accessible-emoji': 'error',
  },
};
