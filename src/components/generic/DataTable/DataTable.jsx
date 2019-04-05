/**
 * Some eslint options deactivated until review and refactor
 */
/* eslint prefer-destructuring: "off" */
/* eslint react/no-array-index-key: "off" */

import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import Button from '../Button/Button';
import s from './DataTable.scss';

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            hasHeader: this.props.header,
            tableSortLimit: this.props.tableSortLimit ? this.props.tableSortLimit : -2,
            restrictionTable: this.props.restrictionTable ? this.props.restrictionTable : null,
            sortable: this.props.sortable ? this.props.sortable : false,
            centerText: this.props.centerText,
            scrollonmedium: this.props.scrollonmedium ? true : false,
            perPage: 10,
            pageCount: 1,
            currentPage: 0,
        };

        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.sortColumn = this.sortColumn.bind(this);
    }

    componentWillMount() {
        this.setState({ hasHeader: this.props.header });
        this.calculatePageCount();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                data: nextProps.data,
            }, () => {
                this.calculatePageCount();
            });
        }
    }

    calculatePageCount() {
        const rowsPerPage = this.state.perPage;

        /* Set total rows dependant on if table has a header */
        let totalRows = this.state.data.length;

        if (this.state.hasHeader) {
            totalRows = this.state.data.length - 1;
        }

        const modulus = totalRows % rowsPerPage;

        /* Calculate total pages based on if there is a remainder */
        let totalPages = Math.floor(totalRows / rowsPerPage);
        if (modulus > 0) {
            totalPages += 1;
        }

        this.setState({ pageCount: totalPages }, () => {
            if (this.state.pageCount === 0) {
                this.setState({ pageCount: 1 });
            }
        });
    }

    prevPage() {
        if (this.state.currentPage > 0) {
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
    }

    nextPage() {
        if (this.state.currentPage < (this.state.pageCount - 1)) {
            this.setState({ currentPage: this.state.currentPage + 1 });
        }
    }

    sortColumn(e) {
        const { data } = this.state;
        const col = parseInt(e.split('-')[1], 10);
        const header = data[0];
        const common = data.slice(1);
        if (col <= this.state.tableSortLimit) {
            const newdata = common.sort((a, b) => {
                return String(a[col]).localeCompare(String(b[col]));
            });
            this.renderTable(newdata, header)
        }
    }

    renderTable(data, header) {
        data.unshift(header);
        this.setState({ data });
    }

    render() {
        const data = this.state.hasHeader ? this.state.data.slice(1) : this.state.data;
        const header = this.state.hasHeader ? this.state.data[0] : null;
        const { currentPage } = this.state;
        const { perPage } = this.state;

        /* Filter data based on current page */
        const startIndex = currentPage * perPage;
        const endIndex = startIndex + perPage;
        const dataFiltered = data && data.length > 0 ? data.slice(startIndex, endIndex) : null;

        /* Calculate how many pages to display in pagination */
        const pages = [];
        for (let i = 0; i < this.state.pageCount; i += 1) {
            const item = (
                <li key={`page ${i}`} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <Button
                        className={`page-link ${s.pageLink}`}
                        onClick={() => this.setState({ currentPage: i })}
                    >
                        {i + 1}
                    </Button>
                </li>
            );

            pages.push(item);
        }

        return (
            <div>
                <div className={this.props.scrollonmedium ? `${s.tableWrapperMedium} ${s.tableWrapper}` : s.tableWrapper}>
                    <table className={`${s.table} table table-striped`}>
                        {/* If table has a header, render first row as headers */}
                        {this.state.hasHeader ?
                            <thead>
                                <tr>
                                    {header.map((th, index) => (
                                        <th
                                            key={`${th} ${index}`}
                                            id={`column-${index}`}
                                            className={`${this.state.tableSortLimit !== -1 
                                                && this.state.tableSortLimit <= index-1 
                                                || this.state.restrictionTable !== null 
                                                && this.state.restrictionTable === index  
                                                ? ''
                                                : s.sortStyle} ${s.th} ${this.state.centerText.indexOf(index) > -1 ? s.centerText : ''}`}
                                            onClick={() => { 
                                                if(this.state.sortable){
                                                    this.sortColumn(`column-${index}`) 
                                                }
                                            }}
                                        >
                                            {th}<span className={`${this.state.tableSortLimit !== -1 
                                                && this.state.tableSortLimit <= index-1 
                                                || this.state.restrictionTable !== null 
                                                && this.state.restrictionTable === index  
                                                ? ''
                                                : `${s.iconStyle} fa fa-sort-down`}`}></span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            : null}
                        <tbody>
                            {dataFiltered && dataFiltered.length > 0 ?
                                dataFiltered.map((row, key) => (
                                    <tr key={key}>
                                        {row.map((col, i) => {
                                            const centerText = (
                                                this.state.centerText.indexOf(i) > -1
                                            );

                                            let action = null;
                                            let hasAction = false;

                                            this.props.actions.forEach((cv) => {
                                                if (cv[0] === i) {
                                                    hasAction = true;
                                                    action = cv[1];
                                                }
                                            });

                                            return (
                                                <td
                                                    key={`${col} ${i}`}
                                                    className={`${s.td} ${centerText ? s.centerText : null}`}
                                                    id={`row-${key}-col-${i}`}
                                                >
                                                    {/* If column has action then render a
                                                    button. if it doesnt just render col */}
                                                    {hasAction ?
                                                        (
                                                            <a
                                                                className={s.btn}
                                                                onClick={action}
                                                                id={`row-${key}-col-${i}-btn`}
                                                            >
                                                                {col}
                                                            </a>
                                                        )
                                                        : col}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))
                                : ''}
                        </tbody>
                    </table>
                </div>
                <div className="text-right">
                    <span className={s.controls}>
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item">
                                    <Button
                                        className={`page-link ${s.pageLink}`}
                                        onClick={this.prevPage}
                                    >
                                        <i className="fas fa-chevron-left" />
                                    </Button>
                                </li>
                                {pages}
                                <li className="page-item">
                                    <Button
                                        className={`page-link ${s.pageLink}`}
                                        onClick={this.nextPage}
                                    >
                                        <i className="fas fa-chevron-right" />
                                    </Button>
                                </li>
                            </ul>
                        </nav>
                    </span>
                </div>
            </div>
        );
    }
}

DataTable.propTypes = {
    header: PropTypes.bool,
    data: PropTypes.arrayOf(oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
        PropTypes.node,
    ])).isRequired,
    centerText: PropTypes.arrayOf(PropTypes.number),
    actions: PropTypes.arrayOf(PropTypes.arrayOf(oneOfType([
        PropTypes.number,
        PropTypes.func,
    ]))),
};

DataTable.defaultProps = {
    header: false,
    centerText: [],
    actions: [],
};

export default DataTable;
