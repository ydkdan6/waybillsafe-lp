import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, ArrowRight, Loader2, X } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().trim().email({
  message: "Please enter a valid email"
}).max(255);

const EMAILJS_SERVICE_ID = "service_icorah9";
const EMAILJS_TEMPLATE_ID = "template_acuaugz";
const EMAILJS_PUBLIC_KEY = "WSoxcq_bYe_pAzO-K";

// Type declaration for emailjs on window
declare global {
  interface Window {
    emailjs: {
      send: (
        serviceID: string,
        templateID: string,
        templateParams: Record<string, any>,
        publicKey: string
      ) => Promise<any>;
      init: (publicKey: string) => void;
    };
  }
}

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
      // Check if emailjs is loaded
      if (typeof window.emailjs === "undefined") {
        console.error("EmailJS not loaded. Make sure the CDN script is included in index.html");
        return;
      }

      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: userEmail,
          email: userEmail
        },
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

      if (supabaseError) {
        // Handle duplicate email error
        if (supabaseError.code === "23505") {
          setError("This email is already on the waitlist!");
          setIsLoading(false);
          return;
        }
        throw supabaseError;
      }

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal - centered */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md pointer-events-auto"
            >
              <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-4">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Early Access</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Join the Stealth Pilot
                  </h2>
                  <p className="text-gray-400">
                    Be among the first vendors to experience secure cross-border shipping
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourbrand.com"
                      className="input-glass"
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400"
                    >
                      {error}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full group"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Get Early Access
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                {/* Trust indicators */}
                <p className="text-center text-xs text-gray-500 mt-4">
                  🔒 No spam • First 100 users free
                </p>

                {/* Decorative gradient */}
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;