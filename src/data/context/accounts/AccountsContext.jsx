import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { getItemAsync, setItemAsync } from 'expo-secure-store';

const accountDataOnline = {
		id1: {
			label: 'GitHub: Ritik Srivastava',
			secret: 'UYBDYIYNIUDYOIYTRACC',
			issuer: 'GitHub',
			icon: 'https://asset.brandfetch.io/idZAyF9rlg/id6a3YYV60.svg',
		},
		id2: {
			label: 'Google: Ritik Srivastava',
			secret: 'ioIUHNISUFOPpifjosf93',
			issuer: 'Google',
			icon: 'https://asset.brandfetch.io/id6O2oGzv-/idvNIQR3p7.svg',
		},
	},
	hashOnline = '76a8cad0fd9a9247b47a6f6e410dadf8095e3a31';

const AccountsContext = createContext(),
	AccountsProvider = ({ children }) => {

		const [accounts, setAccounts] = useState([]),

			initAccountsData = useCallback(async () => {
				try {
					// fetch hash from server
					const hash = await getItemAsync('hash');

					if (hash && hash === hashOnline) {
						const accountIDs = JSON.parse(await getItemAsync('accountIDs')),
							accountsData = accountIDs.map(async (id) => {
								const account = JSON.parse(await getItemAsync(id));
								if (account) return JSON.parse(account);
								else {
									await setItemAsync('dataHash', 'HashInvalidated');
									return null;
								}
							}).sort();

						if (await getItemAsync('hash') === 'HashInvalidated') initAccountsData();
						setAccounts(accountsData);
					}
					else {
						// fetch account data when hash doesn't match
						const accountIDs = Object.keys(accountDataOnline);
						await setItemAsync('accountIDs', JSON.stringify(accountIDs));
						accountIDs.forEach(async (id) => await setItemAsync(id, JSON.stringify(accountDataOnline[id])));
						await setItemAsync('dataHash', hashOnline);
						setAccounts(Object.values(accountDataOnline).sort());
					}
				}
				catch (err) {
					console.log(err);
				}
			}, []);

		useEffect(() => {
			initAccountsData();
		}, [initAccountsData]);

		return (
			<AccountsContext.Provider value={accounts}>
				{children}
			</AccountsContext.Provider>
		);
	},
	useAccounts = () => useContext(AccountsContext);

export { AccountsProvider, useAccounts };
