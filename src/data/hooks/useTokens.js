import { useEffect, useState } from 'react';

import { totpToken, totpOptions, KeyEncodings } from '@otplib/core';
import { keyDecoder } from '@otplib/plugin-base32-enc-dec';
import { createDigest } from '@otplib/plugin-crypto-js';

export default function useTokens (accounts) {
	const [tokens, setTokens] = useState({});

	useEffect(() => {
		const generateTokens = () => {
				accounts.forEach((account) => {
					const newToken = totpToken(
						keyDecoder(account.secret, KeyEncodings.HEX),
						totpOptions({ createDigest, encoding: KeyEncodings.HEX }),
					);
					if (tokens[account.id] === newToken) return;
					setTokens((prevTokens) => ({ ...prevTokens, [account.id]: newToken }));
				});
			},
			intervalId = setInterval(() => generateTokens(), 1000);

		generateTokens();
		return () => clearInterval(intervalId);
	}, [accounts, tokens]);

	return tokens;
}
