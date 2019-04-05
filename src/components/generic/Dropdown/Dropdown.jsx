import React from 'react';
import PropTypes from 'prop-types';
import s from './Dropdown.scss';

/**
 * Dropdown that will display a list of items and perform an action depending on
 * the item selected.
 * @param {Object} props
 * @param {string []} props.items
 * @param {string} [props.filter = '']
 * @param {function} props.onClick
 */
class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayDropdown: true,
        };
    }

    componentWillReceiveProps() {
        if (this.props.display !== this.state.displayDropdown && this.props.display !== undefined) {
            this.setState({ displayDropdown: true });
        }
    }

    render() {
        const options = this.props.items;

        if (!this.state.displayDropdown) {
            return '';
        }

        return (
            <div
                id={this.props.id}
                className={`${s.dropdown} dropdown`}
                filter={this.props.filter}
            >
                <div
                    className={`dropdown-menu  ${this.props.className}`}
                    aria-labelledby={this.props.id}
                >
                    {options.map(item => (
                        <button
                            key={item}
                            className={`${s.dropdownItem} dropdown-item`}
                            onClick={() => {
                                this.setState({ displayDropdown: false }, () => {
                                    this.props.onClick(item);
                                });
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

Dropdown.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    filter: PropTypes.string,
    display: PropTypes.bool,
};

Dropdown.defaultProps = {
    className: '',
    onClick: null,
    filter: '',
    display: undefined,
};

export default Dropdown;
