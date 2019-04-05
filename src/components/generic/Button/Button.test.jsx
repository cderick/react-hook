/* eslint no-unused-expressions: "off" */
/* global expect */

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from './Button';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('Button component', () => {
    let submitted = false;
    const submit = () => { submitted = true; };
    const wrapperDefault = mount(<Button>Click me!</Button>);
    const wrapperPrimary = mount(<Button primary>Click me!</Button>);
    const wrapperSecondary = mount(<Button secondary onClick={submit}>Click me!</Button>);

    it('should render a button element with the children prop as text', () => {
        expect(wrapperDefault.find('button')).to.have.lengthOf(1);
        expect(wrapperDefault.prop('children')).to.equal('Click me!');
    });

    it('can take primary (default false) and secondary (default true) as props', () => {
        expect(wrapperDefault.prop('primary')).to.equal(false);
        expect(wrapperPrimary.prop('primary')).to.equal(true);
        expect(wrapperSecondary.prop('secondary')).to.equal(true);
    });

    it('can take an onClick function (default as null) as props', () => {
        expect(wrapperPrimary.prop('onClick')).to.be.null;
    });

    it('will require an onClick if secondary', () => {
        expect(wrapperSecondary.prop('onClick')).to.be.a('function');
    });

    it('will submit a form when clicked by default if primary', () => {
        expect(wrapperPrimary.find('button[type="submit"]')).to.have.lengthOf(1);
    });

    it('will perform the onClick action if provided', () => {
        wrapperSecondary.find('button').simulate('click');
        expect(submitted).to.be.true;
    });
});
