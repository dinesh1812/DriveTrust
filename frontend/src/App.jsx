import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Trips from './pages/Trips';
import Settings from './pages/Settings';

// Import Layout
import Layout from './components/Layout';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes (No Navbar) */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes (With Navbar) */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/trips" element={<Layout><Trips /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      {/* Added overflowX: 'hidden' to prevent layout shifts on laptop screens */}
      <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#F8FAFC', overflowX: 'hidden' }}>
        <style>{`
          ::selection {
            background-color: #2563EB;
            color: white;
          }
          /* This makes the scrollbar look professional on Chrome/Edge */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          ::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #2563EB;
          }
        `}</style>
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;