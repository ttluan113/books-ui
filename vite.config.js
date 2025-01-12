import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'H:/dự án của tôi/books/nginx/ssl/book.local2-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'H:/dự án của tôi/books/nginx/ssl/book.local2.pem')),
        },
        host: 'localhost', // Thay thế bằng domain bạn muốn
        port: 3001, // Hoặc cổng bạn cần
    },
});
