import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';

export default function Icon (props) {
	const theme = useTheme(),
		{ name = 'broken_image', size = 32, color = theme.color.contentPrimary } = props;

	return <MaterialIcon name={name} size={size} color={color} />;
}
