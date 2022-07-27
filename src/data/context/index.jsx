import React from 'react';
import { useColorScheme } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import { getTheme } from '#data/theme';

import { AccountsProvider } from './accounts/AccountsContext';

const GlobalContextProvider = ({ children }) => {
	const colorScheme = useColorScheme();

	return (
		<SafeAreaProvider>
			<ThemeProvider theme={getTheme(colorScheme)}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<AccountsProvider>
						{children}
					</AccountsProvider>
				</GestureHandlerRootView>
			</ThemeProvider>
		</SafeAreaProvider>
	);
};

export { useAccounts } from './accounts/AccountsContext';
export default GlobalContextProvider;
