import { motion } from 'framer-motion';
import { Database, Server, Monitor, Code } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const techStack = [
    { icon: <Monitor className="w-5 h-5 text-primary" />, name: "Frontend", items: ["React", "Vite", "Tailwind CSS", "Framer Motion"] },
    { icon: <Server className="w-5 h-5 text-accent" />, name: "Backend", items: ["FastAPI", "Python", "Uvicorn"] },
    { icon: <Database className="w-5 h-5 text-secondary" />, name: "AI Model", items: ["YOLOv8", "PyTorch", "OpenCV"] },
    { icon: <Code className="w-5 h-5 text-warning" />, name: "APIs", items: ["SpeechSynthesis API", "Web Speech API"] }
  ];

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
        <p className="text-lg text-textMuted">{t('about.subtitle')}</p>
      </div>

      <div className="space-y-12">
        {/* Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-primary">Project Overview</h2>
          <p className="text-textMuted leading-relaxed mb-4">
            Precision Crop AI is an advanced agricultural technology platform designed to empower farmers and agronomists with instant plant disease detection. Crop diseases cause significant yield losses annually, threatening global food security and farmer livelihoods.
          </p>
          <p className="text-textMuted leading-relaxed">
            Our platform solves this by bringing state-of-the-art AI directly to the hands of farmers. With just a smartphone camera, users can upload images of their crops and receive an instant diagnosis, complete with treatment recommendations and multilingual voice guidance.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {techStack.map((tech, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-bold">{tech.name}</h3>
              </div>
              <ul className="space-y-2">
                {tech.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-textMuted">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Future Scope */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 border-l-4 border-l-accent"
        >
          <h2 className="text-2xl font-bold mb-4">Future Scope</h2>
          <ul className="space-y-3 text-textMuted">
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">01.</span>
              <span>Mobile Application wrapper for iOS and Android.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">02.</span>
              <span>Integration with IoT sensors for real-time soil and climate monitoring.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">03.</span>
              <span>Support for 50+ regional languages.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
