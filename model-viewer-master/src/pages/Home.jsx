import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import QRCodeModal from '../components/QRCodeModal';
import SEO from '../components/SEO';

const Home = () => {
  const [isQRModalOpen, setQRModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-center px-6 mesh-gradient">
      <SEO title="Home" description="The future of dining is here. See your food in 3D and AR before you order." />
      
      {/* Cinematic Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050A15]">
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover md:object-cover opacity-60 transition-all duration-700
                       max-sm:h-auto max-sm:w-[150%] max-sm:max-w-none"
          >
            <source src="/Vedio/WhatsApp%20Video%202026-05-13%20at%205.47.17%20PM.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Soft atmospheric overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A15] via-transparent to-[#050A15] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#050A15]/90 via-[#050A15]/40 to-[#050A15]/90 backdrop-blur-[1px]" />
      </div>

      {/* Floating Particles Simulation */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%' 
            }}
            animate={{ 
              opacity: [0, 0.4, 0],
              y: ['-10%', '110%'],
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-orange-400 rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="relative z-20 max-w-5xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-dark text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 mb-10 border border-white/5 animate-pulse">
            <span className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
            AR-Powered Dining
          </span>
          
          <h1 className="text-7xl md:text-[120px] font-black mb-10 leading-[0.95] tracking-tighter font-serif italic">
            Taste With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-orange-600 glow-text">
              Your Eyes.
            </span>
          </h1>
          
          <p className="text-2xl text-white/60 mb-16 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            Experience culinary artistry through augmented reality. See every dish in stunning 3D before it arrives at your table.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
            <Link 
              to="/menu" 
              className="cyber-button px-14 py-6 bg-orange-500 text-black font-black text-xl rounded-2xl transition-all shadow-[0_20px_50px_rgba(255,107,0,0.3)] flex items-center gap-4 hover:scale-105 active:scale-95"
            >
              Explore Menu
              <span className="text-2xl">→</span>
            </Link>
            <button 
              onClick={() => setQRModalOpen(true)}
              className="cyber-button px-14 py-6 glass-dark border border-white/10 hover:border-white/30 text-white font-black text-xl rounded-2xl transition-all flex items-center gap-4 hover:bg-white/5"
            >
              Try AR Now 📱
            </button>
          </div>

          {/* Futuristic Stats Bar */}
          <div className="grid grid-cols-3 gap-16 max-w-2xl mx-auto pt-16 border-t border-white/10 backdrop-blur-sm">
            {[
              { val: '13', label: 'AR Dishes' },
              { val: '4.8★', label: 'Rating' },
              { val: '100%', label: 'AR-Enabled' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.2 }}
              >
                <div className="text-4xl font-black mb-2 tracking-tight text-white">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-orange-500/60 font-black">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>

      <QRCodeModal isOpen={isQRModalOpen} onClose={() => setQRModalOpen(false)} />

      {/* Audio Control Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className="fixed bottom-10 right-10 z-50 p-5 rounded-full glass-dark border border-white/10 text-white/80 hover:text-orange-400 transition-colors shadow-2xl group"
      >
        {isMuted ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded bg-black/80 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/5">
          {isMuted ? "Unmute Cinematic Experience" : "Mute Background"}
        </span>
      </motion.button>
    </div>
  );
};

export default Home;
