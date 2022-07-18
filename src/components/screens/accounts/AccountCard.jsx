import { Text, View } from 'react-native';

import { SvgUri } from 'react-native-svg';
import styled from 'styled-components/native';

export default function AccountCard ({ item }) {
	console.log('Hello', item);
	return (
		<AccountCardLayout android_ripple={{ borderless: true }}>
			<SvgUri
				width='50'
				height='50'
				uri={item.icon}
			/>
			<Label>{item.label}</Label>
		</AccountCardLayout>
	);
}

const AccountCardLayout = styled(View)`
		height: 100px;
		flex: 1;
		background-color: ${({ theme }) => theme.color.backgroundSecondary};
	`,
	Label = styled(Text)`
		max-width: 85%;
		color: ${({ theme }) => theme.color.contentPrimary};
		padding: 8px 15px;
		border-radius: 10px;
		overflow: hidden;
		font-size: 16px;
	`;
