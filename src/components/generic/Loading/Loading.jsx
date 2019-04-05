import React from 'react';
import PropTypes from 'prop-types';
import s from './Loading.scss';

/**
 * Default Loading component, it will be displayed while an
 * operation is completed to prevent interaction.
 * Therefore, it should cover the whole viewport.
 */
const Loading = props => (
    <div id={props.id ? props.id : 'regularSpinner'} className={`${s.loading} ${props.className}`}>
        <div className={`${s.loadingContent} text-center`}>
            <i className="fa fa-spinner fa-spin" />
            <br />
            <br />
            <p>{props.message}</p>
        </div>
    </div>);

Loading.propTypes = {
    message: PropTypes.string,
    className: PropTypes.string,
};

Loading.defaultProps = {
    message: '',
    className: null,
};
export default Loading;
