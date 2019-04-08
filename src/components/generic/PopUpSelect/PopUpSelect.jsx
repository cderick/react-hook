import React from 'react';
import PropTypes from 'prop-types';
import PopUp from '../PopUp/PopUp';
import Button from '../Button/Button';
import s from './PopUpSelect.scss';

const PopUpSelect = props => (
	<div className={s.select}>
		<PopUp onClose={props.cancel} className={props.className}>
			{props.title ? <h3>{props.title}</h3> : null}
			{props.children}
			<div className={s.buttons}>
				<Button className={s.cancel} onClick={props.cancel} secondary>Cancel</Button>
				<Button className={s.accept} onClick={props.accept} primary>Accept</Button>
			</div>
		</PopUp>
	</div>
);

PopUpSelect.propTypes = {
	cancel: PropTypes.func.isRequired,
	accept: PropTypes.func.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
};

PopUpSelect.defaultProps = {
	title: '',
	className: '',
};

export default PopUpSelect;
