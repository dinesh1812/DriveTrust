import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck } from 'lucide-react';
import { useWindowWidth, colors } from '../utils';

const Signup = () => {
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
      position: 'relative'
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
      maxWidth: '450px',
      backgroundColor: colors.surface,
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: `1px solid ${colors.border}`
    },
    title: { fontSize: '28px', fontWeight: '800', color: colors.textMain, marginBottom: '8px' },
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
      padding: '16px',
      backgroundColor: hover ? colors.primaryDark : colors.primary,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '12px',
      transition: 'background-color 0.2s',
      fontSize: '14px'
    },
    footer: { marginTop: '24px', textAlign: 'center', fontSize: '13px', color: colors.secondary },
    link: { color: colors.primary, fontWeight: '600', textDecoration: 'none', marginLeft: '5px' }
  };

  return (
    <div style={styles.container}>
      {/* Left Branding Panel */}
      <div style={styles.leftPanel}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '50%', marginBottom: '20px' }}>
            <ShieldCheck size={48} color="white" />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Join the Network.</h1>
        <p style={{ opacity: 0.8, marginTop: '12px', textAlign: 'center', maxWidth: '400px', lineHeight: '1.6' }}>
          Create your corporate profile to access real-time tracking, automated billing, and our premium fleet.
        </p>
      </div>

      {/* Right Form Panel */}
      <div style={styles.rightPanel}>
        <motion.div 
          style={styles.formBox}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        >
          <h2 style={styles.title}>New Entity Registration</h2>
          <p style={styles.subtitle}>Enter your company details to verify your account.</p>

          <form onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Corporate Name</label>
              <input type="text" style={styles.input} placeholder="e.g. Apex Logistics Ltd." required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Operational Email</label>
              <input type="email" style={styles.input} placeholder="admin@apexlogistics.com" required />
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input type="password" style={styles.input} placeholder="••••••••" required />
                </div>
                <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input type="password" style={styles.input} placeholder="••••••••" required />
                </div>
            </div>

            <button 
              type="submit" 
              style={styles.button}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Create Account
            </button>
          </form>

          <div style={styles.footer}>
            Already have an ID? 
            <Link to="/" style={styles.link}>Login here</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;