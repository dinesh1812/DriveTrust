import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();

  // Professional Design Tokens
  const styles = {
    container: {
      padding: '60px 40px',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: '450px',
      margin: '0 auto',
      backgroundColor: '#fff'
    },
    logo: {
      fontSize: '32px',
      fontWeight: '900',
      letterSpacing: '-1.5px',
      textTransform: 'uppercase',
      margin: 0
    },
    subtitle: {
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      color: '#888',
      marginTop: '8px',
      fontWeight: '600'
    },
    form: { marginTop: '60px' },
    inputGroup: { marginBottom: '32px' },
    label: {
      display: 'block',
      fontSize: '10px',
      fontWeight: '800',
      textTransform: 'uppercase',
      marginBottom: '8px',
      color: '#000'
    },
    input: {
      width: '100%',
      border: 'none',
      borderBottom: '1px solid #e0e0e0',
      padding: '12px 0',
      fontSize: '14px',
      outline: 'none',
      backgroundColor: 'transparent',
      transition: 'border-color 0.2s ease'
    },
    button: {
      width: '100%',
      backgroundColor: '#000',
      color: '#fff',
      padding: '20px',
      fontSize: '11px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      marginTop: '24px',
      cursor: 'pointer',
      border: 'none',
      transition: 'opacity 0.2s ease'
    },
    footer: {
      marginTop: '48px',
      textAlign: 'center',
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      color: '#888'
    },
    link: {
      color: '#000',
      fontWeight: '700',
      marginLeft: '8px',
      textDecoration: 'none',
      borderBottom: '1px solid #000'
    }
  };

  return (
    <motion.div 
      style={styles.container}
      initial={{ opacity: 0, y: 5 }} 
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <h1 style={styles.logo}>Fleet System</h1>
        <p style={styles.subtitle}>Autonomous Logistics Portal</p>
      </div>

      <form style={styles.form} onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Identifier</label>
          <input 
            type="email" 
            placeholder="operator@system.com" 
            style={styles.input} 
            onFocus={(e) => e.target.style.borderColor = '#000'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            required 
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Access Key</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            style={styles.input} 
            onFocus={(e) => e.target.style.borderColor = '#000'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            required 
          />
        </div>

        <button 
          type="submit" 
          style={styles.button}
          onMouseOver={(e) => e.target.style.opacity = '0.8'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          Authenticate
        </button>
      </form>

      <div style={styles.footer}>
        <span>New Node?</span>
        <Link to="/signup" style={styles.link}>Register</Link>
      </div>
    </motion.div>
  );
};

export default Login;