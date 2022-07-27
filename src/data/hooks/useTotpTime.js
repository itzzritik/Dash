import { useEffect, useState } from 'react';

export const totpRemainingTime = () => 30 - Math.round(new Date() / 1000) % 30;
export default function useTotpTime () {
	const [totpTime, setTotpTime] = useState();

	useEffect(() => {
		const intervalId = setInterval(() => setTotpTime(totpRemainingTime()), 1000);
		setTotpTime(totpRemainingTime());

		return () => clearInterval(intervalId);
	}, [totpTime]);

	return totpTime;
}
