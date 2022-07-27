import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { getItemAsync, setItemAsync } from 'expo-secure-store';

import useTokens from '#components/hooks/useTokens';
import { OS } from '#utils/constants';

const accountDataOnline = [
		{
			id: 'id1',
			label: 'GitHub: Ritik Srivastava',
			secret: '64DABSHJHEF5YPCM',
			issuer: 'GitHub',
			color: '#28a745',
			icon: 'https://asset.brandfetch.io/idZAyF9rlg/idd6TtF-kc.png',
		},
		{
			id: 'id2',
			label: 'Google: Ritik Srivastava',
			secret: 'DZ7RQ5P2JTPK7XVR',
			issuer: 'Google',
			color: '#4285F4',
			icon: 'https://asset.brandfetch.io/id6O2oGzv-/idNEgS9h8q.jpeg',
		},
		{
			id: 'id3',
			label: 'Microsoft: Ritik Srivastava',
			secret: 'IUDQHEARNCV6BZBE',
			issuer: 'Microsoft',
			color: '#00a1f1',
			icon: 'https://asset.brandfetch.io/idchmboHEZ/idtz-2CKRH.jpeg',
		},
		{
			id: 'id4',
			label: 'Zomato: Ritik Srivastava',
			secret: 'XFMFDUUQHJJFZXGA',
			issuer: 'Zomato',
			color: '#d94148',
			icon: 'https://asset.brandfetch.io/idEql8nEWn/idNLMWCnFH.png',
		},
		{
			id: 'id5',
			label: 'Heroku: Ritik Srivastava',
			secret: 'G6BUJETIOQPLXM6D',
			issuer: 'Heroku',
			color: '#4a4090',
			icon: 'https://asset.brandfetch.io/idznrs7lk6/iddLvd3sUp.png',
		},
	],
	hashOnline = '76a8cad0fd9a9247b47a6f6e410dadf8095e3a31o1';

const AccountsContext = createContext(),
	AccountsProvider = ({ children }) => {
		const [accounts, setAccounts] = useState([]),
			tokens = useTokens(accounts),

			initAccountsData = useCallback(async () => {
				try {
					if (OS.web) {
						setAccounts(accountDataOnline.sort());
						return;
					}

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
						const accountIDs = accountDataOnline.map(({ id }) => id);
						await setItemAsync('accountIDs', JSON.stringify(accountIDs));
						accountDataOnline.forEach(async (account) => await setItemAsync(account.id, JSON.stringify(account)));
						await setItemAsync('dataHash', hashOnline);
						setAccounts(accountDataOnline.sort());
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
			<AccountsContext.Provider value={{ accounts, tokens }}>
				{children}
			</AccountsContext.Provider>
		);
	},
	useAccounts = () => useContext(AccountsContext);

export { AccountsProvider, useAccounts };
