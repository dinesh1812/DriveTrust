import React from 'react';
import { User, Shield, Bell, CreditCard, LogOut, ChevronRight, Mail } from 'lucide-react';
import { useWindowWidth, colors } from '../utils';

const Settings = () => {
  const width = useWindowWidth();
  const isMobile = width < 768;

  const styles = {
    page: { padding: isMobile ? '20px' : '40px 5%', width: '100%', maxWidth: '1400px' },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
      gap: '30px',
      marginTop: '30px'
    },
    sidebarCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      textAlign: 'center',
      height: 'fit-content'
    },
    menuContainer: {
      backgroundColor: 'white',
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      overflow: 'hidden'
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px',
      borderBottom: `1px solid ${colors.border}`,
      cursor: 'pointer',
      transition: 'background 0.2s'
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: '800' }}>Account Settings</h1>
      
      <div style={styles.grid}>
        {/* Profile Summary */}
        <div style={styles.sidebarCard}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: colors.primary, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '24px', fontWeight: 'bold' }}>
            AD
          </div>
          <h3 style={{ fontWeight: 'bold' }}>Admin User</h3>
          <p style={{ fontSize: '13px', color: colors.secondary }}>Apex Logistics</p>
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: colors.background, borderRadius: '8px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={14}/> admin@apex.com
          </div>
        </div>

        {/* Settings Menu */}
        <div>
          <div style={styles.menuContainer}>
            {[
              { icon: <User size={18}/>, title: "Personal Information", sub: "Manage your name and contact details" },
              { icon: <Shield size={18}/>, title: "Security", sub: "Update password and 2FA" },
              { icon: <Bell size={18}/>, title: "Notifications", sub: "Control email and SMS alerts" },
              { icon: <CreditCard size={18}/>, title: "Billing", sub: "Payment history and methods" }
            ].map((item, i) => (
              <div 
                key={i} 
                style={styles.menuItem}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ color: colors.primary }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700' }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: colors.secondary }}>{item.sub}</div>
                  </div>
                </div>
                <ChevronRight size={16} color={colors.border} />
              </div>
            ))}
          </div>
          
          <button style={{ marginTop: '20px', color: colors.danger, fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px' }}>
            <LogOut size={16}/> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;