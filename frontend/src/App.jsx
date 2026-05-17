import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// Components
import Header from './components/Header';

// Pages
import Landing from './pages/Landing';
import Detect from './pages/Detect';
import Chatbot from './pages/Chatbot';
import Features from './pages/Features';
import About from './pages/About';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen relative overflow-hidden">
          {/* Background Particles/Gradients */}
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

          <Header />

          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/detect" element={<Detect />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
