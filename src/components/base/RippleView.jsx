import { useMemo } from 'react';
import { View } from 'react-native';

import Color from 'color';
import { BlurView } from 'expo-blur';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

import { hapticFeedback } from '#utils/system/haptics';

export default function RippleView (props) {
	const { duration = 500, haptics = true, rippleColor = 'black', tint,
			children, style, blur, onPressIn, onPress } = props,

		centerX = useSharedValue(0),
		centerY = useSharedValue(0),
		scale = useSharedValue(0),

		width = useSharedValue(0),
		height = useSharedValue(0),
		rippleOpacity = useSharedValue(1),

		RootView = blur ? BlurView : View,
		rippleColorRGB = useMemo(() => Color(rippleColor).array().reduce((acc, i) => acc += (i + ','), ''), [rippleColor]),

		onLayout = (event) => {
			width.value = event.nativeEvent.layout.width;
			width.height = event.nativeEvent.layout.height;
		},

		tapGestureEvent = useAnimatedGestureHandler({
			onStart: (tapEvent) => {
				if (haptics) runOnJS(hapticFeedback)();

				centerX.value = tapEvent.x;
				centerY.value = tapEvent.y;

				rippleOpacity.value = 1;
				scale.value = 0;
				scale.value = withTiming(1, { duration, easing: Easing.inOut(Easing.ease) });

				if (onPressIn) runOnJS(onPressIn)();
			},
			onActive: () => {
				if (onPress) runOnJS(onPress)();
			},
			onFinish: () => {
				rippleOpacity.value = withTiming(0, { duration: duration * 1.8, easing: Easing.inOut(Easing.ease) });
			},
		}),

		rippleStyle = useAnimatedStyle(() => {
			const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2),
				translateX = centerX.value - circleRadius,
				translateY = centerY.value - circleRadius;

			return {
				position: 'absolute',
				top: 0,
				left: 0,
				width: circleRadius * 2,
				height: circleRadius * 2,
				borderRadius: circleRadius,
				opacity: rippleOpacity.value,
				backgroundColor: `rgba(${rippleColorRGB} 0.2)`,
				transform: [{ translateX }, { translateY }, { scale: scale.value }],
			};
		});

	return (
		<RootView intensity={blur} style={style} onLayout={onLayout} tint={tint === 'light' ? 'light' : 'dark'}>
			{children}
			<TapGestureHandler onGestureEvent={tapGestureEvent}>
				<Ripple><Animated.View style={rippleStyle} /></Ripple>
			</TapGestureHandler>
		</RootView>
	);
}

const Ripple = styled(Animated.View)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;
