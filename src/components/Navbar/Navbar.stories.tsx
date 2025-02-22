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
import { NavbarProps, Theme, FontFamily } from './types';
import { ThemeContext } from './ThemeContext';

const colors = {
  light: {
    background: '#ffffff',
    text: '#333333',
  },
  dark: {
    background: '#1a1a1a',
    text: '#ffffff',
  },
};

const ThemeSwitcher: React.FC<{ theme: Theme; onToggle: () => void }> = ({ theme, onToggle }) => (
  <button
    style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      padding: '0.5rem',
      background: theme === 'light' ? colors.light.background : colors.dark.background,
      color: theme === 'light' ? colors.light.text : colors.dark.text,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    }}
    onClick={onToggle}
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
      textColor: theme === 'light' ? colors.light.text : colors.dark.text,
      backgroundColor: theme === 'light' ? colors.light.background : colors.dark.background,
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
A responsive navigation bar that's consisted of \`NavItem[]\`. It features:
- Theme switching support through theme context provider
- Horizontal menu for desktop view
- Hover and keyboard-triggered dropdowns on desktop
- Accordion-style expansion on mobile
- Multiple levels of nested navigation
- Mixed display modes (icon, text, or both)
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
    source: {
      code: `
import { Navbar, ThemeContext } from '@your-org/navbar';
import { FiGrid, FiHome, /* ... other icons */ } from 'react-icons/fi';

const mockThemeState = {
  theme: 'light',
  font: 'Arial',
  textColor: '#333333',
  backgroundColor: '#ffffff',
  hoverBackgroundColor: 'rgba(0, 0, 0, 0.05)'
}

function App() {
return (
  <ThemeContext.Provider 
    value={mockThemeState}
  >
    <Navbar 
      brand={{
        logo: <FiGrid />,
        name: 'TechMart',
        href: '/'
      }}
      items={[
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
            // ... other items
          ]
        },
        // ... other items
      ]}
    />
  </ThemeContext.Provider>
);
}`,
      language: 'tsx',
      type: 'auto',
    }
  }
}
