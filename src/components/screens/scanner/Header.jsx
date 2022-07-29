import { View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import IconButton from '#components/base/IconButton';

export default function Header ({ goBack, flashOn, toggleFlash }) {
	const insets = useSafeAreaInsets();
	return (
		<HeaderLayout top={insets.top}>
			<Back iconName='chevron-back' onPress={goBack} tint='light' round blur />
			<Flash iconName={flashOn ? 'flash' : 'flash-outline'} onPress={toggleFlash} round
				tint='light' blur={flashOn ? 80 : 20}
			/>
		</HeaderLayout>
	);
}

const HeaderLayout = styled(View)`
		position: absolute;
		top: 0;
		width: 100%;
		height: ${({ theme, top }) => theme.size.headerHeight + top}px;
		flex-direction: row;
		justify-content: space-between;
		padding: ${({ top }) => top}px 5px 0 5px;
		margin-top: 5px;
	`,
	Back = styled(IconButton)`
		width: ${({ theme }) => theme.size.headerHeight}px;
		height: ${({ theme }) => theme.size.headerHeight}px;
		padding-right: 3px;
		transform: scale(0.8);
	`,
	Flash = styled(IconButton)`
		width: ${({ theme }) => theme.size.headerHeight}px;
		transform: scale(0.8);
	`;
