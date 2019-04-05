/* eslint no-unused-expressions: "off" */
/* global expect */

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Checkbox from './Checkbox';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('Checkbox component', () => {
    let value = false;
    const onClick = () => {
        value = true;
    };
    const checkbox = (
        <Checkbox id="test" label="test" onClick={onClick}>
            Click to check me
        </Checkbox>);
    const wrapper = mount(checkbox);

    it('should render an input with type checkbox and children property as label', () => {
        expect(wrapper.find('input[type="checkbox"]')).to.have.lengthOf(1);
        expect(wrapper.find('label')).to.have.lengthOf(1);
    });
    it('should have an id property', () => {
        expect(wrapper.prop('id')).to.be.a('string');
    });
    it('should have an onClick prop', () => {
        expect(wrapper.prop('onClick')).to.be.a('function');
    });
    it('should call onClick when clicked', () => {
        wrapper.find('input').simulate('click');
        expect(value).to.be.true;
    });
});
