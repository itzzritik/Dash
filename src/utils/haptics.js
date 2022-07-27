import { Platform, Vibration } from 'react-native';

import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

import { OS } from '#utils/constants';

const HAPTIC_STYLES = {
	light: { ios: ImpactFeedbackStyle.Light, android: 15 },
	medium: { ios: ImpactFeedbackStyle.Medium, android: 30 },
	heavy: { ios: ImpactFeedbackStyle.Heavy, android: 45 },
};

export const hapticFeedback = (strength = 'light') => {
	const style = HAPTIC_STYLES[strength][Platform.OS];

	if (OS.ios) impactAsync(style);
	else if (OS.android) Vibration.vibrate(style);
};
