import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useWindowWidth, colors } from '../utils';
import api from '../services/api'; // <-- IMPORT OUR MESSENGER

const Signup = () => {
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;
  const [hover, setHover] = useState(false);
  
  // Form State
  const [selectedRole, setSelectedRole] = useState('CUSTOMER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // 1. Send the data to Spring Boot
      const payload = {
        name: name,
        email: email,
        password: password,
        role: selectedRole
      };
      
      const response = await api.post('/users/signup', payload);
      const newUser = response.data;

      // 2. Save the real DB ID to local storage
      localStorage.setItem('userRole', newUser.role);
      localStorage.setItem('userId', newUser.id); 
      
      // 3. Redirect to the correct dashboard
      if (newUser.role === 'CUSTOMER') navigate('/customer');
      else navigate('/driver');
      
    } catch (error) {
      alert("Registration failed: " + (error.response?.data?.message || "Email might already be in use."));
    }
  };

  const styles = {
    // ... ALL YOUR EXISTING STYLES REMAIN EXACTLY THE SAME
    container: { display: 'flex', height: '100vh', backgroundColor: colors.surface, fontFamily: "'Inter', sans-serif" },
    leftPanel: { flex: 1, backgroundColor: colors.primaryDark, display: isMobile ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', padding: '40px', position: 'relative' },
    rightPanel: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px', backgroundColor: colors.background },
    formBox: { width: '100%', maxWidth: '450px', backgroundColor: colors.surface, padding: '40px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: `1px solid ${colors.border}` },
    title: { fontSize: '28px', fontWeight: '800', color: colors.textMain, marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: colors.secondary, marginBottom: '24px' },
    roleToggleContainer: { display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '8px', padding: '4px', marginBottom: '24px' },
    roleBtn: (isActive) => ({ flex: 1, padding: '10px', textAlign: 'center', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', border: 'none', backgroundColor: isActive ? 'white' : 'transparent', color: isActive ? colors.primary : colors.secondary, boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s ease' }),
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', fontSize: '12px', fontWeight: '600', color: colors.textMain, marginBottom: '6px' },
    input: { width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '14px', outline: 'none', backgroundColor: '#F8FAFC', transition: 'border-color 0.2s' },
    button: { width: '100%', padding: '16px', backgroundColor: hover ? colors.primaryDark : colors.primary, color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '12px', transition: 'background-color 0.2s', fontSize: '14px' },
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
          {selectedRole === 'CUSTOMER' 
            ? "Create your corporate profile to access real-time tracking, automated billing, and our premium fleet."
            : "Register as a carrier to find premium loads, guarantee secure escrow payouts, and manage your fleet."}
        </p>
      </div>

      {/* Right Form Panel */}
      <div style={styles.rightPanel}>
        <motion.div style={styles.formBox} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 style={styles.title}>New Registration</h2>
          <p style={styles.subtitle}>Enter your details to verify your account.</p>

          <div style={styles.roleToggleContainer}>
            <button type="button" style={styles.roleBtn(selectedRole === 'CUSTOMER')} onClick={() => setSelectedRole('CUSTOMER')}>I am a Customer</button>
            <button type="button" style={styles.roleBtn(selectedRole === 'DRIVER')} onClick={() => setSelectedRole('DRIVER')}>I am a Driver</button>
          </div>

          <form onSubmit={handleSignup}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>{selectedRole === 'CUSTOMER' ? 'Corporate Name' : 'Full Name / Transport Company'}</label>
              <input type="text" style={styles.input} required value={name} onChange={e => setName(e.target.value)} placeholder={selectedRole === 'CUSTOMER' ? "e.g. Apex Logistics Ltd." : "e.g. Vikram Freight"} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input type="email" style={styles.input} required value={email} onChange={e => setEmail(e.target.value)} placeholder={selectedRole === 'CUSTOMER' ? "admin@apexlogistics.com" : "contact@vikramfreight.com"} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input type="password" style={styles.input} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            </div>

            <button type="submit" style={styles.button} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
              Create Account
            </button>
          </form>

          <div style={styles.footer}>
            Already have an ID? <Link to="/" style={styles.link}>Login here</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;