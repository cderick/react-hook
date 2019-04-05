import React from 'react';
import PropTypes from 'prop-types';
import Step from '../Step/Step';
import s from './Steps.scss';

/**
 * Steps component will take as children Step components and will
 * receive through props which one should be active, if active
 * is not received it will be set to zero and no component will be set as active
 */

const Steps = props => (
    <div className="d-block mx-auto">
        <div
            className={s.steps}
            onChange={props.onChange}
        >
            {props.children.map(step => (
                <Step
                    key={step.props.number}
                    number={step.props.number}
                    text={step.props.text}
                    active={props.active}
                />
            ))}
            <hr className={s.line} />
        </div>
    </div>
);

Steps.propTypes = {
    onChange: PropTypes.func,
    children: PropTypes.node.isRequired,
    active: PropTypes.number.isRequired,
};

Steps.defaultProps = {
    onChange: null,
};

export default Steps;
