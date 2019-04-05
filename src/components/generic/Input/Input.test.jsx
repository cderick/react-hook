/* eslint no-unused-expressions: "off" */
/* global expect */
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Input from './Input';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('Input component', () => {
    let value = '';
    const onChange = (e) => {
        value = e;
    };
    const wrapper = mount(<Input onChange={onChange} minLength={4} maxLength={8} id="test" />);

    it('should render an input element', () => {
        expect(wrapper.find('input')).to.have.lengthOf(1);
    });

    it('should have maxLength (defaults to 1), minLength (defaults to 100), id (required), onChange (required), type (defaults to "text") and placeholder (defaults to "") props', () => {
        expect(wrapper.prop('minLength')).to.be.a('number');
        expect(wrapper.prop('maxLength')).to.be.a('number');
        expect(wrapper.prop('id')).to.be.a('string');
        expect(wrapper.prop('onChange')).to.be.a('function');
        expect(wrapper.prop('type')).to.be.a('string');
        expect(wrapper.prop('placeholder')).to.be.a('string');
    });

    it('should start with a false isValid state (that should not be displayed)', () => {
        expect(wrapper.state('isValid')).to.be.false;
    });

    it('should be able to change to a true isValid state', () => {
        wrapper.find('input').simulate('change', { target: { name: 'test', value: 'test' } });
        wrapper.update();
        expect(value).to.equal('test');

        expect(wrapper.state('isValid')).to.be.true;
    });

    it('should be able to return to a false isValid state (that should display fa-times)', () => {
        wrapper.find('input').simulate('change', { target: { name: 'test', value: 'testtesttest' } });
        wrapper.update();

        expect(wrapper.state('isValid')).to.be.false;
        expect(wrapper.find('.fa-times')).to.have.lengthOf(1);
    });

    it('should render a text input if type is text or there is no type', () => {
        expect(wrapper.find('input[type="text"]')).to.have.lengthOf(1);
    });

    it('should render a number input if type is number', () => {
        const wrapperNumber = shallow(<Input
            onChange={onChange}
            minLength={4}
            maxLength={8}
            id="test1"
            type="number"
        />);
        expect(wrapperNumber.find('input[type="number"]')).to.have.lengthOf(1);
    });

    it('should render a password input if type is password', () => {
        const wrapperPassword = shallow(<Input
            onChange={onChange}
            minLength={4}
            maxLength={8}
            id="test2"
            type="password"
        />);
        expect(wrapperPassword.find('input[type="password"]')).to.have.lengthOf(1);
    });

    it('should render an email input if type is email', () => {
        const wrapperPassword = shallow(<Input
            onChange={onChange}
            minLength={4}
            maxLength={8}
            id="test3"
            type="email"
        />);
        expect(wrapperPassword.find('input[type="email"]')).to.have.lengthOf(1);
    });

    it('password inputs should display a "show/hide password option"');
});
