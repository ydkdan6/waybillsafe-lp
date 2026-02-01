import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";

interface WaitlistCardProps {
  onSuccess: () => void;
}

const WaitlistCard = ({ onSuccess }: WaitlistCardProps) => {
  const [email, setEmail] = useState("");
  const [brandName, setBrandName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error: supabaseError } = await supabase
        .from("waitlist")
        .insert([
          {
            email,
            brand_name: brandName || null,
            phone_number: phoneNumber || null,
          },
        ]);

      if (supabaseError) throw supabaseError;
      
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card w-full max-w-md mx-auto p-8 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-4"
      >
        <Sparkles className="w-5 h-5 text-electric" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
          Early Access
        </span>
      </motion.div>

      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center">
        Join the <span className="text-gradient">Stealth Pilot</span>
      </h2>
      
      <p className="text-muted-foreground text-sm mb-8 text-center">
        Be among the first vendors to experience secure cross-border shipping
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourbrand.com"
            className="input-glass"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
            Brand Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Your brand or business name"
            className="input-glass"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
            Phone Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+234 XXX XXX XXXX"
            className="input-glass"
          />
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isLoading}
          className="btn-electric w-full flex items-center justify-center gap-2 mt-6"
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
      <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
        <span> No spam</span>
        <span>•</span>
        <span>Easy onboarding</span>
      </div>
    </div>
  );
};

export default WaitlistCard;