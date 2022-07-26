import { Image, Pressable, Text, View } from 'react-native';

import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';

import { useAccounts } from '#data/context';

import ProgressBar from './ProgressBar';

export default function Header () {
	const theme = useTheme(),
		insets = useSafeAreaInsets(),
		{ remainingTime } = useAccounts(),

		user = { avatar: 'https://lh3.googleusercontent.com/ogw/AOh-ky2XlM-UaX8itCvHPZr6gayzFIK0bxrb3oIO3xuh6qo=s64-c-mo' };

	return (
		<HeaderLayout top={insets.top} intensity={theme.general.blur} tint={theme.name === 'light' ? 'light' : 'dark'}>
			<MainContainer>
				<Timer>{remainingTime ? remainingTime + 's' : ''}</Timer>
				<Title android_ripple={{ borderless: true }}><TitleText>DASH</TitleText></Title>
				<Avatar android_ripple={{ borderless: true }} onPress={() => {}}>
					<AvatarImage source={{ uri: user.avatar }}
						style={{ width: theme.size.headerHeight - 25, height: theme.size.headerHeight - 25 }}
					/>
				</Avatar>
			</MainContainer>
			<ProgressBar progress={(!remainingTime ? 30 : remainingTime) * 100 / 30} />
		</HeaderLayout>
	);
}

const HeaderLayout = styled(BlurView)`
		position: absolute;
		top: 0;
		width: 100%;
		height: ${({ theme, top }) => theme.size.headerHeight + top}px;
		flex-direction: column;
		padding-top: ${({ top }) => top}px;
	`,
	MainContainer = styled(View)`
		flex: 1;
		flex-direction: row;
		padding: 0 5px;
	`,
	Timer = styled(Text)`
		width: ${({ theme }) => theme.size.headerHeight}px;
		height: ${({ theme }) => theme.size.headerHeight}px;
		color: ${({ theme }) => theme.color.contentPrimary};
		line-height: ${({ theme }) => theme.size.headerHeight}px;
		fontFamily: 'Poppins_200ExtraLight'
		font-size: 18px;
		font-weight: 100;
		text-align: center;
		padding-left: 10px;
	`,
	Title = styled(Pressable)`
		flex: 1;
		justify-content: center;
		align-items: center;
	`,
	TitleText = styled(Text)`
		fontFamily: 'Poppins_400Regular'
		font-size: 18px;
		font-weight: bold;
		color: ${({ theme }) => theme.color.contentPrimary};
	`,
	Avatar = styled(Pressable)`
		width: ${({ theme }) => theme.size.headerHeight}px;
		height: ${({ theme }) => theme.size.headerHeight}px;
		justify-content: center;
		align-items: center;
		padding: 0 10px;
		overflow: hidden;
	`,
	AvatarImage = styled(Image)`
		border-radius: 999px;
	`;
