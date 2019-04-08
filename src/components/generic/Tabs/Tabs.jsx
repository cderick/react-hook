import React from 'react';
import PropTypes from 'prop-types';
import s from './Tabs.scss';

class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: this.props.active,
		};
		this.handleCLick = this.handleClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.active && nextProps.active !== this.state.active) {
			this.setState({ active: nextProps.active });
		}
	}

	handleClick(e, i) {
		this.setState({ active: i });
		e.preventDefault();
		this.props.handleClick(e);
	}

	render() {
		return (
			<div>
				<ul className={s.tabs}>
					{this.props.children.map((tab, i) => (
						<li
							key={tab.props.id}
							className={
								this.state.active === i
									? `${s.tab} ${this.props.className} ${s.active}`
									: `${s.tab} ${this.props.className}`
							}
						>
							<a
								href="/"
								onClick={e => this.handleClick(e, i)}
							>
								{tab.props.title}
								{this.state.active === i
									? <div className={s.activeBorder} /> : null}
							</a>
						</li>
					))}
				</ul>
				<div className={`${s.tabContent} ${this.props.tabContentClass}`}>
					{this.props.children[this.state.active]}
				</div>
			</div>
		);
	}
}

Tabs.propTypes = {
	children: PropTypes.node.isRequired,
	active: PropTypes.number,
	className: PropTypes.string,
	tabContentClass: PropTypes.string,
	handleClick: PropTypes.func,
};

Tabs.defaultProps = {
	active: 0,
	className: '',
	tabContentClass: '',
	handleClick: null,
};

export default Tabs;
