import { totpToken, totpOptions, KeyEncodings } from '@otplib/core';
import { keyDecoder } from '@otplib/plugin-base32-enc-dec';
import { createDigest } from '@otplib/plugin-crypto-js';

export const totpGenerator = (secret) => {
	return totpToken(
		keyDecoder(secret, KeyEncodings.HEX),
		totpOptions({ createDigest, encoding: KeyEncodings.HEX }),
	);
};
