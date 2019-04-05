/* global expect */

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProgressBar from './ProgressBar';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('ProgressBar component', () => {
    const wrapper = mount(<ProgressBar currentValue={10} />);

    it('should render a progress bar', () => {
        expect(wrapper.find('.progress')).to.have.lengthOf(1);
        expect(wrapper.find('.progress-bar')).to.have.lengthOf(1);
    });

    it('can receive a currentValue number property (defaults to 0)', () => {
        expect(wrapper.prop('currentValue')).to.be.a('number');
    });

    it('can receive an error property (defaults to false)', () => {
        expect(wrapper.prop('error')).to.be.a('boolean');
    });
});
