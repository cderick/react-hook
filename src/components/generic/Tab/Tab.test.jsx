/* eslint no-unused-expressions: "off" */
/* global expect */

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tab from './Tab';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('Tab component', () => {
    let clicked = false;
    const onClick = () => { clicked = true; };
    const wrapper = mount(<Tab id="tab1" content="tab1content" onClick={onClick} />);

    it('should render a button with the right id', () => {
        expect(wrapper.find('button')).to.have.lengthOf(1);
        expect(wrapper.find('#tab1-tab')).to.have.lengthOf(1);
    });

    it('should fire onClick when clicked', () => {
        wrapper.find('button').simulate('click');
        expect(clicked).to.be.true;
    });
});
