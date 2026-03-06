import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useWindowWidth, colors } from '../utils';

const Trips = () => {
  const width = useWindowWidth();
  const isMobile = width < 768;

  const styles = {
    page: { padding: isMobile ? '20px' : '40px 5%', width: '100%', maxWidth: '1400px', fontFamily: "'Inter', sans-serif" },
    liveCard: { backgroundColor: colors.surface, borderRadius: '16px', padding: isMobile ? '20px' : '30px', border: `1px solid ${colors.border}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '40px' },
    table: { width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', marginTop: '20px' },
    th: { padding: '16px', textAlign: 'left', color: colors.secondary, fontSize: '12px', textTransform: 'uppercase' },
    tr: { backgroundColor: colors.surface, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    td: { padding: '16px', fontSize: '14px', borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}` }
  };

  const pastTrips = [
    { id: 'BK-9921', date: '12 Feb 2026', route: 'Mumbai → Pune', status: 'Delivered', price: '₹12,400' },
    { id: 'BK-9904', date: '10 Feb 2026', route: 'Surat → Mumbai', status: 'Delivered', price: '₹8,200' },
  ];

  return (
    <div style={styles.page}>
      <h1 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: '800', marginBottom: '30px' }}>Shipment Tracking</h1>
      
      <div style={styles.liveCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.primary, fontWeight: 'bold' }}>
            <Clock size={18} /> In Transit
          </div>
          <span style={{ fontSize: '12px', color: colors.textLight }}>ID: #TRK-8820</span>
        </div>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', alignItems: isMobile ? 'flex-start' : 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', color: colors.secondary, fontWeight: 'bold' }}>ORIGIN</div>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>Mumbai Warehouse A</div>
          </div>
          <ArrowRight style={{ transform: isMobile ? 'rotate(90deg)' : 'none', color: colors.border }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', color: colors.secondary, fontWeight: 'bold' }}>DESTINATION</div>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>Bangalore Distribution</div>
          </div>
        </div>
        <div style={{ marginTop: '30px', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: '65%', height: '100%', background: colors.primary }}></div>
        </div>
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>History</h2>
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pastTrips.map(trip => (
            <div key={trip.id} style={{ padding: '16px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>{trip.id}</span>
                <span style={{ color: colors.success, fontSize: '12px', fontWeight: 'bold' }}>{trip.status}</span>
              </div>
              <div style={{ fontSize: '14px', color: colors.secondary }}>{trip.route}</div>
            </div>
          ))}
        </div>
      ) : (
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Order ID</th><th style={styles.th}>Date</th><th style={styles.th}>Route</th><th style={styles.th}>Status</th><th style={styles.th}>Amount</th></tr></thead>
          <tbody>
            {pastTrips.map(trip => (
              <tr key={trip.id} style={styles.tr}>
                <td style={{ ...styles.td, fontWeight: 'bold', borderLeft: `4px solid ${colors.success}`, borderRadius: '4px 0 0 4px' }}>{trip.id}</td>
                <td style={styles.td}>{trip.date}</td><td style={styles.td}>{trip.route}</td>
                <td style={{ ...styles.td, color: colors.success, fontWeight: 'bold' }}>{trip.status}</td>
                <td style={{ ...styles.td, fontWeight: 'bold', borderRadius: '0 4px 4px 0' }}>{trip.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Trips;