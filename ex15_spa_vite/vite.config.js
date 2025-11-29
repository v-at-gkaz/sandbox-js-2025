export default {
    server: {
        port: 3000,
        proxy: {
            '/auth': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
            '/order': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        },
    },
};
