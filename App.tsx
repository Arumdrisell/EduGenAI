import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import CurriculumPage from './pages/CurriculumPage';
import GeneratorPage from './pages/GeneratorPage';
import GuidePage from './pages/GuidePage';
import SupportPage from './pages/SupportPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/support" element={<SupportPage />} />
          {/* Fallback route */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
