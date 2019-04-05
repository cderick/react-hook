import React from 'react';
import PropTypes from 'prop-types';
import s from './Step.scss';

const Step = (props) => {
    let circleClass = `${s.circle}`;

    if (props.active === parseInt(props.number, 10)) {
        circleClass = `${s.circle} ${s.active}`;
    }

    return (
        <div className={`${s.step} text-center`} >
            <div className={s.number}>
                Step {props.number}
            </div>
            <div className={s.text}>
                {props.text}
            </div>
            <div className={s.circleContainer}>
                <div
                    className={circleClass}
                />
            </div>
        </div>
    );
};

Step.propTypes = {
    number: PropTypes.number.isRequired,
    text: PropTypes.string,
    active: PropTypes.number,
};

Step.defaultProps = {
    active: undefined,
    text: '',
};

export default Step;
