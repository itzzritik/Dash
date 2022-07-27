import { useMemo } from 'react';
import { View } from 'react-native';

import Color from 'color';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import { hapticFeedback } from '#utils/haptics';

export default function RippleView (props) {
	const { duration = 500, haptics = true, rippleColor = 'black',
			children, style, innerStyle, onPressIn, onPress } = props,

		centerX = useSharedValue(0),
		centerY = useSharedValue(0),
		scale = useSharedValue(0),

		width = useSharedValue(0),
		height = useSharedValue(0),
		rippleOpacity = useSharedValue(1),

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
		<View style={style} onLayout={onLayout}>
			<TapGestureHandler onGestureEvent={tapGestureEvent}>
				<Animated.View style={[innerStyle, { flex: 1, overflow: 'hidden' }]}>
					{children}
					<Animated.View style={rippleStyle} />
				</Animated.View>
			</TapGestureHandler>
		</View>
	);
}
