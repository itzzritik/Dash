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
		progressStyle = useAnimatedStyle(() => ({ width: progressWidth.value + '%' }));

	useEffect(() => {
		progressWidth.value = withTiming(progress, {
			duration: 500,
			ease: 'easeOut',
		});
	}, [progress, progressWidth]);

	return (
		<ProgressBarLayout>
			<Animated.View style={[progressStyle, {
				height: '100%',
				backgroundColor: theme.color.brandPrimary,
			}]}
			/>
		</ProgressBarLayout>
	);
}

const ProgressBarLayout = styled(View)`
		width: 100%;
		height: 3px;
	`;
