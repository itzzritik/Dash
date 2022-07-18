import { View } from 'react-native';

import styled from 'styled-components/native';

export default function Accounts () {

	return (
		<AccountsLayout />
	);
}

const AccountsLayout = styled(View)`
		flex: 1;
		background-color: ${({ theme }) => theme.color.backgroundPrimary};
	`;
