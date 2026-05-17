import { useState } from 'react';
import { Leaf, Cpu, Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.detect'), path: '/detect' },
    { name: t('nav.chatbot'), path: '/chatbot' },
    { name: t('nav.features'), path: '/features' },
    { name: t('nav.about'), path: '/about' }
  ];

  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-textMain">Precision Crop <span className="text-primary">AI</span></h1>
            <p className="text-xs text-textMuted hidden sm:block">AI Powered Plant Disease Detection</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-textMuted'}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 border-l border-white/10 pl-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs font-medium uppercase text-white"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              {language === 'en' ? 'EN' : 'HI'}
            </button>

            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-primary shadow-sm shadow-primary/50"></div>
              <span className="text-xs text-textMuted font-medium flex items-center gap-2 whitespace-nowrap">
                <Cpu className="w-3.5 h-3.5 text-primary" /> {t('nav.systemsOnline')}
              </span>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-textMuted hover:text-textMain transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/10">
          <div className="px-4 py-4 space-y-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-textMuted'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium uppercase text-white"
              >
                <Globe className="w-4 h-4 text-primary" />
                {language === 'en' ? 'English' : 'हिंदी'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
