import { Bot, Info, Stethoscope, Droplets, Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDiseaseInfo } from '../utils/diseaseInfo';
import VoiceAssistant from './VoiceAssistant';

export default function AIAssistant({ result }) {
  const { disease } = result;
  const isHealthy = disease.toLowerCase().includes('healthy');
  const info = getDiseaseInfo(disease);
  
  const formattedDisease = disease.replace(/_/g, ' ').replace('___', ' - ');
  
  const englishMessage = isHealthy 
    ? `The uploaded plant appears healthy. No immediate action is required. Continue your standard care routine.`
    : `The uploaded plant appears affected by ${formattedDisease}. Recommended treatment includes ${info.treatment.toLowerCase()}`;

  return (
    <div className="space-y-6">
      {/* Chatbot Message */}
      <div className="glass-card p-6 border-t-4 border-t-accent">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(89,214,144,0.3)]">
            <Bot className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-textMuted mb-1">AI Assistant</h4>
            <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 text-sm leading-relaxed border border-white/10">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {englishMessage}
              </motion.span>
            </div>
          </div>
        </div>

        {/* New ElevenLabs Premium Voice Assistant Component */}
        <VoiceAssistant hindiDiagnosis={info.hindiDiagnosis} />
      </div>

      {/* Disease Dictionary Info */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" /> 
          Detailed Analysis
        </h3>
        
        <div className="space-y-4">
          <InfoRow icon={<Stethoscope className="w-4 h-4 text-warning" />} title="Cause" content={info.cause} />
          <InfoRow icon={<AlertTriangle className="w-4 h-4 text-danger" />} title="Symptoms" content={info.symptoms} />
          <InfoRow icon={<Droplets className="w-4 h-4 text-secondary" />} title="Treatment" content={info.treatment} />
          <InfoRow icon={<Shield className="w-4 h-4 text-primary" />} title="Prevention" content={info.prevention} />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, title, content }) {
  return (
    <div className="group">
      <div className="flex items-center gap-2 text-xs font-medium text-textMuted uppercase tracking-wider mb-1">
        {icon} {title}
      </div>
      <div className="text-sm text-textMain bg-white/5 p-3 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors">
        {content}
      </div>
    </div>
  );
}
