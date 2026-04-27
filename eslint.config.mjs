// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Global ignores must be in their own standalone object
    ignores: [
      'node_modules/', 
      'playwright-browsers/', 
      'playwright-report/', 
      'test-results/', 
      'seed.spec.ts'
    ],
  },
  
  // Include standard ESLint base rules (Recommended)
  eslint.configs.recommended,
  
  // Include TypeScript recommended rules
  ...tseslint.configs.recommended,
  
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.url.substring(7, import.meta.url.lastIndexOf('/')),
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
);