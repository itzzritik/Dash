/* eslint-disable max-len */
import { useState } from 'react';
import { View } from 'react-native';

import { Svg, Path } from 'react-native-svg';
import styled from 'styled-components/native';

export default function BarcodeOverlay () {
	const [scale, setScale] = useState(0),
		onLayout = (event) => {
			let { width, height } = event.nativeEvent.layout,
				ratio = width / height,
				newWindowSize = Math.min(Math.min(width, height) - 50, 400),
				newScale = Math.round(newWindowSize / WINDOW_SIZE * 100) / 100;

			if (ratio < 0.23492 || Math.max(width, height) >= OVERLAY_SIZE * newScale) return setScale(0);
			setScale(newScale);
		};

	return (
		<BarcodeOverlayLayout onLayout={onLayout}>
			<Window scale={scale}>
				<OverlaySvg viewBox='0 0 4000 4000'>
					<Path fillOpacity='0.65' fill='#000000' fillRule='evenodd' d={OVERLAY_PATH} />
				</OverlaySvg>
			</Window>
		</BarcodeOverlayLayout>
	);
}

const OVERLAY_SIZE = 4000,
	WINDOW_SIZE = 700,

	BarcodeOverlayLayout = styled(View)`
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	`,
	Window = styled(View)`
		position: absolute;
		width: ${() => WINDOW_SIZE}px;
		height: ${() => WINDOW_SIZE}px;
		justify-content: center;
		align-items: center;
		transform: scale(${({ scale }) => scale});
	`,
	OverlaySvg = styled(Svg)`
		min-width: ${() => OVERLAY_SIZE}px;
		min-height: ${() => OVERLAY_SIZE}px;
	`,

	OVERLAY_PATH = 'M4000 0H0v4000h4000V0ZM2300 1650h-600q-1.23 0-2.45.06-1.23.06-2.45.18-1.22.12-2.44.3-1.21.18-2.42.42-1.2.24-2.39.54-1.19.3-2.36.65-1.18.36-2.34.77-1.15.42-2.28.89-1.14.47-2.25.99-1.11.53-2.19 1.1-1.08.58-2.14 1.21-1.05.63-2.07 1.32-1.02.68-2.01 1.41-.98.73-1.93 1.51t-1.86 1.6q-.91.83-1.78 1.69-.86.87-1.69 1.78-.82.91-1.6 1.86-.78.95-1.51 1.93-.73.99-1.41 2.01-.69 1.02-1.32 2.07-.63 1.06-1.21 2.14-.57 1.08-1.1 2.19-.52 1.11-.99 2.24-.47 1.14-.89 2.29-.41 1.16-.77 2.33-.35 1.18-.65 2.37-.3 1.19-.54 2.39-.24 1.21-.42 2.42-.18 1.22-.3 2.44t-.18 2.45q-.06 1.22-.06 2.45v600q0 1.23.06 2.45.06 1.23.18 2.45.12 1.22.3 2.44.18 1.21.42 2.42.24 1.2.54 2.39.3 1.19.65 2.37.36 1.17.77 2.32.42 1.16.89 2.29.47 1.14.99 2.25.53 1.11 1.1 2.19.58 1.08 1.21 2.14.63 1.05 1.32 2.07.68 1.02 1.41 2.01.73.98 1.51 1.93t1.6 1.86q.83.91 1.69 1.78.87.86 1.78 1.69.91.82 1.86 1.6.95.78 1.93 1.51.99.73 2.01 1.41 1.02.69 2.07 1.32 1.06.63 2.14 1.21 1.08.57 2.19 1.1 1.11.52 2.25.99 1.13.47 2.28.89 1.16.41 2.34.77 1.17.35 2.36.65 1.19.3 2.39.54 1.21.24 2.42.42 1.22.18 2.44.3t2.45.18q1.22.06 2.45.06h600q1.23 0 2.45-.06 1.23-.06 2.45-.18 1.22-.12 2.44-.3 1.21-.18 2.42-.42 1.2-.24 2.39-.54 1.19-.3 2.37-.65 1.17-.36 2.32-.77 1.16-.42 2.29-.89 1.14-.47 2.25-.99 1.11-.53 2.19-1.1 1.08-.58 2.14-1.21 1.05-.63 2.07-1.32 1.02-.68 2.01-1.41.98-.73 1.93-1.51t1.86-1.6q.91-.83 1.78-1.69.86-.87 1.69-1.78.82-.91 1.6-1.86.78-.95 1.51-1.93.73-.99 1.41-2.01.69-1.02 1.32-2.07.63-1.06 1.21-2.14.57-1.08 1.1-2.19.52-1.11.99-2.25.47-1.13.89-2.29.41-1.15.77-2.33.35-1.17.65-2.36.3-1.19.54-2.39.24-1.21.42-2.42.18-1.22.3-2.44t.18-2.45q.06-1.22.06-2.45v-600q0-1.23-.06-2.45-.06-1.23-.18-2.45-.12-1.22-.3-2.44-.18-1.21-.42-2.42-.24-1.2-.54-2.39-.3-1.19-.65-2.36-.36-1.18-.77-2.34-.42-1.15-.89-2.29-.47-1.13-.99-2.24-.53-1.11-1.1-2.19-.58-1.08-1.21-2.14-.63-1.05-1.32-2.07-.68-1.02-1.41-2.01-.73-.98-1.51-1.93t-1.6-1.86q-.83-.91-1.69-1.78-.87-.86-1.78-1.69-.91-.82-1.86-1.6-.95-.78-1.93-1.51-.99-.73-2.01-1.41-1.02-.69-2.07-1.32-1.06-.63-2.14-1.21-1.08-.57-2.19-1.1-1.11-.52-2.25-.99-1.13-.47-2.29-.89-1.15-.41-2.33-.77-1.17-.35-2.36-.65-1.19-.3-2.39-.54-1.21-.24-2.42-.42-1.22-.18-2.44-.3t-2.45-.18q-1.22-.06-2.45-.06Z';
