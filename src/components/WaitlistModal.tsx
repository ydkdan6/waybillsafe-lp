import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, ArrowRight, Loader2, X } from "lucide-react";
import { z } from "zod";
import emailjs from "@emailjs/browser";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email" }).max(255);

const EMAILJS_SERVICE_ID = "service_6yqtgcp";
const EMAILJS_TEMPLATE_ID = "template_acuaugz";
const EMAILJS_PUBLIC_KEY = "WSoxcq_bYe_pAzO-K";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const WaitlistModal = ({ isOpen, onClose, onSuccess }: WaitlistModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendWelcomeEmail = async (userEmail: string) => {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { to_email: userEmail, email: userEmail },
        EMAILJS_PUBLIC_KEY
      );
    } catch (err) {
      console.error("Failed to send welcome email:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { error: supabaseError } = await supabase
        .from("waitlist")
        .insert([{ email: validation.data }]);

      if (supabaseError) throw supabaseError;
      
      // Send welcome email via EmailJS
      await sendWelcomeEmail(validation.data);
      
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal - centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md relative overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors z-10"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Header */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-electric" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  Early Access
                </span>
              </div>

              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
                Join the <span className="text-gradient">Stealth Pilot</span>
              </h2>
              
              <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 text-center">
                Be among the first vendors to experience secure cross-border shipping
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourbrand.com"
                    className="input-glass"
                  />
                </div>

                {error && (
                  <div className="text-destructive text-sm text-center">
                    {error}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="btn-electric w-full flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Get Early Access</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Trust indicators */}
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span>🔒 No spam</span>
                <span>•</span>
                <span>First 100 users free</span>
              </div>

              {/* Decorative gradient */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-electric/20 to-transparent blur-3xl" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
