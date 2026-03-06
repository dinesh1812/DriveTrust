import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Truck, MapPin, Settings as SettingsIcon, Package, LogOut } from 'lucide-react';
import { colors, useWindowWidth } from '../utils';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;

  // Retrieve the user's role from local storage
  const userRole = localStorage.getItem('userRole'); 

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const styles = {
    wrapper: { width: '100vw', minHeight: '100vh', backgroundColor: colors.background, display: 'flex', flexDirection: 'column' },
    header: {
      width: '100%', height: '70px', backgroundColor: colors.surface, borderBottom: `1px solid ${colors.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 20px' : '0 5%',
      position: 'fixed', top: 0, zIndex: 1000
    },
    main: { marginTop: '70px', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' },
    navItem: (isActive) => ({
      color: isActive ? colors.primary : colors.textLight, textDecoration: 'none', fontWeight: '600',
      fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
      borderRadius: '8px', backgroundColor: isActive ? '#EFF6FF' : 'transparent', transition: 'all 0.2s ease'
    })
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div style={{ fontSize: '22px', fontWeight: '900', color: colors.primary, letterSpacing: '-1px' }}>
          DriveTrust<span style={{ color: colors.textMain }}>.io</span>
        </div>
        <nav style={{ display: 'flex', gap: isMobile ? '5px' : '15px' }}>
          
          {/* CUSTOMER ONLY LINK */}
          {userRole === 'CUSTOMER' && (
            <Link to="/customer" style={styles.navItem(location.pathname === '/customer')}>
              <Package size={18} /> {isMobile ? '' : 'My Loads'}
            </Link>
          )}

          {/* DRIVER ONLY LINK */}
          {userRole === 'DRIVER' && (
            <Link to="/driver" style={styles.navItem(location.pathname === '/driver')}>
              <Truck size={18} /> {isMobile ? '' : 'Find Loads'}
            </Link>
          )}

          {/* SHARED LINKS */}
          <Link to="/trips" style={styles.navItem(location.pathname === '/trips')}>
            <MapPin size={18} /> {isMobile ? '' : 'Trips'}
          </Link>
          <Link to="/settings" style={styles.navItem(location.pathname === '/settings')}>
            <SettingsIcon size={18} /> {isMobile ? '' : 'Settings'}
          </Link>
          
          <button onClick={handleLogout} style={{ ...styles.navItem(false), color: colors.danger, border: 'none', background: 'none', cursor: 'pointer' }}>
            <LogOut size={18} /> {isMobile ? '' : 'Exit'}
          </button>
        </nav>
      </header>
      <main style={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;