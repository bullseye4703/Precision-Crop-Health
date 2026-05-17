import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

// Components
import UploadSection from '../components/UploadSection';
import ResultsSection from '../components/ResultsSection';
import AIAssistant from '../components/AIAssistant';
import StatsCards from '../components/StatsCards';

export default function Detect() {
  const { t } = useLanguage();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  };

  const handlePredict = async () => {
    if (!file) return;

    setIsPredicting(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      setError('Failed to analyze the image. Please ensure the backend is running.');
      console.error(err);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!result ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <StatsCards />
          
          <div className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{t('detect.title')}</h2>
            <p className="text-textMuted mb-8 max-w-2xl mx-auto">
              {t('detect.subtitle')}
            </p>
            
            <UploadSection 
              file={file} 
              previewUrl={previewUrl} 
              onFileChange={handleFileChange} 
              isPredicting={isPredicting}
              onPredict={handlePredict}
              error={error}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">{t('detect.analysisComplete')}</h2>
            <button 
              onClick={handleReset}
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors"
            >
              {t('detect.scanAnother')}
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ResultsSection result={result} previewUrl={previewUrl} />
            </div>
            <div className="lg:col-span-1 space-y-8">
              <AIAssistant result={result} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
