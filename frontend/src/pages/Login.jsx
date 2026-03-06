import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';
import { useWindowWidth, colors } from '../utils';
import api from '../services/api'; // <-- IMPORT OUR MESSENGER

const Login = () => {
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;
  const [hover, setHover] = useState(false);
  
  // Form State
  const [selectedRole, setSelectedRole] = useState('CUSTOMER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: email,
        password: password,
        role: selectedRole
      };
      
      const response = await api.post('/users/login', payload);
      const user = response.data;

      // Save real DB info to local storage
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userId', user.id); 
      
      // Redirect to the correct dashboard
      if (user.role === 'CUSTOMER') navigate('/customer');
      else navigate('/driver');
      
    } catch (error) {
      alert("Login Failed: Please check your credentials and role.");
    }
  };

  const styles = {
    // ... ALL STYLES REMAIN EXACTLY THE SAME
    container: { display: 'flex', height: '100vh', backgroundColor: colors.surface, fontFamily: "'Inter', sans-serif" },
    leftPanel: { flex: 1, backgroundColor: '#1E293B', display: isMobile ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', padding: '40px', position: 'relative', overflow: 'hidden' },
    rightPanel: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px', backgroundColor: colors.background },
    formBox: { width: '100%', maxWidth: '400px', backgroundColor: colors.surface, padding: '40px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: `1px solid ${colors.border}` },
    title: { fontSize: '24px', fontWeight: 'bold', color: colors.textMain, marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: colors.secondary, marginBottom: '24px' },
    roleToggleContainer: { display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '8px', padding: '4px', marginBottom: '24px' },
    roleBtn: (isActive) => ({ flex: 1, padding: '10px', textAlign: 'center', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', border: 'none', backgroundColor: isActive ? 'white' : 'transparent', color: isActive ? colors.primary : colors.secondary, boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s ease' }),
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', fontSize: '12px', fontWeight: '600', color: colors.textMain, marginBottom: '6px' },
    input: { width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '14px', outline: 'none', backgroundColor: '#F8FAFC', transition: 'border-color 0.2s' },
    button: { width: '100%', padding: '14px', backgroundColor: hover ? colors.primaryDark : colors.primary, color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '10px', transition: 'background-color 0.2s', fontSize: '14px' },
    footerLink: { fontSize: '13px', color: colors.primary, textDecoration: 'none', fontWeight: '600', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Truck size={64} style={{ marginBottom: '20px', color: colors.primary }} />
        </motion.div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>DriveTrust</h1>
        <p style={{ opacity: 0.7, marginTop: '10px', textAlign: 'center', maxWidth: '300px', lineHeight: '1.5' }}>
          Enterprise Grade Logistics Management. Connect with top-rated drivers instantly.
        </p>
      </div>

      <div style={styles.rightPanel}>
        <motion.div style={styles.formBox} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Log in to manage your fleet operations.</p>
          
          <div style={styles.roleToggleContainer}>
            <button type="button" style={styles.roleBtn(selectedRole === 'CUSTOMER')} onClick={() => setSelectedRole('CUSTOMER')}>I am a Customer</button>
            <button type="button" style={styles.roleBtn(selectedRole === 'DRIVER')} onClick={() => setSelectedRole('DRIVER')}>I am a Driver</button>
          </div>

          <form onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input type="email" style={styles.input} required value={email} onChange={e => setEmail(e.target.value)} placeholder={selectedRole === 'CUSTOMER' ? "admin@company.com" : "driver@trucking.com"} />
            </div>
            
            <div style={styles.inputGroup}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ ...styles.label, marginBottom: 0 }}>Password</label>
                <Link to="#" style={{ ...styles.footerLink, fontSize: '11px' }}>Forgot Password?</Link>
              </div>
              <input type="password" style={styles.input} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            
            <button type="submit" style={styles.button} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
              Sign In as {selectedRole === 'CUSTOMER' ? 'Customer' : 'Driver'}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', borderTop: `1px solid ${colors.border}`, paddingTop: '20px' }}>
            <p style={{ fontSize: '13px', color: colors.secondary }}>
              New to the platform? <Link to="/signup" style={{ ...styles.footerLink, marginLeft: '5px' }}>Create an account</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;