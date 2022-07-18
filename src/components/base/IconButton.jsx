import { View } from 'react-native';

import styled from 'styled-components/native';

export default function IconButton () {

	return (
		<IconButtonLayout />
	);
}

const IconButtonLayout = styled(View)`
		flex: 1;
		background-color: ${({ theme }) => theme.color.backgroundPrimary};
	`;
