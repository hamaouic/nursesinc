import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './components/Nav';
import Footer from './components/Footer';
import PhipeaBadge from './components/PhipeaBadge';
import Home from './pages/Home';
import Services from './pages/Services';
import Knowledge from './pages/Knowledge';
import Forms from './pages/Forms';
import Reconciliation from './pages/Reconciliation';
import ClinicalMatrixPage from './pages/ClinicalMatrixPage';
import Contact from './pages/Contact';
import Clients from './pages/Clients';
import Clinic from './pages/Clinic';

export default function App() {
  const location = useLocation();

  return (
    <div className="grain relative min-h-screen overflow-x-hidden bg-cream-50 text-ink-500">
      <Nav />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative z-10"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/forms/reconciliation" element={<Reconciliation />} />
            <Route path="/forms/clinical-tools" element={<ClinicalMatrixPage />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clinic" element={<Clinic />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <PhipeaBadge />
      <Footer />
    </div>
  );
}