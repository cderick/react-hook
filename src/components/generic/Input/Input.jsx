import React from 'react';
import PropTypes from 'prop-types';
import s from './Input.scss';
import { setInterval } from 'core-js';

let timeout_id = '';

class Input extends React.Component {
    constructor(props) {
        let value = '';

        super(props);

        if (props.value && !Number.isNaN(props.value) && props.type === 'number') {
            value = Number.parseFloat(props.value).toFixed(2);
        } else {
            ({ value } = props);
        }

        this.state = {
            isValid: true,
            value,
        };

        this.handleChange = this.handleChange.bind(this);
        this.increaseValue = this.increaseValue.bind(this);
        this.decreaseValue = this.decreaseValue.bind(this);
        this.decreaseFunction = this.decreaseFunction.bind(this);
        this.increaseFunction = this.increaseFunction.bind(this);
        this.timeoutClearinterval = this.timeoutClearinterval.bind(this);
        this.insertInterval = this.insertInterval.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
        if (nextProps.value && nextProps.value.length > 0 && nextProps.valid) {
            this.setState({ isValid: true });
        }
        if (nextProps.valid === false) {
            this.setState({ isValid: false });
        }
    }

    increaseValue(){
        const formedValue = this.state.value;
        if(Number.parseFloat(formedValue) + 1 <= this.props.max){
            const newValue = Number.parseFloat(formedValue) + 1;
            this.props.onChange(newValue);
        }
    }

    decreaseValue(){
        const formedValue = this.state.value;
        if(Number.parseFloat(formedValue) - 1 >= this.props.min){
            const newValue = Number.parseFloat(formedValue) - 1;
            this.props.onChange(newValue);
        }
    }

    increaseFunction(){
        setTimeout(() => {
            this.insertInterval(true);
        }, 500);
    }

    decreaseFunction(){
        setTimeout(() => {
            this.insertInterval(false);
        }, 500);
    }

    insertInterval(a){
        clearInterval(timeout_id);
        timeout_id = setInterval(() => {
            if(a){
                this.increaseValue();
            } else {
                this.decreaseValue();
            }
        }, 200);
    }

    timeoutClearinterval(){
        clearInterval(timeout_id);
        setTimeout(() => {
            clearInterval(timeout_id);
        }, 600);
    }

    handleChange(event) {
        if (this.props.type === 'number'
            && (event.target.value < this.props.min
                || event.target.value > this.props.max
                || Number.isNaN(event.target.value))) {
            this.setState({
                isValid: false,
            });
        } else {
            this.setState({
                value: Number.isNaN(event.target.value) ?
                    Number.parseFloat(event.target.value).toFixed(2) : event.target.value,
            }, () => {
                this.props.onChange(this.state.value);
            });
        }
    }

    render() {
        const validIcon = `fa fa-check ${s.iconSuccess}`;
        const validClass = `${s.input} form-control ${s.success}`;
        const increaseIcon = `fas fa-2x fa-caret-up ${s.iconSuccess}`;
        const decreaseIcon = `fas fa-2x fa-caret-down ${s.iconSuccess}`;
        const invalidIcon = `fa fa-times ${s.iconError}`;
        const invalidClass = this.state.value && this.state.value.length > 0 ? `${s.input} form-control ${s.error}` : `${s.input} form-control`;
        let label = '';

        if (this.props.label && this.props.label.length > 0) {
            label = <h5><strong>{this.props.label}</strong></h5>;
        } else {
            label = '';
        }

        return (
            <div className={`${this.props.className} input-group`} id={this.props.id}>
                {label}
                <span className={s.inputWrapper}>
                    <input
                        id={this.props.id}
                        key={this.props.id}
                        name={this.props.name}
                        className={this.props.inputClass === "noClass" ? `${validClass} ${this.props.inputClass}` : this.state.isValid && this.state.value ? `${validClass} ${this.props.inputClass}` : `${invalidClass} ${this.props.inputClass}`}
                        maxLength={this.props.maxLength}
                        minLength={this.props.minLength}
                        onChange={this.handleChange}
                        onKeyDown={this.props.onKeyDown}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        value={this.state.value}
                        aria-describedby={`${this.props.id}-addon`}
                        label={this.props.label}
                        min={this.props.type === 'number' ? this.props.min : ''}
                        max={this.props.type === 'number' ? this.props.max : ''}
                        step={this.props.type === 'number' ? this.props.step : ''}
                    />
                    {
                        this.state.isValid && this.state.value && this.props.inputClass !== "noClass" ?
                            <span id={`${this.props.id}-addon`} className={`input-group-addon ${s.icon}`}>
                                <i className={this.state.isValid ? validIcon : invalidIcon} />
                            </span>
                            : this.props.inputClass === "noClass" ? 
                            <span>
                                <a href="javascript:void(0)" onMouseUp={this.timeoutClearinterval} onMouseDown={this.increaseFunction} onClick={this.increaseValue}><span id={`${this.props.id}-addon`} className={`input-group-addon ${s.especialIcon}`}>
                                    <i className={increaseIcon} />
                                </span></a>
                                <a href="javascript:void(0)" onMouseUp={this.timeoutClearinterval} onMouseDown={this.decreaseFunction} onClick={this.decreaseValue}><span id={`${this.props.id}-addon`} className={`input-group-addon ${s.decreaseIcon}`}>
                                    <i className={decreaseIcon} />
                                </span></a>
                            </span>
                            : null
                    }
                    {
                        this.props.hasAddon ?
                            <div
                                className={`${this.props.addonClass} ${s.addon}`}
                                onClick={this.props.addonClick}
                                onKeyPress={() => {}}
                                role="button"
                                tabIndex={0}
                            >
                                {this.props.addon}
                            </div>
                            : null
                    }
                </span>
            </div>
        );
    }
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    inputClass: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    hasAddon: PropTypes.bool,
    addon: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string,
    ]),
    addonClass: PropTypes.string,
    addonClick: PropTypes.func,
    valid: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
};

Input.defaultProps = {
    className: '',
    inputClass: '',
    name: '',
    label: '',
    maxLength: 100,
    minLength: 1,
    type: 'text',
    placeholder: '',
    value: '',
    hasAddon: false,
    addon: '',
    addonClass: '',
    addonClick: null,
    valid: undefined,
    min: 0,
    max: 500,
    step: 0.01,
};

export default Input;
