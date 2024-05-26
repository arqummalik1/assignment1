import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders Home screen by default', () => {
    const { getByTestId } = render(<App />);
    const homeScreen = getByTestId('home-screen');
    expect(homeScreen).toBeDefined();
  });

  it('navigates to Property Details screen when clicked', () => {
    const { getByTestId } = render(<App />);
    const propertyDetailsButton = getByTestId('property-details-button');

    fireEvent.press(propertyDetailsButton);

    const propertyDetailsScreen = getByTestId('property-details-screen');
    expect(propertyDetailsScreen).toBeDefined();
  });

  it('renders Property Details tabs', () => {
    const { getByText } = render(<App />);
    const propertyDetailsButton = getByTestId('property-details-button');

    fireEvent.press(propertyDetailsButton);

    expect(getByText('Property Data')).toBeDefined();
    expect(getByText('Subject Property')).toBeDefined();
    expect(getByText('Site Info')).toBeDefined();
    expect(getByText('Buildings')).toBeDefined();
  });
});
