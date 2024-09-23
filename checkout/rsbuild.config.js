import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {ModuleFederationPlugin} from "@module-federation/enhanced/rspack";

export default defineConfig({
  dev: {
    assetPrefix: 'http://localhost:3002/',
  },
  server: {
    port: 3002,
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      output: {
        uniqueName: "checkout"
      },
      plugins: [
        new ModuleFederationPlugin({
          name: 'checkout',
          filename: 'remoteEntry.js',
          exposes: {
            './AddToCart': './src/AddToCart/AddToCart.jsx',
            './CartPage': './src/CartPage/CartPage.jsx',
            './Checkout': './src/Checkout/Checkout.jsx',
            './Thanks': './src/Thanks/Thanks.jsx',
            './MiniCart': './src/MiniCart/MiniCart.jsx'
          },
          remotes: {},
          shared: ['react', 'react-dom'],
        }),
      ]
  },
}});
