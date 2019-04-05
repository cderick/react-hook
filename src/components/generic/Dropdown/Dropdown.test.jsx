/* global expect */

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dropdown from './Dropdown';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('Dropdown component', () => {
    let selected = '';
    const onClick = (option) => { selected = option; };
    const wrapper = shallow(<Dropdown id="test1" items={['aaa', 'abc']} onClick={onClick} />);
    const wrapperWithFilter = shallow(<Dropdown id="test2" items={['aaa', 'abc']} filter="bc" onClick={onClick} />);

    it('should render as many links as items passed', () => {
        expect(wrapper.find('button')).to.have.lengthOf(2);
    });

    it('should display only the relevant links if a filter is passed through props', () => {
        expect(wrapperWithFilter.find('button').text()).to.equal('abc');
    });

    it('should call onClick with the text of the item clicked as first parameter', () => {
        wrapperWithFilter.find('button').simulate('click');
        expect(selected).to.equal('abc');
    });

    it('should stop displaying the links once an element is clicked', () => {
        wrapper.find('button').at(0).simulate('click');
        wrapper.update();
        expect(wrapper.find('button')).to.have.lengthOf(0);
    });
});
