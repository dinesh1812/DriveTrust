import React from 'react';
import { User, Shield, LogOut, ChevronRight } from 'lucide-react';

const Settings = () => {
  const menuItems = [
    { icon: <User size={18}/>, label: "Profile Information" },
    { icon: <Shield size={18}/>, label: "Security & Keys" },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '32px' }}>System Configuration</h2>
      
      {menuItems.map((item, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {item.icon}
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>{item.label}</span>
          </div>
          <ChevronRight size={16} color="#ccc" />
        </div>
      ))}

      <button style={{ marginTop: '60px', display: 'flex', alignItems: 'center', gap: '8px', color: 'red', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', border: 'none', background: 'none' }}>
        <LogOut size={16}/> Terminate Session
      </button>
    </div>
  );
};

export default Settings;