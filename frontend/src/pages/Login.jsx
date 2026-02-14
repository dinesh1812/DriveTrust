import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';
import { useWindowWidth, colors } from '../utils';

const Login = () => {
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;
  const [hover, setHover] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: colors.surface,
      fontFamily: "'Inter', sans-serif",
    },
    leftPanel: {
      flex: 1,
      backgroundColor: colors.primaryDark,
      display: isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: '40px',
      position: 'relative',
      overflow: 'hidden'
    },
    rightPanel: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      backgroundColor: colors.background
    },
    formBox: {
      width: '100%',
      maxWidth: '400px',
      backgroundColor: colors.surface,
      padding: '40px',
      borderRadius: '16px', // Slightly rounder for the new look
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: `1px solid ${colors.border}`
    },
    title: { fontSize: '24px', fontWeight: 'bold', color: colors.textMain, marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: colors.secondary, marginBottom: '32px' },
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', fontSize: '12px', fontWeight: '600', color: colors.textMain, marginBottom: '6px' },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: `1px solid ${colors.border}`,
      fontSize: '14px',
      outline: 'none',
      backgroundColor: '#F8FAFC',
      transition: 'border-color 0.2s'
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: hover ? colors.primaryDark : colors.primary,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.2s',
      fontSize: '14px'
    },
    footerLink: {
      fontSize: '13px',
      color: colors.primary,
      textDecoration: 'none',
      fontWeight: '600',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Branding Panel */}
      <div style={styles.leftPanel}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Truck size={64} style={{ marginBottom: '20px', color: 'white' }} />
        </motion.div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>DriveTrust</h1>
        <p style={{ opacity: 0.7, marginTop: '10px', textAlign: 'center', maxWidth: '300px', lineHeight: '1.5' }}>
          Enterprise Grade Logistics Management. Connect with top-rated drivers instantly.
        </p>
      </div>

      {/* Right Form Panel */}
      <div style={styles.rightPanel}>
        <motion.div 
          style={styles.formBox}
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Log in to manage your fleet operations.</p>
          
          <form onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input type="email" style={styles.input} placeholder="admin@company.com" required />
            </div>
            
            <div style={styles.inputGroup}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ ...styles.label, marginBottom: 0 }}>Password</label>
                <Link to="#" style={{ ...styles.footerLink, fontSize: '11px' }}>Forgot Password?</Link>
              </div>
              <input type="password" style={styles.input} placeholder="••••••••" required />
            </div>
            
            <button 
              type="submit"
              style={styles.button}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Sign In to Dashboard
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', borderTop: `1px solid ${colors.border}`, paddingTop: '20px' }}>
            <p style={{ fontSize: '13px', color: colors.secondary }}>
              New to the platform? 
              <Link to="/signup" style={{ ...styles.footerLink, marginLeft: '5px' }}>
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;