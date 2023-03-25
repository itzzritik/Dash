import { Vibration } from 'react-native';

import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

import { OS } from '#utils/constants';

const HapticStyle = {
	android: {
		light: 10,
		medium: 20,
		heavy: 30,
	},
};

export const hapticFeedback = (strength = ImpactFeedbackStyle.Light) => {
	if (OS.android) return Vibration.vibrate(HapticStyle.android[strength]);

	impactAsync(strength);
};
