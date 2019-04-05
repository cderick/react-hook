/* global expect */

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Loading from './Loading';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('Loading component', () => {
    const wrapper = mount(<Loading />);

    it('should render a Loading component', () => {
        expect(wrapper.find('Loading')).to.have.lengthOf(1);
    });

    it('can receive a message through props that defaults to empty string', () => {
        expect(wrapper.prop('message')).to.be.a('string');
    });
});
