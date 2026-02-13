import React from 'react';

const Trips = () => {
  const styles = {
    container: { padding: '24px' },
    card: { borderLeft: '2px solid #000', padding: '4px 0 4px 20px', marginBottom: '40px' },
    status: { fontSize: '9px', fontWeight: '800', backgroundColor: '#000', color: '#fff', padding: '2px 6px', display: 'inline-block', marginBottom: '12px' },
    tracking: { backgroundColor: '#f9f9f9', padding: '16px', marginTop: '16px' }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '32px' }}>Operational Logs</h2>
      
      <div style={styles.card}>
        <span style={styles.status}>In Transit</span>
        <p style={{ fontSize: '11px', color: '#888', fontWeight: '700' }}>ID: BK-8829</p>
        <p style={{ fontSize: '15px', fontWeight: '800', margin: '8px 0' }}>Surat Hub → Mumbai Terminal</p>
        
        <div style={styles.tracking}>
          <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#888', fontWeight: '700' }}>Current Position</p>
          <p style={{ fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>Vapi Checkpost, GJ</p>
          <div style={{ height: '2px', background: '#eee', marginTop: '12px', position: 'relative' }}>
            <div style={{ position: 'absolute', height: '100%', width: '60%', background: '#000' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trips;