import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic', // Add this for JSX parsing
  }), eslint({
    fix: true,
    include: ['src/**/*.js', 'src/**/*.jsx']
  })],
})
