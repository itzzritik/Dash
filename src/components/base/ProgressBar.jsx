import { useEffect } from 'react';
import { View } from 'react-native';

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import styled, { useTheme } from 'styled-components/native';

export default function ProgressBar ({ progress = defaultProgress }) {
	const theme = useTheme(),
		progressWidth = useSharedValue(defaultProgress),
		progressStyle = useAnimatedStyle(() => {
			let backgroundColor = theme.color.brandPrimary;
			if (progress < 17) backgroundColor = theme.color.accentDanger;
			else if (progress < 34) backgroundColor = theme.color.accentWarning;
			return { width: progressWidth.value + '%', backgroundColor };
		});

	useEffect(() => {
		progressWidth.value = withTiming(progress, timingOption);
	}, [progress, progressWidth]);

	return (
		<ProgressBarLayout>
			<Animated.View style={[progressStyle, {
				height: '100%',
				borderRadius: 999,
			}]}
			/>
		</ProgressBarLayout>
	);
}

const defaultProgress = 100,
	timingOption = { duration: 300, ease: 'easeInOut' },
	ProgressBarLayout = styled(View)`
		width: 100%;
		height: 3px;
		align-items: center;
	`;
