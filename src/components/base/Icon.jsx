import Ionicons from '@expo/vector-icons/Ionicons';
import { kebabCase } from 'lodash';
import { useTheme } from 'styled-components/native';

export default function Icon (props) {
	const theme = useTheme(),
		{ name = '', size = 32, color = theme.color.contentPrimary } = props;

	return <Ionicons name={kebabCase(name)} size={size} color={color} />;
}
