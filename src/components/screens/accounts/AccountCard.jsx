import { Image, Pressable, Text, View } from 'react-native';

import { setStringAsync } from 'expo-clipboard';
import styled from 'styled-components/native';

export default function AccountCard ({ item: { icon, issuer, label, token = '' } }) {
	const copyToClipboard = async () => {
		await setStringAsync(token);
	};

	return (
		<AccountCardLayout android_ripple={{ borderless: true }} onPress={copyToClipboard}>
			<Header>
				<IssuerLogo source={{ uri: icon }}
					style={{ width: 40, height: 40 }}
				/>
				<HeaderTitle>
					<Issuer>{issuer}</Issuer>
					<Label>{label}</Label>
				</HeaderTitle>
			</Header>
			<TOtp>
				{token.split('').map((otpChar, i) =>
					<TOtpChar key={i}>{otpChar}</TOtpChar>,
				)}
			</TOtp>
		</AccountCardLayout>
	);
}

const AccountCardLayout = styled(Pressable)`
		with: 100%;
		height: 130px;
		margin: 8px 16px 8px 16px;
		padding: 8px 16px;
		background-color: ${({ theme }) => theme.color.backgroundSecondary};
		border-radius: 25px;
		overflow: hidden;
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
