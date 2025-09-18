import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../src/components/Footer';

// Wrapper para React Router
const FooterWrapper = () => (
  <BrowserRouter>
    <Footer />
  </BrowserRouter>
);

describe('Footer Component', () => {
  test('renders without crashing', () => {
    expect(() => {
      render(<FooterWrapper />);
    }).not.toThrow();
  });
});