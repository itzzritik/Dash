import React from 'react';
import { useColorScheme } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import { getTheme } from '#data/theme';

import { AccountsProvider } from './accounts/AccountsContext';

const GlobalContextProvider = ({ children }) => {
	const colorScheme = useColorScheme();

	return (
		<SafeAreaProvider>
			<ThemeProvider theme={getTheme(colorScheme)}>
				<AccountsProvider>
					{children}
				</AccountsProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
};

export { useChat } from './accounts/AccountsContext';
export default GlobalContextProvider;
