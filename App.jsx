import { Buffer } from 'buffer';

import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_200ExtraLight, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import Accounts from '#components/screens/accounts';
import Scanner from '#components/screens/scanner';
import GlobalContextProvider from '#data/context';

// eslint-disable-next-line no-undef
global.Buffer = Buffer;

const { Navigator, Screen } = createNativeStackNavigator();

export default function App () {
	let [fontsLoaded] = useFonts({
		Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GlobalContextProvider>
			<NavigationContainer>
				<Navigator initialRouteName='Accounts' screenOptions={{ headerShown: false }}>
					<Screen name='Accounts' component={Accounts} />
					<Screen name='Scanner' component={Scanner} />
				</Navigator>
			</NavigationContainer>
			<StatusBar style='auto' animated networkActivityIndicatorVisible />
		</GlobalContextProvider>
	);
}
