import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import styled from 'styled-components/native';

export default function Scanner ({ navigation }) {
	const [hasPermission, setHasPermission] = useState(),
		{ qr } = BarCodeScanner.Constants.BarCodeType,

		handleBarCodeScanned = ({ type, data }) => {
			if (type === qr) {
				console.log(data);
				navigation.goBack();
			}
		};

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	return (
		<ScannerLayout>
			{hasPermission && <ViewFinder onBarCodeScanned={handleBarCodeScanned} />}
		</ScannerLayout>
	);
}

const ScannerLayout = styled(View)`
		flex: 1;
	`,
	ViewFinder = styled(Camera)`
		flex: 1;
	`;
