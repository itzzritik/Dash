import AntDesignIcons from '@expo/vector-icons/AntDesign';
import { kebabCase } from 'lodash';
import { useTheme } from 'styled-components/native';

export default function Icon (props) {
	const theme = useTheme(),
		{ name = 'closesquareo', size = 32, color = theme.color.contentPrimary } = props;

	return <AntDesignIcons name={kebabCase(name)} size={size} color={color} />;
}
