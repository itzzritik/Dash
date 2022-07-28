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
			onPress,
		} = props,

		DEFAULT_STYLE = {
			backgroundColor,
			borderRadius: round ? '999px' : '5px',
			justifyContent: 'center',
			alignItems: 'center',
			overflow: 'hidden',
		};

	return (
		<RippleView round={round} onPress={onPress} backgroundColor={backgroundColor}
			innerStyle={INNER_STYLE} style={[DEFAULT_STYLE, style]}
		>
			<Icon name={iconName} color={iconColor} size={iconSize} />
		</RippleView>
	);
}

const INNER_STYLE = {
	justifyContent: 'center',
	alignItems: 'center',
};
