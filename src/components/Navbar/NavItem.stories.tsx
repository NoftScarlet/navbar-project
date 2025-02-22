import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { FiHome } from 'react-icons/fi';
import { NavItem } from './NavItem';
import { NavItemProps, Theme, FontFamily } from './types';
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
      },
      source: {
        code: `<NavItem
  contentColorOverride=""
  fontOverride=""
  backgroundColorOverride=""
  expandedItems={expandedItems}
  item={{
    displayMode: 'mixed',
    href: '#',
    icon: <FiHome />,
    id: 'home',
    label: 'Home'
  }}
  onExpand={() => {}}
  onNavClose={() => {}}
/>`}

    }
  },
  argTypes: {
    item: {
      description: 'Navigation item configuration',
      table: {
        category: 'Content'
      }
    },
    contentColorOverride: {
      description: 'Override theme content color',
      control: 'color',
      table: {
        defaultValue: { summary: 'undefined' },
        category: 'Styling'
      }
    },
    backgroundColorOverride: {
      description: 'Override theme background color',
      control: 'color',
      table: {
        defaultValue: { summary: 'undefined' },
        category: 'Styling'
      }
    },
    fontOverride: {
      description: 'Override theme font family',
      control: {
        options: ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana']
      },
      table: {
        defaultValue: { summary: 'undefined' },
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
  },
  args: {
    backgroundColorOverride: '#04a9b9',
    contentColorOverride: '#FFFFFF',
  }
} as Meta;

const Template: StoryFn<NavItemProps> = (args) => {
  const [expandedItems, setExpandedItems] = useState<Map<number, string>>(new Map());

  const handleExpand = (id: string, level: number) => {
    setExpandedItems(prev => {
      const newMap = new Map(prev);
      if (prev.get(level) === id) {
        const levelsToRemove = Array.from(prev.keys())
          .filter(key => key >= level);
        levelsToRemove.forEach(key => newMap.delete(key));
      } else {
        newMap.set(level, id);
      }

      return newMap;
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
    href: '#',
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
    href: '#',
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
    href: '#',
    displayMode: 'text'
  },
  isMobile: false
};
