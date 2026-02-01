import { motion } from "framer-motion";

const HeroCard = () => {
  return (
    <div className="glass-card w-full max-w-md mx-auto p-8 flex flex-col items-center text-center">
      {/* 3D Visual Placeholder */}
      <div className="relative w-48 h-48 mb-8">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric to-electric-glow opacity-20 animate-pulse-glow" />
        <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-secondary to-card flex items-center justify-center">
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 relative"
          >
            {/* Stylized Shield Icon */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(210, 100%, 50%)" />
                  <stop offset="100%" stopColor="hsl(210, 100%, 70%)" />
                </linearGradient>
              </defs>
              <path
                d="M50 5 L90 20 L90 50 C90 75 70 90 50 95 C30 90 10 75 10 50 L10 20 Z"
                fill="url(#shieldGradient)"
                opacity="0.9"
              />
              <path
                d="M50 25 L65 35 L60 55 L50 65 L40 55 L35 35 Z"
                fill="hsl(210, 40%, 98%)"
                opacity="0.9"
              />
            </svg>
          </motion.div>
        </div>
        {/* Floating particles */}
        <motion.div
          animate={{ y: [-5, 5, -5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-electric"
        />
        <motion.div
          animate={{ y: [5, -5, 5], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-electric-glow"
        />
      </div>

      {/* Content */}
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
        Waybill with{" "}
        <span className="text-gradient">Zero Fear.</span>
      </h1>
      
      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
        The escrow system for Nigerian vendors who ship across borders.
      </p>

      {/* Decorative element */}
      <div className="mt-8 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          Stealth Mode Active
        </span>
      </div>
    </div>
  );
};

export default HeroCard;