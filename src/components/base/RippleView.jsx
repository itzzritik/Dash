import { View } from 'react-native';

import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	measure,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

export default function RippleView ({ children, style, onPress }) {
	const centerX = useSharedValue(0),
		centerY = useSharedValue(0),
		scale = useSharedValue(0),

		rippleRef = useAnimatedRef(),
		width = useSharedValue(0),
		height = useSharedValue(0),
		rippleOpacity = useSharedValue(1),

		tapGestureEvent = useAnimatedGestureHandler({
			onStart: (tapEvent) => {
				const layout = measure(rippleRef);
				width.value = layout.width;
				height.value = layout.height;

				centerX.value = tapEvent.x;
				centerY.value = tapEvent.y;

				rippleOpacity.value = 1;
				scale.value = 0;
				scale.value = withTiming(1, { duration: 1000 });
			},
			onActive: () => {
				if (onPress) runOnJS(onPress)();
			},
			onFinish: () => {
				rippleOpacity.value = withTiming(0);
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
				backgroundColor: 'rgba(0,0,0,0.2)',
				transform: [{ translateX }, { translateY }, { scale: scale.value }],
			};
		});

	return (
		<View ref={rippleRef} style={style}>
			<TapGestureHandler onGestureEvent={tapGestureEvent}>
				<Animated.View style={[{ flex: 1, overflow: 'hidden' }]}>
					{children}
					<Animated.View style={rippleStyle} />
				</Animated.View>
			</TapGestureHandler>
		</View>
	);
}
