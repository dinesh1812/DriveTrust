import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import your pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Trips from './pages/Trips';
import Settings from './pages/Settings';

// Import the Layout component (The one with the navigation bar)
import Layout from './components/Layout';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth routes don't use the Bottom Nav Layout */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected/App routes use the Layout wrapper */}
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
      <div className="selection:bg-black selection:text-white">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;