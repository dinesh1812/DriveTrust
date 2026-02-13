import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, MapPin, Settings as SettingsIcon } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const styles = {
    wrapper: {
      maxWidth: '450px',
      margin: '0 auto',
      backgroundColor: '#fff',
      minHeight: '100vh',
      position: 'relative',
      borderLeft: '1px solid #f0f0f0',
      borderRight: '1px solid #f0f0f0'
    },
    nav: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      maxWidth: '450px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid #f0f0f0',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '16px 0',
      zIndex: 100
    },
    navItem: (isActive) => ({
      color: isActive ? '#000' : '#ccc',
      transition: 'color 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    })
  };

  return (
    <div style={styles.wrapper}>
      <main style={{ paddingBottom: '80px' }}>{children}</main>
      <nav style={styles.nav}>
        <Link to="/home" style={styles.navItem(location.pathname === '/home')}>
          <Truck size={22} />
        </Link>
        <Link to="/trips" style={styles.navItem(location.pathname === '/trips')}>
          <MapPin size={22} />
        </Link>
        <Link to="/settings" style={styles.navItem(location.pathname === '/settings')}>
          <SettingsIcon size={22} />
        </Link>
      </nav>
    </div>
  );
};

export default Layout;