import React from 'react';
import PropTypes from 'prop-types';
import s from './Select.scss';

/**
 * Wrapper component of HTML select element, it is a controlled
 * component, therefore it expects two propierties:
 * - onChange : function to be called when select changes
 * - value : value of the option to be selected
 * It also expects the following props:
 * - multiple : enables slecting multiple values if true
 * - defaultMessage : text to be displayed while nothing if selected if not multiple
 * - children : option elements
 */
const Select = props => (
    <select
        className={`${s.select} ${props.className}`}
        multiple={props.multiple}
        onChange={props.onChange}
        value={props.value}
    >
        <option value="default_value" disabled hidden>{props.defaultMessage}</option>
        {props.children.map(option => (
            <option
                key={option}
                value={option}
            >
                {option}
            </option>
        ))}
    </select>
);

Select.propTypes = {
    className: PropTypes.string,
    multiple: PropTypes.bool,
    children: PropTypes.node.isRequired,
    defaultMessage: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
};

Select.defaultProps = {
    className: '',
    multiple: false,
    defaultMessage: 'Please select...',
    value: 'default_value',
};

export default Select;
