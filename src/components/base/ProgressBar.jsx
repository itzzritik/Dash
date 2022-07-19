import { useEffect } from 'react';
import { View } from 'react-native';

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import styled, { useTheme } from 'styled-components/native';

export default function ProgressBar ({ progress = 0 }) {
	const theme = useTheme(),
		progressWidth = useSharedValue(0),
		progressStyle = useAnimatedStyle(() => {
			let backgroundColor = theme.color.brandPrimary;
			if (progress < 14) backgroundColor = theme.color.accentDanger;
			else if (progress < 28) backgroundColor = theme.color.accentWarning;
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

const timingOption = { duration: 1000, ease: 'linear' },
	ProgressBarLayout = styled(View)`
		width: 100%;
		height: 3px;
		align-items: center;
	`;
