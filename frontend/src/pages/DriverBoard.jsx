import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Package, Clock, ShieldCheck, X } from 'lucide-react';
import { colors, useWindowWidth } from '../utils';
import api from '../services/api';

const DriverBoard = () => {
  const width = useWindowWidth();
  const isMobile = width < 768;
  
  const [openPosts, setOpenPosts] = useState([]);
  const [biddingPost, setBiddingPost] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');

  // Simulate Driver Login (User ID 2)
  const driverId = 2;

  useEffect(() => {
    fetchOpenPosts();
  }, []);

  const fetchOpenPosts = async () => {
    try {
      const res = await api.get('/posts');
      // The backend filters this to only show 'OPEN' posts
      setOpenPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  const submitBid = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        postId: biddingPost.id,
        amount: parseFloat(bidAmount),
        message: bidMessage
      };
      await api.post('/bids', payload, { headers: { 'X-User-Id': driverId } });
      alert("Quotation submitted successfully!");
      setBiddingPost(null);
      setBidAmount('');
      setBidMessage('');
    } catch (err) {
      console.error("Failed to submit bid", err);
    }
  };

  const styles = {
    page: { width: '100%', backgroundColor: colors.background, minHeight: '100vh', paddingBottom: '80px', fontFamily: "'Inter', sans-serif" },
    header: { width: '100%', backgroundColor: colors.primaryDark, color: 'white', padding: isMobile ? '30px 20px' : '60px 5%' },
    content: { width: '100%', maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '20px' : '40px 5%' },
    grid: { display: 'grid', gridTemplateColumns: width > 1024 ? 'repeat(3, 1fr)' : width > 768 ? 'repeat(2, 1fr)' : '1fr', gap: '24px' },
    card: { backgroundColor: colors.surface, borderRadius: '16px', padding: '24px', border: `1px solid ${colors.border}`, boxShadow: '0 4px 10px rgba(0,0,0,0.03)', cursor: 'pointer' },
    input: { width: '100%', padding: '14px', borderRadius: '8px', border: `1px solid ${colors.border}`, marginBottom: '16px', fontSize: '14px', outline: 'none' },
    overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', backdropFilter: 'blur(4px)' },
    bottomSheet: { backgroundColor: colors.surface, width: '100%', maxWidth: '600px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '30px', margin: '0 auto' }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#60A5FA' }}>
            <ShieldCheck size={18} /> KYC Verified Driver Profile
          </div>
          <h1 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: '800' }}>Available Loads</h1>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>Browse real-time freight requirements and submit your quotes.</p>
        </div>
      </header>

      <div style={styles.content}>
        <div style={styles.grid}>
          {openPosts.map(post => (
            <motion.div 
              key={post.id} 
              style={styles.card}
              whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              onClick={() => setBiddingPost(post)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', color: colors.secondary, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14}/> Posted Today
                </span>
                <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', backgroundColor: '#F1F5F9', color: colors.textMain }}>
                  {post.requiredVehicle}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: colors.primary }}></div>
                  <div style={{ width: '2px', height: '24px', backgroundColor: colors.border, margin: '2px 0' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: colors.success }}></div>
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>{post.origin}</div>
                  <div style={{ fontSize: '16px', fontWeight: '800' }}>{post.destination}</div>
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.secondary, fontSize: '14px' }}>
                  <Package size={16} /> {post.estimatedWeightKg} KG
                </div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: colors.primary }}>Submit Quote ➔</div>
              </div>
            </motion.div>
          ))}
          {openPosts.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: colors.secondary }}>
              No loads currently available in your area. Check back later.
            </div>
          )}
        </div>
      </div>

      {/* Submit Quote Bottom Sheet */}
      <AnimatePresence>
        {biddingPost && (
          <div style={styles.overlay}>
            <motion.div 
              style={styles.bottomSheet} 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Submit Quotation</h2>
                <button onClick={() => setBiddingPost(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: `1px solid ${colors.border}` }}>
                <p style={{ fontSize: '12px', color: colors.secondary, fontWeight: '700', marginBottom: '4px' }}>ROUTE</p>
                <p style={{ fontWeight: '700' }}>{biddingPost.origin} to {biddingPost.destination}</p>
              </div>

              <form onSubmit={submitBid}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>Your Price (₹)</label>
                <input 
                  type="number" 
                  style={{ ...styles.input, fontSize: '20px', fontWeight: '700' }} 
                  required 
                  placeholder="e.g. 15000" 
                  value={bidAmount} 
                  onChange={e => setBidAmount(e.target.value)} 
                />
                
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>Message to Customer</label>
                <textarea 
                  style={{ ...styles.input, minHeight: '100px', resize: 'vertical' }} 
                  required 
                  placeholder="e.g. Can pick up tomorrow morning. Truck is ready." 
                  value={bidMessage} 
                  onChange={e => setBidMessage(e.target.value)} 
                />
                
                <button type="submit" style={{ width: '100%', padding: '16px', backgroundColor: colors.primary, color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
                  Send Quote to Customer
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DriverBoard;