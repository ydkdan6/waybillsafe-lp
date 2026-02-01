import { motion } from "framer-motion";

const ProblemCard = () => {
  return (
    <div className="glass-card w-full max-w-md mx-auto p-8 flex flex-col items-center text-center bg-gradient-to-br from-card to-background">
      {/* Glitchy Bank Notification Mockup */}
      <div className="relative w-full max-w-xs mb-8">
        <motion.div
          className="relative bg-secondary/50 rounded-xl p-4 border border-destructive/30"
          animate={{
            x: [0, -2, 2, -1, 1, 0],
            opacity: [1, 0.8, 1, 0.9, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          {/* Fake notification content */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <span className="text-destructive text-lg">!</span>
            </div>
            <div className="flex-1 text-left">
              <div className="text-xs text-muted-foreground mb-1">Bank Alert</div>
              <div className="glitch-text text-sm text-foreground font-medium">
                Credit: ₦500,000.00
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                From: FAKE_ALERT_123
              </div>
            </div>
          </div>
          
          {/* Glitch overlay */}
          <motion.div
            className="absolute inset-0 bg-destructive/10 rounded-xl"
            animate={{
              opacity: [0, 0.3, 0, 0.2, 0],
              scaleX: [1, 1.02, 0.98, 1],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 2.5,
            }}
          />
          
          {/* Scan lines effect */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-destructive/5 to-transparent animate-pulse" />
          </div>
        </motion.div>
        
        {/* Warning badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-destructive flex items-center justify-center"
        >
          <span className="text-destructive-foreground text-sm font-bold">✕</span>
        </motion.div>
      </div>

      {/* Content */}
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
        <span className="text-destructive">Fake Alerts?</span> Ghosting?{" "}
        <span className="text-destructive">Rejection?</span>
      </h2>
      
      <p className="text-muted-foreground text-base leading-relaxed">
        Nigerian vendors lose millions every month to payment fraud when shipping goods across borders.
      </p>

      {/* Stats */}
      <div className="mt-6 flex gap-6">
        <div className="text-center">
          <div className="text-2xl font-display font-bold text-destructive">67%</div>
          <div className="text-xs text-muted-foreground">Fraud Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-display font-bold text-foreground">₦2.4B</div>
          <div className="text-xs text-muted-foreground">Lost Monthly</div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;