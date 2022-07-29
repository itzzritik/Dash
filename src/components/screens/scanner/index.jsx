import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

import BarcodeOverlay from './BarcodeOverlay.jsx';
import Header from './Header';

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
			<BarcodeOverlay />
			<Header goBack={navigation.goBack} />
			<StatusBar style='light' animated />
		</ScannerLayout>
	);
}

const ScannerLayout = styled(View)`
		flex: 1;
		background-color: black;
	`,
	ViewFinder = styled(Camera)`
		flex: 1;
	`;
