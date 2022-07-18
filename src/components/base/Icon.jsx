import React from 'react';

import { OS } from '#utils/constants';

export default function Icon (props) {
	const { children } = props;

	if (OS.web) {
		return (
			<span style={{
				width: children.props.width,
				height: children.props.height,
				backgroundColor: children.props.fill,
				maskImage: `url(${children.type})`,
				WebkitMaskImage: `url(${children.type})`,
				WebkitMaskRepeat: 'no-repeat',
			}}
			/>
		);
	}
	return React.cloneElement(children, { style: { width: children.props.width, height: children.props.height } });
}
