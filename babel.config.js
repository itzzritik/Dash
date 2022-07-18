/* eslint-disable import/no-commonjs */
/* eslint-disable no-undef */

module.exports = function (api) {
	api.cache(true);

	let alias = require('./jsconfig.json').compilerOptions,
		root = [alias.baseUrl];
	alias = alias.paths;
	alias = Object.keys(alias).reduce((acc, key) => {
		if (key.endsWith('/*') || alias[key][0].endsWith('/*'))
			acc[key.replaceAll('/*', '')] = alias[key][0].replaceAll('/*', '');
		else acc[key] = alias[key][0];
		return acc;
	}, {});

	return {
		presets: ['babel-preset-expo'],
		env: {
			production: {
				plugins: ['transform-remove-console'],
			},
		},
		plugins: [
			['@babel/plugin-proposal-decorators', { 'legacy': true }],
			['@babel/plugin-transform-runtime', { 'helpers': true, 'regenerator': true }],
			'babel-plugin-styled-components',
			['module-resolver', { root, alias, extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.d.ts'] }],
			'react-native-reanimated/plugin',
		],
	};
};
