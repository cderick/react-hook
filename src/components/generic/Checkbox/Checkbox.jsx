import React from 'react';
import PropTypes from 'prop-types';
import s from './Checkbox.scss';

/**
 * Controlled wrapper component for HTML element input with type checkbox
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.label
 * @param {function} [props.onClick = null]
 */

class Checkbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animation: false,
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (this.props.onClick) {
			this.props.onClick(this.props.checked);
		}

		if (!this.props.checked) {
			this.setState({ animation: true });
			setTimeout(() => {
				this.setState({ animation: false });
			}, 650);
		}
	}

	render() {
		let animation = s.animOff;
		let className = s.label;

		if (this.props.checked) {
			className = `${s.label} ${s.active}`;
		} else {
			className = s.label;
		}

		if (this.state.animation) {
			animation = s.animOn;
		} else {
			animation = s.animOff;
		}

		return (
			<label id={this.props.labelId} htmlFor={this.props.id} className={`${className} ${this.props.labelClass}`}>
				<span className={s.checkWrapper}>
					<input
						id={this.props.id}
						name={this.props.name}
						className={`${s.checkbox} ${this.props.className} ${s.optionInput}`}
						type="checkbox"
						onClick={this.handleClick}
						onChange={this.props.onChange}
						checked={this.props.checked}
					/>
					<span className={`${s.animation} ${animation}`} />
				</span>
				{this.props.label}
			</label>
		);
	}
}

Checkbox.propTypes = {
	id: PropTypes.string,
	labelId: PropTypes.string,
	name: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	labelClass: PropTypes.string,
	onClick: PropTypes.func,
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
	id: '',
	labelId: '',
	labelClass: '',
	label: undefined,
	name: '',
	className: '',
	onClick: null,
	checked: false,
};

export default Checkbox;
