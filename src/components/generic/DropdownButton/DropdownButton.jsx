import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import s from './DropdownButton.scss';

class DropdownButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDropdown: false,
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown() {
        this.setState({ displayDropdown: !this.state.displayDropdown });
    }

    render() {
        return (
            <div>
                <Button
                    id={this.props.btnId}
                    className={`${this.props.btnClass} ${s.btn}`}
                    onClick={this.toggleDropdown}
                    label={this.props.btnLabel}
                >
                    {this.props.btnContent}<i className={`${s.chevron} fas fa-chevron-down`} />
                </Button>
                <Dropdown
                    id={this.props.dropdownId}
                    className={this.state.displayDropdown ? `${s.dropdown} ${s.dropdownActive}` : s.dropdown}
                    items={this.props.items}
                    filter={this.props.filter}
                    onClick={this.props.onClick}
                    display={this.state.displayDropdown}
                />
            </div>
        );
    }
}

DropdownButton.propTypes = {
    btnId: PropTypes.string,
    btnClass: PropTypes.string,
    btnLabel: PropTypes.string,
    btnContent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
    dropdownId: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    filter: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

DropdownButton.defaultProps = {
    btnId: '',
    btnClass: '',
    btnLabel: '',
    btnContent: '',
    dropdownId: '',
    filter: '',
};

export default DropdownButton;
