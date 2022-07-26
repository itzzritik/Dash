import { Image, Text, View } from 'react-native';

import { setStringAsync } from 'expo-clipboard';
import { selectionAsync } from 'expo-haptics';
import styled from 'styled-components/native';

import RippleView from '#components/base/RippleView';
import { OS } from '#utils/constants';

export default function AccountCard ({ item: { icon, issuer, color, label, token = '' } }) {
	const onPressIn = () => {
			if (!OS.web) selectionAsync();
		},
		copyToClipboard = async () => {
			await setStringAsync(token);
		};

	return (
		<AccountCardLayout rippleColor={color} onPressIn={onPressIn} onPress={copyToClipboard}>
			<Container>
				<Header>
					<IssuerLogo source={{ uri: icon }} style={{ width: 40, height: 40 }} />
					<HeaderTitle>
						<Issuer>{issuer}</Issuer>
						<Label>{label}</Label>
					</HeaderTitle>
				</Header>
				<TOtp>{token.split('').map((otpChar, i) => <TOtpChar key={i}>{otpChar}</TOtpChar>)}</TOtp>
			</Container>
		</AccountCardLayout>
	);
}

const AccountCardLayout = styled(RippleView)`
		with: 100%;
		height: 130px;
		margin: 8px 16px;
		background-color: ${({ theme }) => theme.color.backgroundSecondary};
		border-radius: 25px;
		overflow: hidden;
	`,
	Container = styled(View)`
		flex: 1;
		padding: 8px 16px;
	`,
	Header = styled(View)`
		flex: 1;
		flex-direction: row;
		align-items: center;
	`,
	IssuerLogo = styled(Image)`
		border-radius: 999px;
		overflow: hidden;
	`,
	HeaderTitle = styled(View)`
		flex-direction: column;
		justify-content: center;
		padding-left: 15px;
	`,
	Issuer = styled(Text)`
		color: ${({ theme }) => theme.color.contentPrimary};
		fontFamily: 'Poppins_400Regular'
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 0px;
	`,
	Label = styled(Text)`
		color: ${({ theme }) => theme.color.contentSecondary};
		fontFamily: 'Poppins_300Light'
		font-size: 12px;
	`,
	TOtp = styled(View)`
		width: 100%;
		max-width: 350px;
		flex: 1;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		pointer-events: none;
	`,
	TOtpChar = styled(Text)`
		width: 45px;
		height: 45px;
		line-height: 45px;
		background-color: ${({ theme }) => theme.color.backgroundPrimary};
		color: ${({ theme }) => theme.color.contentPrimary};
		font-size: 24px;
		font-weight: 400;
		border-radius: 10px;
		overflow: hidden;
		align-items: center;
		text-align: center;
		text-transform: uppercase;
	`;
