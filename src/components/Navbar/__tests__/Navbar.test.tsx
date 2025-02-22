import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { Navbar } from '../Navbar';
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

describe('Navbar', () => {
  const defaultProps = {
    brand: {
      logo: <span data-testid="brand-logo">Logo</span>,
      name: 'Test Brand',
      href: '/',
    },
    items: [
      {
        id: 'item1',
        label: 'Item 1',
        href: '/item1',
      },
      {
        id: 'item2',
        label: 'Item 2',
        subItems: [
          {
            id: 'sub1',
            label: 'Sub Item 1',
            href: '/sub1',
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
  });

  it('renders navigation items correctly', () => {
    renderWithTheme(<Navbar {...defaultProps} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('shows hamburger menu in mobile view', () => {
    global.innerWidth = 480;
    global.dispatchEvent(new Event('resize'));

    renderWithTheme(<Navbar {...defaultProps} />);
    expect(screen.getByRole('button', { name: /toggle navigation menu/i })).toBeInTheDocument();
  });

  it('toggles mobile menu when clicking hamburger button', () => {
    global.innerWidth = 480;
    global.dispatchEvent(new Event('resize'));

    renderWithTheme(<Navbar {...defaultProps} />);
    const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    const menubar = screen.getByRole('menubar');

    fireEvent.click(toggleButton);
    expect(menubar).toHaveClass('open');

    fireEvent.click(toggleButton);
    expect(menubar).not.toHaveClass('open');
  });

  it('applies theme styles correctly', () => {
    const darkTheme: ThemeConfig = {
      ...defaultThemeContext,
      theme: 'dark',
      textColor: '#ffffff',
      backgroundColor: '#1a1a1a',
    };

    renderWithTheme(<Navbar {...defaultProps} />, darkTheme);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('data-theme', 'dark');
  });
});