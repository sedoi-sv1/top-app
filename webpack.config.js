module.exports = {
    test: /\.svg$/,
    issuer: {
            test: /\.(js|ts)x?$/,
        },
    use: ['@svgr/webpack'],
};