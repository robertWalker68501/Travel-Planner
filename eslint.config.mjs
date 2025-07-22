import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals', // Or your preferred Next.js base config
      'next/typescript', // If you're using TypeScript
      'prettier', // This extends eslint-config-prettier, turning off conflicting rules
    ],
    plugins: [
      'prettier', // This enables eslint-plugin-prettier
    ],
    rules: {
      // You can optionally add specific Prettier rules here if needed,
      // though typically eslint-plugin-prettier handles this.
      // "prettier/prettier": "error",
    },
  }),
];

export default eslintConfig;
