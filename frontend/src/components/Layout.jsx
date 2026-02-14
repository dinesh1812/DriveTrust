import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, MapPin, Settings as SettingsIcon } from 'lucide-react';
import { colors } from '../utils';

const Layout = ({ children }) => {
  const location = useLocation();

  const styles = {
    // This wrapper now spans the FULL browser width
    wrapper: {
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: colors.background,
      display: 'flex',
      flexDirection: 'column'
    },
    // Top Nav spans edge-to-edge
    header: {
      width: '100%',
      height: '70px',
      backgroundColor: colors.surface,
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5%', // Responsive padding
      position: 'fixed',
      top: 0,
      zIndex: 1000
    },
    main: {
      marginTop: '70px', // Offset for fixed header
      width: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center' // Keeps the content "chunk" centered but the page full width
    },
    navItem: (isActive) => ({
      color: isActive ? colors.primary : colors.textLight,
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '8px',
      backgroundColor: isActive ? '#EFF6FF' : 'transparent',
      transition: 'all 0.2s ease'
    })
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div style={{ fontSize: '22px', fontWeight: '900', color: colors.primary, letterSpacing: '-1px' }}>
          Drive<span style={{ color: colors.textMain }}>Trust</span>
        </div>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <Link to="/home" style={styles.navItem(location.pathname === '/home')}>
            <Truck size={18} /> Home
          </Link>
          <Link to="/trips" style={styles.navItem(location.pathname === '/trips')}>
            <MapPin size={18} /> Trips
          </Link>
          <Link to="/settings" style={styles.navItem(location.pathname === '/settings')}>
            <SettingsIcon size={18} /> Settings
          </Link>
        </nav>
      </header>

      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;