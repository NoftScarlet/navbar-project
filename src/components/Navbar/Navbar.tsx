import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavbarProps } from './navbar.types';
import { NavItem } from './NavItem';
import { useTheme } from './ThemeContext';
import styles from './styles.module.scss';

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, font } = useTheme();

  const checkMobileView = useCallback(() => {
    const isMobileView = window.innerWidth <= 768;
    setIsMobile(window.innerWidth <= 768);
    if (isMobileView !== isMobile) {
      setExpandedItems(new Set());
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
        setExpandedItems(new Set());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const handleExpandItem = (itemId: string, level: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);

      if (newSet.has(itemId)) {
        const itemsToRemove = Array.from(newSet).filter(id =>
          id === itemId || id.startsWith(`${itemId}-`)
        );
        itemsToRemove.forEach(id => newSet.delete(id));
      } else {
        if (!isMobile && level === 0) {
          Array.from(newSet).forEach(id => {
            if (!id.includes('-')) {
              newSet.delete(id);
            }
          });
        }
        newSet.add(itemId);
      }

      return newSet;
    });
  };

  const handleNavClose = () => {
    setIsOpen(false);
    setExpandedItems(new Set());
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
            onExpand={handleExpandItem}
            expandedItems={expandedItems}
            onNavClose={handleNavClose}
            {...(item.textColorOverride ? { textColorOverride: item.textColorOverride } : {})}
            {...(item.backgroundColorOverride ? { backgroundColorOverride: item.backgroundColorOverride } : {})}
            {...(item.fontOverride ? { fontOverride: item.fontOverride } : {})}
          />
        ))}
      </div>
    </nav>
  );
};