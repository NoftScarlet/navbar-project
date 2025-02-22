import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import {
  FiHome,
  FiShoppingBag,
  FiMonitor,
  FiSmartphone,
  FiHardDrive,
  FiCode,
  FiServer,
  FiLayers,
  FiGrid,
  FiLifeBuoy,
  FiUser,
  FiSettings,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { Navbar } from './Navbar';
import { NavbarProps, Theme, FontFamily } from './navbar.types';
import { ThemeContext } from './ThemeContext';

const ThemeSwitcher: React.FC<{ theme: Theme; onToggle: () => void }> = ({ theme, onToggle }) => (
  <button
    style={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      padding: '0.5rem',
      background: theme === 'light' ? '#ffffff' : '#1a1a1a',
      border: '1px solid currentColor',
      borderRadius: '4px',
      color: theme === 'light' ? '#333333' : '#ffffff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      zIndex: 1001,
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    }}
    onClick={onToggle}
    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
  >
    {theme === 'light' ? (
      <>
        <FiMoon /> Dark Mode
      </>
    ) : (
      <>
        <FiSun /> Light Mode
      </>
    )}
  </button>
);

const StoryThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const font: FontFamily = 'Arial';

  return (
    <ThemeContext.Provider value={{
      theme,
      font,
      textColor: theme === 'light' ? '#333333' : '#ffffff',
      backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
      toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }}>
      <div style={{ paddingTop: '64px' }}>
        <ThemeSwitcher
          theme={theme}
          onToggle={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
        />
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default {
  title: 'Components/Navbar',
  component: Navbar,
  decorators: [(Story) => (
    <StoryThemeProvider>
      {Story()}
    </StoryThemeProvider>
  )],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A responsive navigation bar that features:
- Horizontal menu with wrapping for desktop view
- Hover and keyboard-triggered dropdowns on desktop
- Accordion-style expansion on mobile
- Multiple levels of nested navigation
- Mixed display modes (icon, text, or both)
- Theme switching support (light/dark)
- Font family configuration
        `
      }
    }
  },
  argTypes: {
    brand: {
      description: 'Brand information including logo, name and link'
    },
    items: {
      description: 'Navigation items including nested menus'
    }
  }
} as Meta;

const Template: StoryFn<NavbarProps> = (args) => (
  <div style={{ height: '300px' }}>
    <Navbar {...args} />
  </div>
);

export const NavbarWithNestedItems = Template.bind({});
NavbarWithNestedItems.args = {
  brand: {
    logo: <FiGrid />,
    name: 'TechMart',
    href: '/',
  },
  items: [
    {
      id: 'home',
      label: 'Home',
      icon: <FiHome />,
      href: '/',
      displayMode: 'mixed'
    },
    {
      id: 'products',
      label: 'Products',
      icon: <FiShoppingBag />,
      displayMode: 'mixed',
      subItems: [
        {
          id: 'hardware',
          label: 'Hardware',
          icon: <FiMonitor />,
          displayMode: 'mixed',
          subItems: [
            {
              id: 'computers',
              label: 'Computers',
              icon: <FiServer />,
              displayMode: 'mixed',
              subItems: [
                {
                  id: 'laptops',
                  label: 'Laptops',
                  icon: <FiSmartphone />,
                  href: '/products/laptops',
                  displayMode: 'text'
                },
                {
                  id: 'desktops',
                  label: 'Desktops',
                  icon: <FiMonitor />,
                  href: '/products/desktops',
                  displayMode: 'text'
                }
              ]
            },
            {
              id: 'peripherals',
              label: 'Peripherals',
              icon: <FiLayers />,
              displayMode: 'mixed',
              subItems: [
                {
                  id: 'storage',
                  label: 'Storage Devices',
                  icon: <FiHardDrive />,
                  href: '/products/storage',
                  displayMode: 'mixed'
                },
                {
                  id: 'networking',
                  label: 'Networking',
                  icon: <FiHardDrive />,
                  href: '/products/networking',
                  displayMode: 'mixed'
                }
              ]
            }
          ]
        },
        {
          id: 'software',
          label: 'Software',
          icon: <FiCode />,
          displayMode: 'mixed',
          subItems: [
            {
              id: 'development',
              label: 'Development',
              icon: <FiCode />,
              displayMode: 'mixed',
              subItems: [
                {
                  id: 'ide',
                  label: 'IDEs',
                  href: '/products/software/ide',
                  displayMode: 'text'
                },
                {
                  id: 'devtools',
                  label: 'Developer Tools',
                  href: '/products/software/devtools',
                  displayMode: 'text'
                }
              ]
            },
            {
              id: 'cloud',
              label: 'Cloud Services',
              icon: <FiCode />,
              href: '/products/software/cloud',
              displayMode: 'mixed'
            }
          ]
        }
      ]
    },
    {
      id: 'support',
      label: 'Support',
      icon: <FiLifeBuoy />,
      displayMode: 'mixed',
      subItems: [
        {
          id: 'documentation',
          label: 'Documentation',
          href: '/support/docs',
          displayMode: 'text'
        },
        {
          id: 'help',
          label: 'Help Center',
          href: '/support/help',
          displayMode: 'text'
        },
        {
          id: 'contact',
          label: 'Contact Us',
          href: '/support/contact',
          displayMode: 'text'
        }
      ]
    },
    {
      id: 'account',
      label: 'Account',
      icon: <FiUser />,
      displayMode: 'icon',
      href: '/account'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <FiSettings />,
      displayMode: 'icon',
      href: '/settings'
    }
  ]
};

NavbarWithNestedItems.parameters = {
  docs: {
    description: {
      story: `
This example demonstrates:
- Primary level items shown horizontally (desktop view)
- Automatic wrapping of primary items when space is limited
- Hover-triggered dropdown menus (desktop view)
- Right-side expansion for nested submenus (desktop view)
- Accordion-style expansion (mobile view)
- Mixed display modes (icon-only, text-only, and combined)
- Multiple levels of navigation (up to 4 levels deep)
- Theme switching functionality
- Responsive design (resize window to see different layouts)
      `
    }
  }
};
