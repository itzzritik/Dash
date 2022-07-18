import { useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import Accounts from '#components/screens/accounts';
import { getTheme } from '#data/theme';

const Stack = createNativeStackNavigator();

export default function App () {
	const colorScheme = useColorScheme();

	return (
		<SafeAreaProvider>
			<ThemeProvider theme={getTheme(colorScheme)}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name='Accounts' component={Accounts} />
					</Stack.Navigator>
				</NavigationContainer>
				<StatusBar style='auto' animated networkActivityIndicatorVisible />
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
