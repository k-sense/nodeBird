import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import wrapper from '../../store/configureStore';

const NodeBird = ({ Component }) => {
	return (
		<>
			<Component />;
		</>
	);
};

NodeBird.propTypes = {
	Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
