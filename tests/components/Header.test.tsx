import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Header from '../../src/components/Header';

// Mock functions para las props
const mockOnMenuClick = vi.fn();
const mockOnBackClick = vi.fn();

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockOnMenuClick.mockClear();
    mockOnBackClick.mockClear();
  });

  test('renders without crashing', () => {
    expect(() => {
      render(
        <Header 
          title="Test Title" 
          onMenuClick={mockOnMenuClick}
          onBackClick={mockOnBackClick}
        />
      );
    }).not.toThrow();
  });
});