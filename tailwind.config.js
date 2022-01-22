module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.ts'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            syntax: 'postcss-scss',
            plugins: ['postcss-import', 'tailwindcss', 'autoprefixer'],
          },
        },
      },
    ],
  },
}
