import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, X, Info } from 'lucide-react';
import { useEfficiency } from '../hooks/useEfficiency';

const Home = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const { calculateScore } = useEfficiency();

  const drivers = [
    { id: 1, name: "Vikram Singh", status: "AVAILABLE", rate: 45, rating: 4.8, trips: [{distance: 120, time: 2.5}, {distance: 500, time: 9}] },
    { id: 2, name: "Amitav K.", status: "BOOKED", rate: 38, rating: 4.2, trips: [{distance: 100, time: 3}] },
    { id: 3, name: "Suresh Raina", status: "AVAILABLE", rate: 52, rating: 4.9, trips: [{distance: 800, time: 12}] }
  ];

  const styles = {
    container: { padding: '24px' },
    header: { marginBottom: '32px' },
    title: { fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' },
    card: {
      border: '1px solid #eee',
      padding: '20px',
      marginBottom: '16px',
      cursor: 'pointer',
      transition: 'border-color 0.2s'
    },
    badge: (status) => ({
      fontSize: '9px',
      fontWeight: '700',
      padding: '4px 8px',
      backgroundColor: status === 'AVAILABLE' ? '#000' : '#f0f0f0',
      color: status === 'AVAILABLE' ? '#fff' : '#aaa',
      textTransform: 'uppercase'
    }),
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#fff',
      zIndex: 1000,
      padding: '40px 24px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Fleet Directory</h2>
      </div>

      {drivers.map(driver => (
        <motion.div 
          key={driver.id} 
          style={styles.card} 
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedDriver(driver)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700' }}>{driver.name}</span>
            <span style={styles.badge(driver.status)}>{driver.status}</span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '9px', color: '#888', fontWeight: '700', textTransform: 'uppercase' }}>Efficiency</p>
              <p style={{ fontSize: '13px', fontWeight: '700' }}>{calculateScore(driver.trips, driver.rating)}%</p>
            </div>
            <div>
              <p style={{ fontSize: '9px', color: '#888', fontWeight: '700', textTransform: 'uppercase' }}>Base Rate</p>
              <p style={{ fontSize: '13px', fontWeight: '700' }}>₹{driver.rate}/km</p>
            </div>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedDriver && (
          <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={styles.modal}
          >
            <button onClick={() => setSelectedDriver(null)} style={{ marginBottom: '40px' }}><X size={24}/></button>
            <h1 style={{ fontSize: '28px', fontWeight: '900', textTransform: 'uppercase' }}>{selectedDriver.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '8px 0 40px' }}>
              <Star size={14} fill="#000" /> <span style={{ fontWeight: '700' }}>{selectedDriver.rating}</span>
            </div>
            
            <div style={{ borderTop: '1px solid #eee', paddingTop: '24px' }}>
               <p style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#888' }}>Analytics</p>
               <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
                 <span>Efficiency Score</span>
                 <span style={{ fontWeight: '700' }}>{calculateScore(selectedDriver.trips, selectedDriver.rating)}%</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
                 <span>Price Per KM</span>
                 <span style={{ fontWeight: '700' }}>₹{selectedDriver.rate}.00</span>
               </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '60px' }}>
              <button style={{ flex: 1, border: '1px solid #000', padding: '16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>Message</button>
              <button style={{ flex: 1, backgroundColor: '#000', color: '#fff', padding: '16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>Book & Pay</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;