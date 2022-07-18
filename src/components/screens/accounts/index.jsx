import { View } from 'react-native';

import styled from 'styled-components/native';

import Header from '#components/base/Header';

import AccountsList from './AccountsList';

export default function Accounts () {

	return (
		<AccountsDashboard>
			<AccountsList />
			<Header />
		</AccountsDashboard>
	);
}

const AccountsDashboard = styled(View)`
		flex: 1;
		background-color: ${({ theme }) => theme.color.backgroundPrimary};
	`;
