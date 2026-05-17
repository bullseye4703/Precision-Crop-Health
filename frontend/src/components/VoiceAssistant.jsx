import { useState, useEffect } from 'react';
import { Volume2, Play, Square, AlertCircle, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VoiceAssistant({ hindiDiagnosis }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [error, setError] = useState(null);
  
  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const getHindiVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    // Try to find a Hindi voice, preferably female if identifiable
    const hindiVoices = voices.filter(voice => voice.lang.includes('hi') || voice.lang.includes('HI'));
    
    if (hindiVoices.length > 0) {
      // Look for female voice identifiers (Google, Microsoft, etc.)
      const femaleVoice = hindiVoices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('zira') || 
        voice.name.toLowerCase().includes('swara')
      );
      return femaleVoice || hindiVoices[0];
    }
    return null;
  };

  // Ensure voices are loaded (some browsers load them asynchronously)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        getHindiVoice();
      };
    }
  }, []);

  const handlePlayVoice = () => {
    if (!('speechSynthesis' in window)) {
      setError("Speech synthesis is not supported in this browser.");
      return;
    }

    // Stop if already playing
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPreparing(false);
      return;
    }

    setIsPreparing(true);
    setError(null);
    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(hindiDiagnosis);
    window.speechUtterance = utterance; // Prevent garbage collection
    const voice = getHindiVoice();
    
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = 'hi-IN';
    utterance.rate = 0.9; // Slightly slower
    utterance.pitch = 1.0; // Natural
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsPreparing(false);
      setIsPlaying(true);
    };
    
    utterance.onend = () => setIsPlaying(false);
    
    utterance.onerror = (e) => {
      console.error("SpeechSynthesis error:", e);
      setIsPreparing(false);
      setIsPlaying(false);
      // Ignore "interrupted" or "canceled" errors which happen normally
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        setError(`Failed to play AI voice. Reason: ${e.error || 'Unknown browser error'}.`);
      }
    };

    // Synchronous execution fixes browser autoplay restrictions in some browsers,
    // but in others, calling cancel() immediately before speak() causes synthesis-failed.
    // A small timeout allows the cancel operation to complete.
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 50);
  };

  return (
    <div className="w-full mt-6 p-5 rounded-2xl bg-white border border-neutral-200 relative overflow-hidden shadow-sm">
      {/* Background glowing effect when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary/10 shadow-[inset_0_0_80px_rgba(46,161,105,0.25)] pointer-events-none" 
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-widest flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            AI Voice Module
          </h4>
          
          {/* Glowing AI Orb Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-textMuted uppercase tracking-wider">
              {isPlaying ? 'Active' : isPreparing ? 'Processing' : 'Standby'}
            </span>
            <div className={`relative w-3 h-3 rounded-full ${isPlaying ? 'bg-primary' : isPreparing ? 'bg-warning' : 'bg-neutral-200 border border-neutral-300'}`}>
              {(isPlaying || isPreparing) && (
                <span className={`absolute inset-0 w-full h-full rounded-full animate-ping opacity-75 ${isPlaying ? 'bg-primary' : 'bg-warning'}`} />
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-danger bg-danger/10 px-3 py-2 rounded-lg border border-danger/20 text-xs">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <button 
          onClick={handlePlayVoice}
          disabled={isPreparing}
          className={`group w-full flex items-center justify-center gap-3 py-4 px-4 rounded-xl font-medium transition-all duration-300 relative overflow-hidden
            ${isPlaying 
              ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
              : 'bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-textMain hover:border-primary/30'}
            ${isPreparing ? 'opacity-90 cursor-wait border-warning/40 text-warning' : ''}
          `}
        >
          {isPreparing ? (
            <>
              <Bot className="w-5 h-5 animate-pulse" />
              <span className="flex items-center gap-1">
                Generating AI response
                <span className="flex gap-0.5">
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>.</motion.span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>.</motion.span>
                </span>
              </span>
            </>
          ) : isPlaying ? (
            <>
              <div className="relative flex items-center justify-center w-5 h-5">
                <Square className="w-4 h-4 fill-current z-10" />
              </div>
              Stop AI Assistant
            </>
          ) : (
            <>
              <Play className="w-5 h-5 text-primary fill-current group-hover:scale-110 transition-transform" />
              Listen to AI Diagnosis
            </>
          )}

          {/* Button Inner Glow on Hover */}
          {!isPlaying && !isPreparing && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          )}
        </button>

        {/* Animated Waveform/Equalizer when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col items-center gap-2 overflow-hidden"
            >
              <span className="text-xs text-accent/80 font-medium tracking-widest uppercase animate-pulse">AI Assistant Speaking</span>
              <div className="flex items-end justify-center gap-1.5 h-10 w-full px-4 pt-2">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-primary to-accent rounded-t-sm shadow-[0_0_8px_rgba(89,214,144,0.6)]"
                    animate={{ 
                      height: ['20%', '100%', '30%', '90%', '40%', '80%', '20%']
                    }}
                    transition={{
                      duration: 1.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.05
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
