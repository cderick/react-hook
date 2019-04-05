import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import s from './Feedback.scss';

/**
 * Controlled wrapper component for HTML element input with type checkbox
 * @param {Object} props
 * @param {string []} [props.feedbackMessages = []]
 */
const Feedback = (props) => {
    const { messageType } = props;
    let title = '';
    let alertType = s.feedback;
    const testMainmessage = props.feedbackMessages[props.message];
    let mainMessage = '';
    const patt = /^(Error)/;
    const pattSucess = /^(Success)/;
    const pattTwo = /\s(.*)/;
    

    if (!testMainmessage.match(patt)) {
        alertType = `${s.success}`;
        title = <i className="fas fa-check-circle" />;
        if(testMainmessage.match(pattSucess)){
            const newMatch = testMainmessage.match(pattTwo);
            mainMessage = newMatch[1];
        } else {
            mainMessage = testMainmessage;
        }
    } else if (testMainmessage.match(patt)) {
        alertType = `${s.warning}`;
        title = <i className="fas fa-exclamation-circle" />;
        if(testMainmessage.match(pattTwo)){
            const newMatch = testMainmessage.match(pattTwo);
            mainMessage = newMatch[1];
        } else {
            mainMessage = testMainmessage;
        }
    } else {
        alertType = `${s.alert}`;
        title = '';
    }

    return (
        <div>
            <div
                className={`${s.feedback} ${alertType}`}
                messagetype={messageType}
                message={props.message}
            >
                <Button
                    id={s.feedbackClose}
                    onClick={props.onClose}
                >
                    <span
                        className={`${s.close} fa fa-times-circle`}
                    />
                </Button>
                <span className={s.title}>
                    {title}
                </span>
                <span className={s.feedbackContent}>
                    {mainMessage}
                </span>
            </div>
        </div>
    );
};

Feedback.propTypes = {
    feedbackMessages: PropTypes.arrayOf(PropTypes.string),
    message: PropTypes.number,
    onClose: PropTypes.func,
    messageType: PropTypes.string,
};

Feedback.defaultProps = {
    feedbackMessages: [],
    message: 0,
    onClose: null,
    messageType: undefined,
};

export default Feedback;
