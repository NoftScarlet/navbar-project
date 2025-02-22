import React from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { NavItem } from './types';
import styles from './styles.module.scss';

export const handleKeyDown = (
  hasSubItems: boolean,
  onExpand: (id: string, level: number) => void,
  itemId: string,
  level: number
) => (e: React.KeyboardEvent) => {
  if (hasSubItems) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onExpand(itemId, level);
    }
  }
};

export const handleClick = (
  hasSubItems: boolean,
  isMobile: boolean,
  onExpand: (id: string, level: number) => void,
  itemId: string,
  level: number
) => (e: React.MouseEvent) => {
  if (hasSubItems) {
    if (!isMobile) {
      return;
    }
    e.preventDefault();
    onExpand(itemId, level);
  }
};

export const handleMouseEnter = (
  isMobile: boolean,
  hasSubItems: boolean,
  isExpanded: boolean,
  onExpand: (id: string, level: number) => void,
  itemId: string,
  level: number
) => () => {
  if (!isMobile && hasSubItems && !isExpanded) {
    onExpand(itemId, level);
  }
};

export const handleMouseLeave = (
  isMobile: boolean,
  hasSubItems: boolean,
  isExpanded: boolean,
  onExpand: (id: string, level: number) => void,
  itemId: string,
  level: number
) => () => {
  if (!isMobile && hasSubItems && isExpanded) {
    onExpand(itemId, level);
  }
};

export const renderChevron = (
  hasSubItems: boolean,
  isMobile: boolean,
  isExpanded: boolean,
  isPrimaryLevel: boolean
) => {
  if (!hasSubItems) return null;

  if (isMobile) {
    return (
      <span className={`${styles.submenuIcon} ${isExpanded ? styles.expanded : ''}`}>
        <FiChevronDown />
      </span>
    );
  }
  return (
    <span className={styles.submenuIcon}>
      {isPrimaryLevel ? <FiChevronDown /> : <FiChevronRight />}
    </span>
  );
};

export const renderContent = (
  item: NavItem,
  hasSubItems: boolean,
  renderChevronFn: () => React.ReactNode
) => {
  switch (item.displayMode) {
    case 'icon':
      return (
        <>
          {item.icon}
          {hasSubItems && renderChevronFn()}
        </>
      );
    case 'text':
      return (
        <>
          {item.label}
          {hasSubItems && renderChevronFn()}
        </>
      );
    default:
      return (
        <>
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          <span className={styles.label}>{item.label}</span>
          {hasSubItems && renderChevronFn()}
        </>
      );
  }
};