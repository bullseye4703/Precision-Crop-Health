import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Bot, Globe, Zap, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Landing() {
  const { t } = useLanguage();

  const features = [
    { icon: <Activity className="w-6 h-6 text-primary" />, title: "Real-time Detection", desc: "Get instant plant disease diagnosis using advanced YOLOv8 models." },
    { icon: <Bot className="w-6 h-6 text-accent" />, title: "AI Chatbot", desc: "Interactive assistant to answer all your agriculture questions." },
    { icon: <Globe className="w-6 h-6 text-secondary" />, title: "Multilingual", desc: "Available in English and Hindi with voice readout support." }
  ];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wider uppercase">Precision Agriculture AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          {t('landing.heroTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t('landing.heroTitleAccent')}</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-white/90 font-light mb-6">
          {t('landing.heroSubtitle')}
        </h2>
        
        <p className="text-lg text-textMuted max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('landing.heroDescription')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/detect" 
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            <span className="relative z-10">{t('landing.startBtn')}</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            to="/features" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all shadow-sm backdrop-blur-sm"
          >
            {t('landing.exploreBtn')}
          </Link>
        </div>
      </motion.div>

      {/* Feature Highlights */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-6xl mx-auto px-4 w-full"
      >
        {features.map((feature, idx) => (
          <div key={idx} className="glass-card p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-inner">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-textMuted text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
