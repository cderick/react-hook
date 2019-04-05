/* global expect */

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Feedback from './Feedback';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('Feedback component', () => {
    const wrapper = mount(<Feedback feedbackMessages={['test1', 'test2']} />);
    const wrapperDefault = mount(<Feedback />);

    it('should render a div containing the feedback', () => {
        expect(wrapper.find('Feedback')).to.have.lengthOf(1);
    });

    it('should receive via props a feedbackMessages array that defaults to empty containing feedback messages', () => {
        expect(wrapperDefault.props('feedbackMessages')).to.be.an('array');
    });

    it('should contain one or several feedback messages', () => {
        const textElement = wrapper.findWhere(element => element.text() === 'test1');

        expect(textElement).to.have.lengthOf(1);
    });

    it('should make the messages disappear if they are closed by clicking a link on them', () => {
        wrapper.find('a').simulate('click');
        const textElement = wrapper.update().findWhere(element => element.text() === 'test1');

        expect(textElement).to.have.lengthOf(0);
    });
});
