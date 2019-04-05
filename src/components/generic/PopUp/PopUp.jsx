import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import s from './PopUp.scss';

/**
 * PopUp component will unify pop up information, it is expected that this PopUp is extended
 * through composition. It will present a div that will cover the center of the view port
 * while the rest of the content remains in the background greyed out.
 *
 * If an onClose action is passed, this action will be called when a close icon is pressed
 * or when the user clicks outside of the div presenting the information.
 *
 * If an onClose action is not passed, it is expected that through composition the
 * children components take care of this.
 *
 * @param {Object} props
 * @param {Object} props.children
 * @param {function} [props.onClose = null]
 */
const PopUp = (props) => {
    let showClose = '';

    if (props.showClose) {
        showClose = s.showClose;
    } else {
        showClose = s.hideClose;
    }
    return (
        <div className={s.wrapper}>
            <div className={`${s.pop} ${props.className === 'dropShadow' ? s.dropShadow : ''} ${props.popUpClass}`}>
                <Button
                    className={`${s.close} ${showClose}`}
                    onClick={props.onClose}
                >
                    <i className="fa fa-times-circle" />
                </Button>
                <div className={`row ${props.className}`}>
                    <div className="col">
                        {props.title ? <h2>{props.title}</h2> : null}
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
};

PopUp.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    title: PropTypes.string,
    className: PropTypes.string,
    popUpClass: PropTypes.string,
    showClose: PropTypes.bool,
};

PopUp.defaultProps = {
    onClose: null,
    title: '',
    className: null,
    popUpClass: null,
    showClose: true,
};

export default PopUp;
