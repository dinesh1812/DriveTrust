import { useState, useEffect } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    // Trigger once on mount to ensure correct mode
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export const colors = {
  primary: '#2563EB',
  primaryDark: '#1E40AF',
  secondary: '#64748B',
  success: '#10B981',
  danger: '#EF4444',
  background: '#F1F5F9',
  surface: '#FFFFFF',
  textMain: '#0F172A',
  textLight: '#94A3B8',
  border: '#E2E8F0'
};