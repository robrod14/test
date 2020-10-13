const React = require('react');
const { AddressLabelCoverSheet } = require('./AddressLabelCoverSheet.jsx');
const { mount } = require('enzyme');

describe('AddressLabelCoverSheet', () => {
  it('renders the docket number with suffix', () => {
    const wrapper = mount(
      <AddressLabelCoverSheet docketNumberWithSuffix="123-45S" />,
    );

    expect(wrapper.text()).toContain('Docket 123-45S');
  });

  it('renders the name and address', () => {
    const wrapper = mount(
      <AddressLabelCoverSheet
        address1="123 Some Street"
        city="Some City"
        countryName="USA"
        docketNumberWithSuffix="123-45S"
        name="Test Person"
        postalCode="89890"
        state="ZZ"
      />,
    );

    expect(wrapper.text()).toContain('123 Some Street');
    expect(wrapper.text()).toContain('Some City');
    expect(wrapper.text()).toContain('USA');
    expect(wrapper.text()).toContain('Test Person');
    expect(wrapper.text()).toContain('89890');
    expect(wrapper.text()).toContain('ZZ');
  });
});
