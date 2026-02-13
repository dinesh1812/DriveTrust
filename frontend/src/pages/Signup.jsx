import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
  const navigate = useNavigate();

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
    title: {
      fontSize: '24px',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '-1px',
      marginBottom: '8px'
    },
    form: { marginTop: '40px' },
    inputGroup: { marginBottom: '24px' },
    label: {
      display: 'block',
      fontSize: '9px',
      fontWeight: '700',
      textTransform: 'uppercase',
      color: '#888',
      marginBottom: '6px'
    },
    input: {
      width: '100%',
      border: '1px solid #f0f0f0',
      backgroundColor: '#f9f9f9',
      padding: '14px',
      fontSize: '13px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      backgroundColor: '#000',
      color: '#fff',
      padding: '20px',
      fontSize: '11px',
      fontWeight: '700',
      textTransform: 'uppercase',
      marginTop: '20px',
      cursor: 'pointer',
      border: 'none'
    },
    backLink: {
      marginTop: '32px',
      textAlign: 'center',
      fontSize: '10px',
      textTransform: 'uppercase',
      color: '#888',
      textDecoration: 'none',
      display: 'block',
      fontWeight: '600'
    }
  };

  return (
    <motion.div 
      style={styles.container}
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }}
    >
      <h1 style={styles.title}>Create Entity.</h1>
      <p style={{fontSize: '11px', color: '#888', textTransform: 'uppercase'}}>Client Registration</p>
      
      <form style={styles.form} onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Corporate Name</label>
          <input type="text" style={styles.input} required />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Operational Email</label>
          <input type="email" style={styles.input} required />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Master Password</label>
          <input type="password" style={styles.input} required />
        </div>
        <button type="submit" style={styles.button}>Confirm Profile</button>
      </form>

      <Link to="/" style={styles.backLink}>← Return to Login</Link>
    </motion.div>
  );
};

export default Signup;