import AntDesignIcons from '@expo/vector-icons/AntDesign';
import { useTheme } from 'styled-components/native';

export default function Icon (props) {
	const theme = useTheme(),
		{ name = 'closesquareo', size = 32, color = theme.color.contentPrimary } = props;

	return <AntDesignIcons name={name.replaceAll('_', '-')} size={size} color={color} />;
}
