/* eslint-disable import/no-namespace */
import * as NavigationBar from 'expo-navigation-bar';

import { OS } from '#utils/constants';

const
	lightTheme = {
		backgroundPrimary: '#ffffff',
		backgroundSecondary: '#eeeeee',
		backgroundTertiary: '#dddddd',

		contentPrimary: '#000000',
		contentSecondary: '#000000',
		contentTertiary: '#aaaaaa',

		brandPrimary: '#9797df',
	},
	darkTheme = {
		backgroundPrimary: '#000000',
		backgroundSecondary: '#111111',
		backgroundTertiary: '#222222',

		contentPrimary: '#ffffff',
		contentSecondary: '#ffffff',
		contentTertiary: '#444444',

		brandPrimary: '#9797df',
	},
	size = {
		headerHeight: 55,
	},
	general = {
		blur: 80,
		chatInputPadding: 20,
	},

	getTheme = (colorScheme) => {
		const isLight = colorScheme === 'light',
			color = isLight ? lightTheme : darkTheme;

		if (OS.android) {
			NavigationBar.setPositionAsync('absolute');
			NavigationBar.setBackgroundColorAsync('#ffffff00');
			NavigationBar.setButtonStyleAsync(isLight ? 'dark' : 'light');
		}

		return {
			name: colorScheme,
			color,
			size,
			general,
		};
	};

export { getTheme };
