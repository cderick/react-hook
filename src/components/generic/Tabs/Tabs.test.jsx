/* eslint function-paren-newline: "off" */
/* global expect */

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tabs from './Tabs';
import Tab from '../Tab/Tab';

import s from './Tabs.scss';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('Tabs component', () => {
    const wrapper = mount(
        <Tabs>
            <Tab id="tab1" content="tab1content" />
            <Tab id="tab2" content="tab2content" />
        </Tabs>);

    it('should render a Tabs container', () => {
        expect(wrapper.instance()).to.be.instanceOf(Tabs);
    });

    it('should render two Tab children with the right id', () => {
        expect(wrapper.find('Tab')).to.have.length(2);
        expect(wrapper.find('#tab1-tab')).to.have.length(1);
        expect(wrapper.find('#tab2-tab')).to.have.length(1);
    });

    it('should contain a tabContent container', () => {
        expect(wrapper.find(`.${s.tabContent}`)).to.have.length(1);
    });

    it('should update the content once the tab is clicked', () => {
        wrapper.find('#tab2-tab button').simulate('click');
        wrapper.update();

        expect(wrapper.find(`.${s.tabContent}`).text()).to.equal('tab2content');
    });
});
