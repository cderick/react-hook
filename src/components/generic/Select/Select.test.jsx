/* eslint no-unused-expressions: "off" */
/* eslint function-paren-newline: "off" */
/* global expect */

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Select from './Select';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('Select component', () => {
    let selectHappened = false;
    const onChange = () => { selectHappened = true; };
    const wrapper = mount(
        <Select value="a" onChange={onChange}>
            <option value="a">a</option>
            <option value="b">b</option>
        </Select>);

    it('should render a select element', () => {
        expect(wrapper.find('select')).to.have.lengthOf(1);
    });

    it('should render option children elements', () => {
        expect(wrapper.find('option')).to.have.lengthOf(3);
    });

    it('can receive the multiple property (defaults to false)', () => {
        expect(wrapper.prop('multiple')).to.be.a('boolean');
    });

    it('can receive the defaultMessage property (defaults to "Please select..."', () => {
        expect(wrapper.prop('defaultMessage')).to.be.a('string');
        expect(wrapper.prop('defaultMessage')).to.equal('Please select...');
    });

    it('must receive an onChange function via props', () => {
        expect(wrapper.prop('onChange')).to.be.a('function');
    });

    it('must receive a value prop containing a string that matches the selected value', () => {
        expect(wrapper.prop('value')).to.be.a('string');
    });

    it('must fire onChange when an option is clicked', () => {
        wrapper.find('option[value="b"]').simulate('change');
        expect(selectHappened).to.be.true;
    });
});
