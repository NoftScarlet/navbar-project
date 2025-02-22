import React from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { NavItemProps } from './types';
import { useTheme } from './ThemeContext';
import styles from './styles.module.scss';

export const NavItem: React.FC<NavItemProps> = ({
  item,
  level = 0,
  isMobile,
  onExpand,
  expandedItems,
  onNavClose,
  contentColorOverride,
  backgroundColorOverride,
  fontOverride
}) => {
  const { textColor, backgroundColor, font } = useTheme();
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isPrimaryLevel = level === 0;
  const isExpanded = expandedItems.get(level) === item.id;

  const itemStyle = {
    '--item-text-color': contentColorOverride || textColor,
    '--item-bg-color': backgroundColorOverride || backgroundColor,
    '--item-font': fontOverride || font,
  } as React.CSSProperties;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (hasSubItems) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onExpand(item.id, level);
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubItems) {
      if (!isMobile) {
        return;
      }
      e.preventDefault();
      onExpand(item.id, level);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile && hasSubItems && !isExpanded) {
      onExpand(item.id, level);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && hasSubItems && isExpanded) {
      onExpand(item.id, level);
    }
  };

  const renderChevron = () => {
    if (!hasSubItems) return null;

    if (isMobile) {
      return (
        <span className={`${styles.submenuIcon} ${isExpanded ? styles.expanded : ''}`}>
          <FiChevronDown />
        </span>
      );
    } else {
      return (
        <span className={styles.submenuIcon}>
          {isPrimaryLevel ? <FiChevronDown /> : <FiChevronRight />}
        </span>
      );
    }
  };

  const content = () => {
    switch (item.displayMode) {
      case 'icon':
        return (
          <>
            {item.icon}
            {hasSubItems && renderChevron()}
          </>
        );
      case 'text':
        return (
          <>
            {item.label}
            {hasSubItems && renderChevron()}
          </>
        );
      default:
        return (
          <>
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.label}>{item.label}</span>
            {hasSubItems && renderChevron()}
          </>
        );
    }
  };

  return (
    <div
      className={`${styles.navItemWrapper} ${level > 0 ? styles.nested : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={itemStyle}
    >
      {hasSubItems ? (
        <div
          className={`${styles.navItem} ${styles.hasSubmenu}`}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
          aria-haspopup="true"
        >
          {content()}
        </div>
      ) : (
        <div className={styles.navItem}>
          <a
            href={item.href}
            className={styles.navLink}
            onClick={onNavClose}
            tabIndex={0}
          >
            {content()}
          </a>
        </div>
      )}

      {hasSubItems && (
        <div
          className={`${styles.submenu} ${isExpanded ? styles.expanded : ''}`}
          role="menu"
          aria-label={`Submenu of ${item.label}`}
        >
          {item.subItems!.map(subItem => (
            <NavItem
              key={subItem.id}
              item={subItem}
              level={level + 1}
              isMobile={isMobile}
              onExpand={onExpand}
              expandedItems={expandedItems}
              onNavClose={onNavClose}
              {...(subItem.contentColorOverride ? { contentColorOverride: subItem.contentColorOverride } : {})}
              {...(subItem.backgroundColorOverride ? { backgroundColorOverride: subItem.backgroundColorOverride } : {})}
              {...(subItem.fontOverride ? { fontOverride: subItem.fontOverride } : {})}
            />
          ))}
        </div>
      )}
    </div>
  );
};