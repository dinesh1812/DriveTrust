import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import Layout Wrapper
import Layout from './components/Layout';

// Import All Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import CustomerDashboard from './pages/CustomerDashboard';
import DriverBoard from './pages/DriverBoard';
import Trips from './pages/Trips';
import Settings from './pages/Settings';

// This component extracts the current location so Framer Motion knows when to animate page changes
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Auth Routes (No Navigation Bar) */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private App Routes (Wrapped in the Navigation Layout) */}
        <Route path="/customer" element={<Layout><CustomerDashboard /></Layout>} />
        <Route path="/driver" element={<Layout><DriverBoard /></Layout>} />
        <Route path="/trips" element={<Layout><Trips /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      {/* Global container ensures the background color is consistent and prevents horizontal scrolling */}
      <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#F8FAFC', overflowX: 'hidden' }}>
        
        {/* Injecting global professional styles for text selection and scrollbars */}
        <style>{`
          ::selection {
            background-color: #2563EB; /* Royal Blue */
            color: white;
          }
          /* Custom Enterprise Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: #CBD5E1;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #94A3B8;
          }
        `}</style>

        {/* Render the routes inside our styled container */}
        <AnimatedRoutes />
        
      </div>
    </Router>
  );
}

export default App;