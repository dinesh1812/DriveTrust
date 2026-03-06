import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, Package, ShieldCheck, X, CheckCircle, Lock } from 'lucide-react';
import { colors, useWindowWidth } from '../utils';
import api from '../services/api';

const CustomerDashboard = () => {
  const width = useWindowWidth();
  const isMobile = width < 768;
  
  const [posts, setPosts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [bids, setBids] = useState([]);
  
  // New Post Form State
  const [newPost, setNewPost] = useState({ origin: '', destination: '', requiredVehicle: '', estimatedWeightKg: '' });

  // Simulate Customer Login (User ID 1)
  const customerId = 1;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // In a real app, you'd filter by customerId. For MVP, we fetch all open/booked posts.
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await api.post('/posts', newPost, { headers: { 'X-User-Id': customerId } });
      setIsCreating(false);
      setNewPost({ origin: '', destination: '', requiredVehicle: '', estimatedWeightKg: '' });
      fetchPosts();
    } catch (err) {
      console.error("Failed to create post", err);
    }
  };

  const viewBids = async (post) => {
    setSelectedPost(post);
    try {
      const res = await api.get(`/posts/${post.id}/bids`);
      setBids(res.data);
    } catch (err) {
      console.error("Failed to fetch bids", err);
    }
  };

  const acceptBidAndEscrow = async (bidId) => {
    try {
      await api.post(`/bids/${bidId}/accept`);
      alert("Payment Secured in Escrow. Driver is Booked!");
      setSelectedPost(null);
      fetchPosts();
    } catch (err) {
      console.error("Failed to accept bid", err);
    }
  };

  const styles = {
    page: { width: '100%', backgroundColor: colors.background, minHeight: '100vh', paddingBottom: '80px', fontFamily: "'Inter', sans-serif" },
    header: { width: '100%', backgroundColor: colors.surface, padding: isMobile ? '20px' : '30px 5%', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    content: { width: '100%', maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '20px' : '40px 5%' },
    btnPrimary: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: colors.primary, color: 'white', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer' },
    grid: { display: 'grid', gridTemplateColumns: width > 1024 ? 'repeat(3, 1fr)' : width > 768 ? 'repeat(2, 1fr)' : '1fr', gap: '24px', marginTop: '30px' },
    card: { backgroundColor: colors.surface, borderRadius: '12px', padding: '24px', border: `1px solid ${colors.border}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
    input: { width: '100%', padding: '14px', borderRadius: '8px', border: `1px solid ${colors.border}`, marginBottom: '16px', fontSize: '14px', outline: 'none' },
    overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' },
    modal: { backgroundColor: colors.surface, width: '100%', maxWidth: '500px', borderRadius: '16px', padding: '30px', maxHeight: '90vh', overflowY: 'auto' }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800' }}>My Shipments</h1>
          <p style={{ color: colors.secondary, fontSize: '14px' }}>Manage loads and review driver quotes.</p>
        </div>
        <button style={styles.btnPrimary} onClick={() => setIsCreating(true)}>
          <Plus size={18} /> Post New Load
        </button>
      </header>

      <div style={styles.content}>
        <div style={styles.grid}>
          {posts.map(post => (
            <div key={post.id} style={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', backgroundColor: post.status === 'OPEN' ? '#DBEAFE' : '#DCFCE7', color: post.status === 'OPEN' ? colors.primary : colors.success }}>
                  {post.status}
                </span>
                <span style={{ fontSize: '12px', color: colors.secondary }}>ID: #{post.id}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <MapPin size={16} color={colors.secondary} />
                <span style={{ fontWeight: '700' }}>{post.origin} → {post.destination}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.secondary, fontSize: '14px', marginBottom: '24px' }}>
                <Package size={16} />
                <span>{post.estimatedWeightKg} KG • {post.requiredVehicle}</span>
              </div>

              <button 
                onClick={() => viewBids(post)}
                style={{ width: '100%', padding: '12px', backgroundColor: colors.background, border: `1px solid ${colors.border}`, borderRadius: '8px', fontWeight: '600', cursor: 'pointer', color: colors.textMain }}
              >
                View Driver Bids
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isCreating && (
          <div style={styles.overlay}>
            <motion.div style={styles.modal} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Post a Load</h2>
                <button onClick={() => setIsCreating(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
              </div>
              <form onSubmit={handleCreatePost}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>Origin City</label>
                <input style={styles.input} required placeholder="e.g. Mumbai" value={newPost.origin} onChange={e => setNewPost({...newPost, origin: e.target.value})} />
                
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>Destination City</label>
                <input style={styles.input} required placeholder="e.g. Delhi" value={newPost.destination} onChange={e => setNewPost({...newPost, destination: e.target.value})} />
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>Vehicle Type</label>
                    <input style={styles.input} required placeholder="e.g. 20ft Container" value={newPost.requiredVehicle} onChange={e => setNewPost({...newPost, requiredVehicle: e.target.value})} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>Weight (KG)</label>
                    <input type="number" style={styles.input} required placeholder="5000" value={newPost.estimatedWeightKg} onChange={e => setNewPost({...newPost, estimatedWeightKg: e.target.value})} />
                  </div>
                </div>
                <button type="submit" style={{ ...styles.btnPrimary, width: '100%', justifyContent: 'center', marginTop: '16px' }}>Broadcast to Drivers</button>
              </form>
            </motion.div>
          </div>
        )}

        {/* View Bids Modal */}
        {selectedPost && (
          <div style={styles.overlay}>
            <motion.div style={{ ...styles.modal, maxWidth: '600px' }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Quotations Received</h2>
                <button onClick={() => setSelectedPost(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
              </div>

              {bids.length === 0 ? (
                <p style={{ color: colors.secondary, textAlign: 'center', padding: '40px 0' }}>No bids received yet. Waiting for drivers...</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {bids.map(bid => (
                    <div key={bid.id} style={{ border: `1px solid ${colors.border}`, padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ShieldCheck size={18} color={colors.success} />
                          <span style={{ fontWeight: '700' }}>Verified Driver #{bid.driverId}</span>
                        </div>
                        <span style={{ fontSize: '20px', fontWeight: '800', color: colors.primary }}>₹{bid.amount}</span>
                      </div>
                      <p style={{ fontSize: '14px', color: colors.secondary, marginBottom: '16px' }}>"{bid.message}"</p>
                      
                      {bid.status === 'PENDING' && selectedPost.status === 'OPEN' ? (
                        <button 
                          onClick={() => acceptBidAndEscrow(bid.id)}
                          style={{ width: '100%', padding: '14px', backgroundColor: colors.textMain, color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                          <Lock size={16} /> Pay ₹{bid.amount} to Escrow & Book
                        </button>
                      ) : (
                        <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: bid.status === 'ACCEPTED' ? colors.success : colors.danger }}>
                          {bid.status}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerDashboard;