import federation from "@originjs/vite-plugin-federation";

export default {
    base: "http://localhost:3001/",
    build: {
        target: "esnext",
    },
    plugins: [
        federation({
            name: "decide",
            filename: "remoteEntry.js",
            exposes: {
                "./ProductPage": "./src/ProductPage/ProductPage.jsx",
            },
            remotes: {
                'checkout': 'http://localhost:3002/remoteEntry.js'
            },
            shared: ["react"],
        }),
    ],
};
