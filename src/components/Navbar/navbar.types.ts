import { ReactNode } from 'react';

export type Theme = 'light' | 'dark';
export type FontFamily = 'Arial' | 'Helvetica' | 'Times New Roman' | 'Georgia' | 'Verdana';

export interface ThemeConfig {
  theme: Theme;
  font: FontFamily;
  textColor: string;
  backgroundColor: string;
  toggleTheme?: () => void;
}

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  displayMode?: 'text' | 'icon' | 'mixed';
  subItems?: NavItem[];
  textColorOverride?: string;
  backgroundColorOverride?: string;
  fontOverride?: FontFamily;
}

export interface NavItemProps {
  item: NavItem;
  level?: number;
  isMobile: boolean;
  onExpand: (id: string, level: number) => void;
  expandedItems: Set<string>;
  onNavClose: () => void;
  textColorOverride?: string;
  backgroundColorOverride?: string;
  fontOverride?: FontFamily;
}

export interface NavbarProps {
  brand: {
    logo: ReactNode;
    name: string;
    href: string;
  };
  items: NavItem[];
}