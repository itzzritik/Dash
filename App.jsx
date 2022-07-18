import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import Accounts from '#components/screens/accounts';
import GlobalContextProvider from '#data/context';

const { Navigator, Screen } = createNativeStackNavigator();

export default function App () {
	return (
		<GlobalContextProvider>
			<NavigationContainer>
				<Navigator initialRouteName='Accounts' screenOptions={{ headerShown: false }}>
					<Screen name='Accounts' component={Accounts} />
				</Navigator>
			</NavigationContainer>
			<StatusBar style='auto' animated networkActivityIndicatorVisible />
		</GlobalContextProvider>
	);
}
