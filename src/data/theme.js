/* eslint-disable import/no-namespace */
import * as NavigationBar from 'expo-navigation-bar';

import { OS } from '#utils/constants';

const
	lightTheme = {
		backgroundPrimary: '#F6F6F7',
		backgroundSecondary: '#FFFFFF',
		backgroundTertiary: '#dddddd',

		contentPrimary: '#192438',
		contentSecondary: '#848C96',
		contentTertiary: '#aaaaaa',

		brandPrimary: '#42a5f5',

		accentSuccess: '#4caf50',
		accentWarning: '#ff9800',
		accentDanger: '#ef5350',
	},
	darkTheme = {
		backgroundPrimary: '#1E1F21',
		backgroundSecondary: '#252728',
		backgroundTertiary: '#222222',

		contentPrimary: '#FFFFFF',
		contentSecondary: '#6C6E72',
		contentTertiary: '#444444',

		brandPrimary: '#42a5f5',

		accentSuccess: '#4caf50',
		accentWarning: '#ff9800',
		accentDanger: '#ef5350',
	},
	size = {
		headerHeight: 60,
	},
	general = {
		blur: 80,
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
