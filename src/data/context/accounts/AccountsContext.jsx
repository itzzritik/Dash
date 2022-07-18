import { createContext, useContext } from 'react';

const AccountsContext = createContext(),
	AccountsProvider = ({ children }) => {

		return (
			<AccountsContext.Provider value={2}>
				{children}
			</AccountsContext.Provider>
		);
	},
	useAccounts = () => useContext(AccountsContext);

export { AccountsProvider, useAccounts };
