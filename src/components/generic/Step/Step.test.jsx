/* global expect */

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Step from './Step';
import s from './Step.scss';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('Step component', () => {
    const wrapper = shallow(<Step number={2} text="Two" />);

    it('should render a step component', () => {
        expect(wrapper.find(`.${s.step}`)).to.have.lengthOf(1);
    });
});
