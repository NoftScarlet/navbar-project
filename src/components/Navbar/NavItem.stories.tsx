import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { FiHome } from 'react-icons/fi';
import { NavItem } from './NavItem';
import { NavItemProps, Theme, FontFamily } from './navbar.types';
import { ThemeContext } from './ThemeContext';

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
      <div style={{
        padding: '2rem',
        backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
        color: theme === 'light' ? '#333333' : '#ffffff',
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default {
  title: 'Components/NavItem',
  component: NavItem,
  decorators: [(Story) => (
    <StoryThemeProvider>
      {Story()}
    </StoryThemeProvider>
  )],
  parameters: {
    docs: {
      description: {
        component: `
A navigation item component that supports:
- Different display modes (icon, text, mixed)
- Nested submenus
- Mobile and desktop layouts
- Hover and click interactions
- Keyboard navigation
- Theme adaptation
- Custom styling overrides
        `
      }
    }
  },
  argTypes: {
    item: {
      description: 'Navigation item configuration',
      table: {
        category: 'Content'
      }
    },
    textColorOverride: {
      description: 'Override default text color',
      control: 'color',
      table: {
        category: 'Styling'
      }
    },
    backgroundColorOverride: {
      description: 'Override default background color',
      control: 'color',
      table: {
        category: 'Styling'
      }
    },
    fontOverride: {
      description: 'Override default font family',
      control: {
        type: 'select',
        options: ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana']
      },
      table: {
        category: 'Styling'
      }
    },
    level: {
      table: {
        disable: true
      }
    },
    isMobile: {
      table: {
        disable: true
      }
    },
    onExpand: {
      table: {
        disable: true
      }
    },
    expandedItems: {
      table: {
        disable: true
      }
    },
    onNavClose: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: StoryFn<NavItemProps> = (args) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleExpand = (id: string, level: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div style={{ width: args.isMobile ? '100%' : '200px' }}>
      <NavItem
        {...args}
        expandedItems={expandedItems}
        onExpand={handleExpand}
        onNavClose={() => console.log('nav closed')}
      />
    </div>
  );
};

export const StandardItem = Template.bind({});
StandardItem.args = {
  item: {
    id: 'home',
    label: 'Home',
    icon: <FiHome />,
    href: '/',
    displayMode: 'mixed'
  },
  isMobile: false
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  item: {
    id: 'home',
    label: 'Home',
    icon: <FiHome />,
    href: '/',
    displayMode: 'icon'
  },
  isMobile: false
};

export const TextOnly = Template.bind({});
TextOnly.args = {
  item: {
    id: 'home',
    label: 'Home',
    icon: <FiHome />,
    href: '/',
    displayMode: 'text'
  },
  isMobile: false
};
