import Icon from './Icon';
import RippleView from './RippleView';

export default function IconButton (props) {
	const {
			iconColor = '#ffffff',
			iconName,
			iconSize = 26,
			backgroundColor = 'transparent',
			round,
			style,
			blur,
			onPress,
		} = props,

		DEFAULT_STYLE = {
			backgroundColor,
			borderRadius: round ? 999 : 5,
			justifyContent: 'center',
			alignItems: 'center',
			overflow: 'hidden',
		};

	return (
		<RippleView round={round} onPress={onPress} backgroundColor={backgroundColor} blur={blur ? 20 : undefined}
			style={[DEFAULT_STYLE, style]}
		>
			<Icon name={iconName} color={iconColor} size={iconSize} />
		</RippleView>
	);
}
