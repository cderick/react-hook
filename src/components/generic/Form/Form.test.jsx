/* eslint no-unused-expressions: "off" */
/* global expect */
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Form from './Form';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('Form component', () => {
    let isSubmitted = false;
    const onSubmit = () => {
        isSubmitted = true;
    };
    const wrapper = shallow(<Form onSubmit={onSubmit}>Test</Form>);

    it('should render one form element', () => {
        expect(wrapper.find('form')).to.have.lengthOf(1);
    });

    it('should have an onSubmit action in props', () => {
        expect(wrapper.prop('onSubmit')).to.be.a('function');
    });

    it('should trigger onSubmit when form is submitted', () => {
        wrapper.find('form').simulate('submit');
        expect(isSubmitted).to.be.true;
    });
});
