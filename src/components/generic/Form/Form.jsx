import React from 'react';
import PropTypes from 'prop-types';

const Form = props => (
    <form onSubmit={props.onSubmit} style={{ width: '100%', margin: '0px' }}>
        {props.children}
    </form>);

Form.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default Form;
