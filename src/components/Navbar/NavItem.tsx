import React from 'react';
import { NavItemProps } from './types';
import { useTheme } from './ThemeContext';
import styles from './styles.module.scss';
import {
  handleKeyDown, handleClick, handleMouseEnter, handleMouseLeave, renderChevron, renderContent
} from './util';

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
  const hasSubItems = !!(item.subItems && item.subItems.length > 0);
  const isPrimaryLevel = level === 0;
  const isExpanded = expandedItems.get(level) === item.id;

  const itemStyle = {
    '--item-text-color': contentColorOverride || textColor,
    '--item-bg-color': backgroundColorOverride || backgroundColor,
    '--item-font': fontOverride || font,
  } as React.CSSProperties;

  const chevron = renderChevron(hasSubItems, isMobile, isExpanded, isPrimaryLevel);
  const content = () => renderContent(item, hasSubItems, () => chevron);

  return (
    <div
      className={`${styles.navItemWrapper} ${level > 0 ? styles.nested : ''}`}
      onMouseEnter={handleMouseEnter(isMobile, hasSubItems, isExpanded, onExpand, item.id, level)}
      onMouseLeave={handleMouseLeave(isMobile, hasSubItems, isExpanded, onExpand, item.id, level)}
      style={itemStyle}
    >
      {hasSubItems ? (
        <div
          className={`${styles.navItem} ${styles.hasSubmenu}`}
          onClick={handleClick(hasSubItems, isMobile, onExpand, item.id, level)}
          onKeyDown={handleKeyDown(hasSubItems, onExpand, item.id, level)}
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