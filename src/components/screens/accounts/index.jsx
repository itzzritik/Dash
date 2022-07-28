import { useState } from 'react';
import { View } from 'react-native';

import styled from 'styled-components/native';

import Fab from '#components/base/Fab';

import AccountsList from './AccountsList';
import Header from './Header.jsx';

export default function Accounts ({ navigation }) {
	const [FabPadding, setFabPadding] = useState();

	return (
		<AccountsDashboard>
			<AccountsList FabPadding={FabPadding} />
			<Header />
			<Fab setFabPadding={setFabPadding} onPress={() => navigation.push('Scanner')} />
		</AccountsDashboard>
	);
}

const AccountsDashboard = styled(View)`
		flex: 1;
		background-color: ${({ theme }) => theme.color.backgroundPrimary};
	`;
