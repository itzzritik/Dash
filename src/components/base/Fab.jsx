import { useEffect } from 'react';

import { clamp } from 'lodash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';

import Icon from './Icon';
import RippleView from './RippleView';

export default function Fab (props) {
	const theme = useTheme(),
		{
			iconName = 'add',
			size = 'default',
			backgroundColor = theme.color.brandPrimary,
			foregroundColor = '#ffffff',
			setFabPadding,
		} = props,
		{ bottom } = useSafeAreaInsets(),
		bottomPadding = clamp(bottom, 20, 35),

		[fabSize, iconSize] = FAB_SIZES[size] ?? FAB_SIZES.default;

	useEffect(() => {
		setFabPadding(bottomPadding * 1.5 + fabSize);
	}, [bottom, bottomPadding, fabSize, setFabPadding]);

	return (
		<FabLayout backgroundColor={backgroundColor} size={fabSize} bottomPadding={bottomPadding} innerStyle={INNER_STYLE}>
			<Icon name={iconName} size={iconSize} color={foregroundColor} />
		</FabLayout>
	);
}

const FAB_SIZES = { default: [56, 28], mini: [50, 25] },
	INNER_STYLE = {
		justifyContent: 'center',
		alignItems: 'center',
	},
	FabLayout = styled(RippleView)`
		position: absolute;
		width: ${({ size }) => size}px;
		height: ${({ size }) => size}px;
		bottom: ${({ bottomPadding }) => clamp(bottomPadding, 20, 35)}px;
		right: ${({ bottomPadding }) => clamp(bottomPadding, 20, 25)}px;
		background-color: ${({ backgroundColor }) => backgroundColor};
		border-radius: 999px;
		overflow: hidden;
	`;
