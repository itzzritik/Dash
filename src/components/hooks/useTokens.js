import { useEffect, useState } from 'react';

import { totpToken, totpOptions, KeyEncodings } from '@otplib/core';
import { keyDecoder } from '@otplib/plugin-base32-enc-dec';
import { createDigest } from '@otplib/plugin-crypto-js';
import { isEmpty } from 'lodash';

import { totpTime } from '#utils/system/totpTime';

export default function useTokens (accounts) {
	const [tokens, setTokens] = useState([]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const time = totpTime();

			if (time > 28 || time < 2 || isEmpty(tokens)) {
				const tokenList = accounts.reduce((acc, account) => {
					const token = totpToken(
						keyDecoder(account.secret, KeyEncodings.HEX),
						totpOptions({ createDigest, encoding: KeyEncodings.HEX }),
					);
					acc[account.id] = token;
					return acc;
				}, {});
				setTokens((oldTokens) => ({ ...oldTokens, ...tokenList }));
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [accounts, tokens]);

	return tokens;
}
