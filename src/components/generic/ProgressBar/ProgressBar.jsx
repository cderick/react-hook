import React from 'react';
import PropTypes from 'prop-types';
import s from './ProgressBar.scss';

const ProgressBar = props => (
	<div className={`progress ${s.bar}`}>
		<div
			className={`progress-bar progress-bar-striped progress-bar-animated w-${props.currentValue} ${props.error ? 'bg-danger' : ''}`}
			role={props.role}
			aria-valuemin={props.minValue}
			aria-valuemax={props.maxValue}
			aria-valuenow={props.currentValue}
			error={props.error ? 'true' : 'false'}
		/>
	</div>
);

ProgressBar.propTypes = {
	role: PropTypes.string,
	minValue: PropTypes.number,
	maxValue: PropTypes.number,
	currentValue: PropTypes.number,
	error: PropTypes.bool,
};

ProgressBar.defaultProps = {
	role: 'progressbar',
	minValue: 0,
	maxValue: 100,
	currentValue: 0,
	error: false,
};

export default ProgressBar;
