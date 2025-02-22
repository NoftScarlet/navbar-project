import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavbarProps } from './types';
import { NavItem } from './NavItem';
import { useTheme } from './ThemeContext';
import styles from './styles.module.scss';

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Map<number, string>>(new Map());
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, font } = useTheme();

  const checkMobileView = useCallback(() => {
    const isMobileView = window.innerWidth <= 768;
    setIsMobile(window.innerWidth <= 768);
    if (isMobileView !== isMobile) {
      setExpandedItems(new Map());
      setIsOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, [checkMobileView]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isMobile && navRef.current && !navRef.current.contains(event.target as Node)) {
        setExpandedItems(new Map());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const handleExpandItem = (itemId: string, level: number) => {
    setExpandedItems(prev => {
      const newMap = new Map(prev);

      if (prev.get(level) === itemId) {
        const levelsToRemove = Array.from(prev.keys())
          .filter(key => key >= level);
        levelsToRemove.forEach(key => newMap.delete(key));
      } else {
        newMap.set(level, itemId);
      }

      return newMap;
    });
  };

  const handleNavClose = () => {
    setIsOpen(false);
    setExpandedItems(new Map());
  };

  return (
    <nav
      className={styles.navbar}
      role="navigation"
      aria-label="Main navigation"
      data-theme={theme}
      style={{ '--nav-font-family': font } as React.CSSProperties}
    >
      <div className={styles.brand}>
        <a href={brand.href} className={styles.brandLink}>
          {brand.logo}
          <span className={styles.brandName}>{brand.name}</span>
        </a>

        {isMobile && (
          <button
            className={styles.menuToggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        )}
      </div>

      <div
        ref={navRef}
        className={`${styles.navItems} ${isMobile ? styles.mobile : ''} ${isOpen ? styles.open : ''
          }`}
        role="menubar"
        aria-label="Main menu"
      >
        {items.map(item => (
          <NavItem
            key={item.id}
            item={item}
            isMobile={isMobile}
            expandedItems={expandedItems}
            onExpand={handleExpandItem}
            onNavClose={handleNavClose}
            {...(item.contentColorOverride ? { contentColorOverride: item.contentColorOverride } : {})}
            {...(item.backgroundColorOverride ? { backgroundColorOverride: item.backgroundColorOverride } : {})}
            {...(item.fontOverride ? { fontOverride: item.fontOverride } : {})}
          />
        ))}
      </div>
    </nav>
  );
};