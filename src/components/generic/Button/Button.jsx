import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.scss';

const Button = (props) => {
	let btnClass = `${s.btn}`;
	let type = 'button';
	let icon = '';
	let iconBtnClass = '';
	let btnSpanClass = '';

	if (props.primary) {
		btnClass = `${s.btn} ${s.primaryBtn}`;
		type = 'submit';
	} else if (props.secondary) {
		btnClass = `${s.btn} ${s.secondaryBtn}`;
	}

	if (props.icon) {
		icon = (
			<span className={s.iconContainer}>
				<span className={s.iconSpan}>
					{props.iconImg}
				</span>
			</span>
		);
		iconBtnClass = s.iconBtn;
		btnSpanClass = s.btnSpan;
	}

	return (
		<button
			id={props.id}
			name={props.name}
			className={`${btnClass} ${iconBtnClass} ${props.className}`}
			onClick={props.onClick}
			type={type}
			disabled={props.disabled}
		>
			{icon}
			<span id={`span-${props.id}`} className={btnSpanClass}>{props.children}</span>
		</button>
	);
};

Button.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	className: PropTypes.string,
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	icon: PropTypes.bool,
	iconImg: PropTypes.node,
	onClick: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	disabled: PropTypes.bool,
};

Button.defaultProps = {
	id: '',
	name: '',
	className: '',
	primary: false,
	secondary: false,
	icon: false,
	iconImg: undefined,
	onClick: null,
	children: '',
	disabled: false,
};

export default Button;
