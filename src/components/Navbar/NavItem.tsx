import React from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { NavItemProps } from './navbar.types';
import { useTheme } from './ThemeContext';
import styles from './styles.module.scss';

export const NavItem: React.FC<NavItemProps> = ({
  item,
  level = 0,
  isMobile,
  onExpand,
  expandedItems,
  onNavClose,
  textColorOverride,
  backgroundColorOverride,
  fontOverride
}) => {
  const { textColor, backgroundColor, font } = useTheme();
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isPrimaryLevel = level === 0;
  const isExpanded = expandedItems.has(item.id);

  const itemStyle = {
    '--item-text-color': textColorOverride || textColor,
    '--item-bg-color': backgroundColorOverride || backgroundColor,
    '--item-font': fontOverride || font,
  } as React.CSSProperties;

  const handleInteraction = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (hasSubItems) {
      if (!isMobile && e.type === 'click') {
        return;
      }

      if (
        isMobile ||
        (e.type === 'keydown' && (
          (e as React.KeyboardEvent).key === 'Enter' ||
          (e as React.KeyboardEvent).key === ' '
        ))
      ) {
        e.preventDefault();
        onExpand(item.id, level);
      }
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile && hasSubItems) {
      onExpand(item.id, level);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && hasSubItems) {
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
      <div
        className={`${styles.navItem} ${hasSubItems ? styles.hasSubmenu : ''}`}
        onClick={handleInteraction}
        onKeyDown={handleInteraction}
        tabIndex={0}
        role={hasSubItems ? 'button' : undefined}
        aria-expanded={hasSubItems ? isExpanded : undefined}
        aria-haspopup={hasSubItems ? 'true' : undefined}
      >
        {item.href && !hasSubItems ? (
          <a
            href={item.href}
            className={styles.navLink}
            onClick={onNavClose}
          >
            {content()}
          </a>
        ) : (
          content()
        )}
      </div>

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
              {...(subItem.textColorOverride ? { textColorOverride: subItem.textColorOverride } : {})}
              {...(subItem.backgroundColorOverride ? { backgroundColorOverride: subItem.backgroundColorOverride } : {})}
              {...(subItem.fontOverride ? { fontOverride: subItem.fontOverride } : {})}
            />
          ))}
        </div>
      )}
    </div>
  );
};