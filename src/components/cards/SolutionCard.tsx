import { motion } from "framer-motion";
import { Shield, Lock, Check } from "lucide-react";

const SolutionCard = () => {
  return (
    <div className="glass-card-bright w-full max-w-md mx-auto p-8 flex flex-col items-center text-center">
      {/* Vault Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="relative w-24 h-24 mb-6"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric to-electric-glow opacity-20 animate-pulse-glow" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-electric to-electric-glow flex items-center justify-center">
          <Lock className="w-10 h-10 text-white" />
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-electric to-electric-glow" />
        </motion.div>
      </motion.div>

      {/* Content */}
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-darker mb-3 leading-tight">
        Money Secured for{" "}
        <span className="bg-gradient-to-r from-electric to-electric-glow bg-clip-text text-transparent">₦100.</span>
      </h2>
      
      <p className="text-navy-deep/70 text-base leading-relaxed mb-6">
        The buyer pays a flat fee, we lock the funds in a secure vault, and you ship with 100% confidence.
      </p>

      {/* Benefits */}
      <div className="w-full space-y-3">
        {[
          "Funds locked until delivery confirmed",
          "Instant release on waybill verification",
          "No more fake alerts, ever"
        ].map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-electric/5"
          >
            <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-success" />
            </div>
            <span className="text-sm text-navy-deep text-left">{benefit}</span>
          </motion.div>
        ))}
      </div>

      {/* Trust badge */}
      <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-navy-deep/5">
        <Shield className="w-4 h-4 text-electric" />
        <span className="text-xs text-navy-deep/70 font-medium">Bank-grade Security</span>
      </div>
    </div>
  );
};

export default SolutionCard;