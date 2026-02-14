import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, MapPin, X, Phone, Truck, ShieldCheck } from 'lucide-react';
import { colors, useWindowWidth } from '../utils';

const Home = () => {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Sample Data
  const drivers = [
    { id: 1, name: "Vikram Singh", status: "AVAILABLE", loc: "Mumbai, MH", rate: 45, score: 92, vehicle: "Tata Prima G3", phone: "+91 98XXX XXXXX" },
    { id: 2, name: "Rahul Deshmukh", status: "BOOKED", loc: "Pune, MH", rate: 38, score: 88, vehicle: "Ashok Leyland 3518", phone: "+91 97XXX XXXXX" },
    { id: 3, name: "Amit Patel", status: "AVAILABLE", loc: "Surat, GJ", rate: 52, score: 95, vehicle: "BharatBenz 2823C", phone: "+91 96XXX XXXXX" },
    { id: 4, name: "Suresh Raina", status: "AVAILABLE", loc: "Delhi, DL", rate: 49, score: 91, vehicle: "Eicher Pro 6000", phone: "+91 95XXX XXXXX" },
  ];

  const styles = {
    hero: {
      width: '100%',
      backgroundColor: colors.primary,
      padding: isMobile ? '40px 20px' : '80px 5%',
      color: 'white',
      textAlign: 'left'
    },
    contentContainer: {
      width: '100%',
      maxWidth: '1600px',
      margin: '0 auto',
      padding: isMobile ? '20px' : '40px 5%',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: width > 1200 ? 'repeat(4, 1fr)' : width > 800 ? 'repeat(2, 1fr)' : '1fr',
      gap: '24px',
      marginTop: '30px'
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: '16px',
      padding: '24px',
      border: `1px solid ${colors.border}`,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    bottomSheet: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTopLeftRadius: '24px',
      borderTopRightRadius: '24px',
      padding: isMobile ? '24px' : '40px 10%',
      zIndex: 2000,
      boxShadow: '0 -10px 25px rgba(0,0,0,0.1)',
      maxHeight: '80vh',
      overflowY: 'auto'
    },
    overlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      zIndex: 1999,
      backdropFilter: 'blur(4px)'
    }
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <section style={styles.hero}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: '800', marginBottom: '16px' }}>
            Find the Perfect Carrier.
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '700px', lineHeight: '1.6' }}>
            The largest network of verified logistics providers. View efficiency scores and book instantly.
          </p>
        </div>
      </section>

      <div style={styles.contentContainer}>
        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '15px', top: '15px', color: colors.textLight }} size={20} />
            <input 
              placeholder="Search by city, driver, or vehicle type..."
              style={{ width: '100%', padding: '15px 15px 15px 50px', borderRadius: '12px', border: `1px solid ${colors.border}`, fontSize: '16px', outline: 'none' }}
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 25px', borderRadius: '12px', border: `1px solid ${colors.border}`, background: 'white', fontWeight: '600' }}>
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* Driver Grid */}
        <div style={styles.grid}>
          {drivers.map((driver) => (
            <motion.div 
              key={driver.id} 
              style={styles.card}
              whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
              onClick={() => setSelectedDriver(driver)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div style={{ 
                  padding: '4px 12px', 
                  backgroundColor: driver.status === 'AVAILABLE' ? '#DCFCE7' : '#FEE2E2', 
                  color: driver.status === 'AVAILABLE' ? '#15803D' : '#B91C1C', 
                  borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' 
                }}>
                  {driver.status}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                  {driver.score/20} <Star size={14} fill="#F59E0B" color="#F59E0B" />
                </div>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>{driver.name}</h3>
              <p style={{ color: colors.textLight, fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} /> {driver.loc}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${colors.border}`, paddingTop: '15px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: colors.textLight, fontWeight: 'bold', textTransform: 'uppercase' }}>Rate</div>
                  <div style={{ fontSize: '18px', fontWeight: '800' }}>₹{driver.rate}/km</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: colors.textLight, fontWeight: 'bold', textTransform: 'uppercase' }}>Efficiency</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: colors.success }}>{driver.score}%</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Sheet Detail View */}
      <AnimatePresence>
        {selectedDriver && (
          <>
            <motion.div 
              style={styles.overlay} 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedDriver(null)}
            />
            <motion.div 
              style={styles.bottomSheet}
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Driver Details</h2>
                <button 
                  onClick={() => setSelectedDriver(null)}
                  style={{ padding: '8px', borderRadius: '50%', background: colors.background, cursor: 'pointer' }}
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '40px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: colors.primary, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                      {selectedDriver.name[0]}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '22px', fontWeight: '700' }}>{selectedDriver.name}</h3>
                      <p style={{ color: colors.textLight }}>{selectedDriver.loc}</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div style={{ padding: '15px', background: colors.background, borderRadius: '12px' }}>
                      <p style={{ fontSize: '12px', color: colors.secondary, fontWeight: 'bold' }}>VEHICLE</p>
                      <p style={{ fontWeight: '700', marginTop: '4px' }}>{selectedDriver.vehicle}</p>
                    </div>
                    <div style={{ padding: '15px', background: colors.background, borderRadius: '12px' }}>
                      <p style={{ fontSize: '12px', color: colors.secondary, fontWeight: 'bold' }}>EXPERIENCE</p>
                      <p style={{ fontWeight: '700', marginTop: '4px' }}>8+ Years</p>
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.success, fontWeight: '600' }}>
                    <ShieldCheck size={20} /> Verified Background Check
                  </div>
                  <button style={{ 
                    width: '100%', padding: '18px', borderRadius: '12px', 
                    background: colors.primary, color: 'white', fontWeight: 'bold', 
                    fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' 
                  }}>
                    <Phone size={18} /> Contact Driver
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '13px', color: colors.textLight }}>
                    Direct communication is encrypted and secure.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;