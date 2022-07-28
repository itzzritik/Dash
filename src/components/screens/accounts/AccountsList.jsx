import { useState } from 'react';
import { FlatList, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';

import { useAccounts } from '#data/context';

import AccountCard from './AccountCard.jsx';

export default function AccountsList ({ FabPadding }) {
	let [refreshing, setRefreshing] = useState(false),

		{ accounts, tokens } = useAccounts(),
		theme = useTheme(),
		insets = useSafeAreaInsets(),

		offsetTop = theme.size.headerHeight + insets.top + 6,

		onRefresh = () => {
			setRefreshing(true);
			setTimeout(() => setRefreshing(false), 1000);
		};

	accounts = accounts.map((account) => ({ ...account, token: tokens[account.id] }));

	return (
		<AccountsListLayout data={accounts} renderItem={AccountCard}
			keyExtractor={(_item, index) => index.toString()}
			progressViewOffset={offsetTop} refreshing={refreshing} onRefresh={onRefresh}
			ListHeaderComponent={<View />} ListHeaderComponentStyle={{ marginTop: offsetTop }}
			ListFooterComponent={<View />} ListFooterComponentStyle={{ marginBottom: FabPadding }}
		/>
	);
}

const AccountsListLayout = styled(FlatList)`
		flex: 1;
		background-color: ${({ theme }) => theme.color.backgroundPrimary};
	`;
