import { View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';

import IconButton from '#components/base/IconButton';

export default function Header ({ goBack }) {
	const theme = useTheme(),
		insets = useSafeAreaInsets();
	return (
		<HeaderLayout top={insets.top} intensity={theme.general.blur / 2} tint={theme.name === 'light' ? 'light' : 'dark'}>
			<Back iconName='left' onPress={goBack} innerStyle={{ marginRight: 3 }} round blur />
		</HeaderLayout>
	);
}

const HeaderLayout = styled(View)`
		position: absolute;
		top: 0;
		width: 100%;
		height: ${({ theme, top }) => theme.size.headerHeight + top}px;
		flex-direction: column;
		padding: ${({ top }) => top}px 5px 0 5px;
	`,
	Back = styled(IconButton)`
		width: ${({ theme }) => theme.size.headerHeight}px;
		height: ${({ theme }) => theme.size.headerHeight}px;
		transform: scale(0.8);
	`;
