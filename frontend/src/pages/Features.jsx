import { motion } from 'framer-motion';
import { Shield, Brain, Zap, Globe, Layers, LineChart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Features() {
  const { t } = useLanguage();

  const featuresList = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "AI Disease Detection",
      desc: "Upload a plant leaf image and get an instant, highly accurate diagnosis powered by state-of-the-art computer vision models."
    },
    {
      icon: <Globe className="w-8 h-8 text-accent" />,
      title: "Multilingual Support",
      desc: "Break language barriers. Access the entire platform and get voice guidance in English and Hindi."
    },
    {
      icon: <Layers className="w-8 h-8 text-secondary" />,
      title: "Smart AI Chatbot",
      desc: "Have a conversation with our AI assistant to get context-aware answers about plant care, treatments, and prevention."
    },
    {
      icon: <Zap className="w-8 h-8 text-warning" />,
      title: "Real-time Prediction",
      desc: "Lightning-fast inference times. Get results in milliseconds thanks to our optimized YOLOv8 backend architecture."
    },
    {
      icon: <LineChart className="w-8 h-8 text-danger" />,
      title: "Confidence Scoring",
      desc: "Transparent AI. Every prediction comes with a confidence score and a detailed breakdown of potential issues."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Comprehensive Dictionary",
      desc: "Access an extensive dictionary of plant diseases with detailed causes, symptoms, and treatment plans."
    }
  ];

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('features.title')}</h1>
        <p className="text-lg text-textMuted max-w-2xl mx-auto">{t('features.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresList.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-textMuted leading-relaxed text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
