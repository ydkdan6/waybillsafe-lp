import { motion } from "framer-motion";
import { CreditCard, Lock, Truck, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  { icon: CreditCard, label: "Pay", description: "Buyer pays to escrow" },
  { icon: Lock, label: "Secure", description: "Funds locked in vault" },
  { icon: Truck, label: "Waybill", description: "Ship with confidence" },
  { icon: CheckCircle, label: "Confirm", description: "Delivery verified" },
];

const FlowCard = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card w-full max-w-md mx-auto p-8 flex flex-col items-center">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center">
        How It <span className="text-gradient">Works</span>
      </h2>
      <p className="text-muted-foreground text-sm mb-8 text-center">
        Simple 4-step secure transaction flow
      </p>

      {/* Vertical Stepper */}
      <div className="relative w-full max-w-xs">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          
          return (
            <motion.div
              key={step.label}
              className="relative flex items-start gap-4 pb-8 last:pb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute left-5 top-12 w-0.5 h-8 bg-muted">
                  <motion.div
                    className="w-full bg-electric stepper-line"
                    initial={{ height: 0 }}
                    animate={{ height: isCompleted ? "100%" : isActive ? "50%" : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
              
              {/* Icon */}
              <motion.div
                className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isActive || isCompleted
                    ? "bg-electric text-white shadow-lg"
                    : "bg-secondary text-muted-foreground"
                }`}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  boxShadow: isActive ? "0 0 20px hsla(210, 100%, 50%, 0.4)" : "none",
                }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              
              {/* Content */}
              <div className="flex-1 pt-1">
                <motion.div
                  className={`font-display font-semibold text-lg transition-colors duration-300 ${
                    isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </motion.div>
                <motion.div
                  className="text-sm text-muted-foreground"
                  animate={{ opacity: isActive ? 1 : 0.6 }}
                >
                  {step.description}
                </motion.div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-0 top-2 w-2 h-2 rounded-full bg-electric"
                  transition={{ type: "spring", damping: 20 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom hint */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          Tap the steps or watch the flow animation
        </p>
      </div>
    </div>
  );
};

export default FlowCard;