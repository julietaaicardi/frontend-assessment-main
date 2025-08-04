import js from '@eslint/js'
import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,ts}'],
    ignores: ['.nuxt/**/*'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        defineNuxtConfig: 'readonly',
        definePageMeta: 'readonly',
        useRuntimeConfig: 'readonly',
        useNuxtApp: 'readonly',
        vi: 'readonly',
        defineEventHandler: 'readonly',
        getQuery: 'readonly',
        $fetch: 'readonly',
        createError: 'readonly',
        useTranslationKeysApi: 'readonly',
        ComputedRef: 'readonly',
        Ref: 'readonly',
        IntersectionObserverInit: 'readonly',
        HTMLElementEventMap: 'readonly',
        Buffer: 'readonly',
        Response: 'readonly',
        Headers: 'readonly',
        URL: 'readonly',
        console: 'readonly',
        event: 'readonly',
      },
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
]
