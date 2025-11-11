/// <reference types="vitest/config" />
/// <reference types ="vitest/browser" />

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin(), tailwindcss()],
    server: {
        port: 56538,
    },
    test: {
        environment: 'jsdom'
    }
})
