import { FlatList, View } from 'react-native';

import { isEmpty } from 'lodash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { useAccounts } from '#data/context';

import AccountCard from './AccountCard.jsx';

export default function AccountsList ({ FabPadding }) {
	let { accounts, tokens } = useAccounts(),
		insets = useSafeAreaInsets();

	accounts = accounts.map((account) => ({ ...account, token: tokens[account.id] }));

	if (isEmpty(tokens)) return null;

	return (
		<AccountsListLayout data={accounts} renderItem={AccountCard}
			keyExtractor={(_item, index) => index.toString()}
			ListHeaderComponent={ListPaddingTopHeader} ListHeaderComponentStyle={{ marginBottom: insets.top }}
			ListFooterComponent={ListPaddingTopFooter} ListFooterComponentStyle={{ marginBottom: FabPadding }}
		/>
	);
}

const AccountsListLayout = styled(FlatList)`
		flex: 1;
		background-color: ${({ theme }) => theme.color.backgroundPrimary};
	`,
	ListPaddingTopHeader = styled(View)`
		height: ${({ theme }) => theme.size.headerHeight + 5}px;
	`,
	ListPaddingTopFooter = styled(View)``;
