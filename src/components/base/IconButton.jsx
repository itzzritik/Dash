import { Text } from 'react-native';

import styled from 'styled-components/native';

import { padding } from '#utils/style';

import Icon from './Icon';
import RippleView from './RippleView';

export default function IconButton (props) {
	const {
			color = '#ffffff',
			iconName,
			iconSize = 26,
			backgroundColor = 'transparent',
			tint,
			text,
			round,
			style,
			blur,
			onPress,
		} = props,

		DEFAULT_STYLE = {
			backgroundColor,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			overflow: 'hidden',
			borderRadius: round ? 999 : 5,
			...padding(0, text ? 25 : 0),
		};

	return (
		<RippleView round={round} onPress={onPress} blur={blur === true ? 20 : blur} tint={tint}
			backgroundColor={backgroundColor} style={[DEFAULT_STYLE, style]}
		>
			<Icon name={iconName} color={color} size={iconSize} />
			{text && <ButtonText color={color}>{text}</ButtonText>}
		</RippleView>
	);
}

const ButtonText = styled(Text)`
	font-family: 'Poppins_400Regular'
	color: ${({ color }) => color};
	font-size: 18px;
	margin-left: 10px;
`;
