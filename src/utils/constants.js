import { Platform } from 'react-native';

export const OS = {
	ios: Platform.OS === 'ios',
	android: Platform.OS === 'android',
	web: Platform.OS === 'web',
};
