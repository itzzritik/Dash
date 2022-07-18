import { View } from 'react-native';

import styled from 'styled-components/native';

import ChatList from './ChatList';
import Header from './Header';
import MessageBox from './MessageBox';

export default function TOTP () {

	return (
		<TOTPDash>
			<ChatList keyboardAvoiderStyle={keyboardAvoiderScrollableStyle} consultant={consultant} />
			<MessageBox keyboardAvoiderStyle={keyboardAvoiderViewStyle} />
			<Header user={consultant} shuffleConsultant={shuffleConsultant} />
		</TOTPDash>
	);
}

const TOTPDash = styled(View)`
		flex: 1;
		background-color: ${({ theme }) => theme.color.backgroundPrimary};
	`;
