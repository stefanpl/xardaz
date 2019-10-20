module.exports = {
  extends: ['airbnb-typescript/base', 'plugin:prettier/recommended'],
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'src/tests/**', 
        'webpack.config.js',
      ],
      optionalDependencies: false,
    }],
	'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'],
}
