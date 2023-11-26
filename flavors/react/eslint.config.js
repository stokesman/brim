import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

// Until configs from 'eslint-plugin-react' are included in the package
const reactRecommended = {
  'react/display-name': 2,
  'react/jsx-key': 2,
  'react/jsx-no-comment-textnodes': 2,
  'react/jsx-no-duplicate-props': 2,
  'react/jsx-no-target-blank': 2,
  'react/jsx-no-undef': 2,
  'react/jsx-uses-vars': 2,
  'react/no-children-prop': 2,
  'react/no-danger-with-children': 2,
  'react/no-deprecated': 2,
  'react/no-direct-mutation-state': 2,
  'react/no-find-dom-node': 2,
  'react/no-is-mounted': 2,
  'react/no-render-return-value': 2,
  'react/no-string-refs': 2,
  'react/no-unescaped-entities': 2,
  'react/no-unknown-property': 2,
  'react/no-unsafe': 0,
  'react/require-render-return': 2,
}

export default [
  // 'eslint:recommended',
  /** ^ disabled because it will not respect `files` and `ignores`
   * @see https://github.com/eslint/eslint/issues/16537
   */
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ignores: ['dist/*', 'types/*'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactRecommended,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]