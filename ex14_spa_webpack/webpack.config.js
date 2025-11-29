const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 3000,
        hot: false,
        proxy: [
            {
                context: ['/auth', '/order'],
                target: 'http://localhost:8000',
                changeOrigin: true,
            }
        ],
    },
};