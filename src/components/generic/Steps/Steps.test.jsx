/* global expect */

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Steps from './Steps';
import Step from '../Step/Step';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('Steps component', () => {
    const steps = (
        <Steps active={1}>
            <Step number={1} text="One" />
            <Step number={2} text="Two" />
        </Steps>);
    const wrapper = shallow(steps);

    it('should render a div containing children Steps components', () => {
        expect(wrapper.find('Step')).to.have.lengthOf(1);
    });

    it('should take an "active" numeric value through props that defaults to 0, indicating the active step');
    it('should take an "onChange" function through props that defaults to null, indicating the active step');
});
