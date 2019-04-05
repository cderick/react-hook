import React from 'react';
import PropTypes from 'prop-types';
import s from './Tab.scss';

const Tab = props => (
    <li
        id={props.id}
        title={props.title}
        className={`${s.tab} nav-item ${props.className}`}
    >
        {props.children}
    </li>
);

Tab.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Tab.defaultProps = {
    className: '',
};

export default Tab;
