import { FlatList, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { useAccounts } from '#data/context';

import AccountCard from './AccountCard.jsx';

export default function AccountsList () {
	const accounts = useAccounts(),
		insets = useSafeAreaInsets();

	return (
		<AccountsListLayout data={accounts} renderItem={AccountCard}
			keyExtractor={(_item, index) => index.toString()}
			ListHeaderComponent={ListPaddingView} ListHeaderComponentStyle={{ marginBottom: insets.bottom }}
			ListFooterComponent={ListPaddingView} ListFooterComponentStyle={{ marginBottom: insets.top }}
		/>
	);
}

const AccountsListLayout = styled(FlatList)`
		flex: 1;
		background-color: ${({ theme }) => theme.color.backgroundPrimary};
	`,
	ListPaddingView = styled(View)`
		height: ${({ theme }) => theme.size.headerHeight + 10}px;
	`;
