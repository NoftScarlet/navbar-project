import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { NavItem } from '../NavItem';
import { ThemeContext } from '../ThemeContext';
import { ThemeConfig } from '../navbar.types';

const defaultThemeContext: ThemeConfig = {
  theme: 'light',
  font: 'Arial',
  textColor: '#333333',
  backgroundColor: '#ffffff',
};

const renderWithTheme = (ui: React.ReactElement, themeValue = defaultThemeContext) => {
  return render(
    <ThemeContext.Provider value={themeValue}>
      {ui}
    </ThemeContext.Provider>
  );
};

describe('NavItem', () => {
  const mockOnExpand = jest.fn();
  const mockOnNavClose = jest.fn();

  const defaultProps = {
    item: {
      id: 'test',
      label: 'Test Item',
      href: '/test',
      displayMode: 'text' as const,
    },
    isMobile: false,
    onExpand: mockOnExpand,
    expandedItems: new Set<string>(),
    onNavClose: mockOnNavClose,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders text-only item correctly', () => {
    renderWithTheme(<NavItem {...defaultProps} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });

  it('renders icon-only item correctly', () => {
    const iconProps = {
      ...defaultProps,
      item: {
        ...defaultProps.item,
        displayMode: 'icon' as const,
        icon: <span data-testid="test-icon">icon</span>,
      },
    };
    renderWithTheme(<NavItem {...iconProps} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders mixed (icon and text) item correctly', () => {
    const mixedProps = {
      ...defaultProps,
      item: {
        ...defaultProps.item,
        displayMode: 'mixed' as const,
        icon: <span data-testid="test-icon">icon</span>,
      },
    };
    renderWithTheme(<NavItem {...mixedProps} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('applies style overrides correctly', () => {
    const props = {
      ...defaultProps,
      item: {
        ...defaultProps.item,
        textColorOverride: '#ff0000',
        backgroundColorOverride: '#f0f0f0',
        fontOverride: 'Georgia' as const,
      },
      textColorOverride: '#ff0000',
      backgroundColorOverride: '#f0f0f0',
      fontOverride: 'Georgia' as const,
    };

    renderWithTheme(
      <NavItem
        {...props}
        {...(props.item.textColorOverride ? { textColorOverride: props.item.textColorOverride } : {})}
        {...(props.item.backgroundColorOverride ? { backgroundColorOverride: props.item.backgroundColorOverride } : {})}
        {...(props.item.fontOverride ? { fontOverride: props.item.fontOverride } : {})}
      />
    );

    const wrapper = screen.getByText('Test Item').closest('.navItemWrapper');
    expect(wrapper).toHaveStyle({
      '--item-text-color': '#ff0000',
      '--item-bg-color': '#f0f0f0',
      '--item-font': 'Georgia',
    });
  });
});