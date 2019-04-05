/* eslint no-unused-expressions: "off" */
/* global expect */

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PopUp from './PopUp';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('PopUp component', () => {
    let closed = false;
    const onClose = () => { closed = true; };
    const wrapper = shallow(<PopUp>Test</PopUp>);
    const wrapperClose = shallow(<PopUp onClose={onClose}>Test</PopUp>);

    it('should render an instance of PopUp with the children content', () => {
        expect(wrapper.find('PopUp')).to.have.lengthOf(1);
        expect(wrapper.find('PopUp').text()).to.equal('Test');
    });
    it('should call onClose when closing link is clicked', () => {
        wrapperClose.find('a').simulate('click');
        expect(closed).to.be.true;
    });
    it('should not display closing link if onClose is not passed', () => {
        expect(wrapper.find('a')).to.have.lengthOf(0);
    });
});
