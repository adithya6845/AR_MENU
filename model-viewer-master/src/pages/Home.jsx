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
    <div className="min-h-screen bg-[#050A15] flex flex-col">
      <SEO title="Home" description="The future of dining is here. See your food in 3D and AR before you order." />

      {/* Hero Section with Video Background (Blue Line to Blue Line) */}
      <div className="relative w-full h-[65vh] md:h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-[center_40%] opacity-70"
          >
            <source src="/Vedio/WhatsApp%20Video%202026-05-13%20at%205.47.17%20PM.mp4" type="video/mp4" />
          </video>
          {/* Subtle Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A15] via-transparent to-[#050A15]" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content Layered on Video */}
        <div className="relative z-10 text-center max-w-4xl mx-auto pt-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-dark text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 mb-8 border border-white/5">
              AR-Powered Dining
            </span>
            <h1 className="text-6xl md:text-[110px] font-black leading-[0.9] tracking-tighter font-serif italic text-white mb-10">
              Taste With <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-orange-600 glow-text">
                Your Eyes.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed drop-shadow-2xl px-4">
              Experience culinary artistry through augmented reality. See every dish in stunning 3D before it arrives at your table.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Action & Stats Section (Below Blue Line) */}
      <div className="relative z-20 px-6 py-12 text-center bg-[#050A15]">
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link 
            to="/menu" 
            className="px-14 py-6 bg-orange-500 text-black font-black text-xl rounded-2xl transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-4"
          >
            Explore Menu
            <span className="text-2xl">→</span>
          </Link>
          <button 
            onClick={() => setQRModalOpen(true)}
            className="px-14 py-6 glass-dark border border-white/10 hover:border-white/30 text-white font-black text-xl rounded-2xl transition-all flex items-center gap-4"
          >
            Try AR Demo
          </button>
        </div>

        {/* Futuristic Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto pt-8 border-t border-white/5">
          {[
            { val: '13+', label: 'AR DISHES' },
            { val: '4.8', label: 'GUEST RATING' },
            { val: '100%', label: 'AR ENABLED' }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl font-black text-white">{stat.val}</div>
              <div className="text-[8px] uppercase tracking-widest text-orange-500/60 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
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
