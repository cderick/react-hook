import React from 'react';
import PropTypes from 'prop-types';
import s from './RadioButton.scss';

class RadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: false,
        };
    }

    render() {
        let animation = s.animOff;

        const handleChange = () => {
            this.setState({ animation });
            setTimeout(() => {
                this.setState({ animation: false });
            }, 650);
        };

        if (this.state.animation) {
            animation = s.animOn;
        } else {
            animation = s.animOff;
        }

        return (
            <span className={this.props.className} onChange={e => this.props.onChange(e)}>
                <label
                    htmlFor={this.props.id}
                    className={
                        this.props.currentlySelected === this.props.id
                            ? `${s.active} ${s.label} ${this.props.labelClass}`
                            : `${s.label} ${this.props.labelClass}`
                    }
                >
                    <span className={s.radioWrapper}>
                        <input
                            key={this.props.id}
                            id={this.props.id}
                            className={`${s.radio} ${s.optionInput}`}
                            type="radio"
                            name={this.props.name}
                            value={this.props.id}
                            checked={this.props.checked}
                            onChange={handleChange}
                        />
                        <span className={`${s.animation} ${animation}`} />
                    </span>
                    <span className={s.text}>{this.props.label}</span>
                    <span className={s.price}>
                        <strong>{this.props.price}</strong>
                    </span>
                </label>
            </span>
        );
    }
}

RadioButton.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]).isRequired,
    labelClass: PropTypes.string,
    price: PropTypes.string,
    currentlySelected: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

RadioButton.defaultProps = {
    className: '',
    labelClass: '',
    price: '',
    checked: false,
    onChange: null,
    currentlySelected: '',
};

export default RadioButton;
