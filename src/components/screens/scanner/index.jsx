import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { clamp } from 'lodash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import IconButton from '#components/base/IconButton.jsx';

import BarcodeOverlay from './BarcodeOverlay.jsx';
import Header from './Header';

export default function Scanner ({ navigation }) {
	const [hasPermission, setHasPermission] = useState(),
		[flashOn, setFlashOn] = useState(false),
		{ qr } = BarCodeScanner.Constants.BarCodeType,

		{ bottom } = useSafeAreaInsets(),
		editStyle = {
			bottom: clamp(bottom + 20, 40, 55),
		},

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
			{
				hasPermission &&
				<>
					<ViewFinder onBarCodeScanned={handleBarCodeScanned}
						flashMode={flashOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
					/>
					<BarcodeOverlay />
					<Header goBack={navigation.goBack} flashOn={flashOn} toggleFlash={() => setFlashOn((val) => !val)} />
					<EnterManually iconName='pencil-sharp' text='Enter Manually' tint='light' style={editStyle} round blur />
				</>

			}
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
	`,
	EnterManually = styled(IconButton)`
		position: absolute;
		height: ${({ theme }) => theme.size.headerHeight}px;
		align-self: center;
		justify-self: flex-end;
		transform: scale(0.8);
	`;
