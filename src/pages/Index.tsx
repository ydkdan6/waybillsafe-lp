import { useState, useEffect } from "react";
import ExperienceDeck from "@/components/ExperienceDeck";
import WaitlistModal from "@/components/WaitlistModal";
import ThankYouModal from "@/components/ThankYouModal";

const Index = () => {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Show waitlist modal on page load with a small delay for better UX
    const timer = setTimeout(() => {
      setShowWaitlistModal(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleWaitlistSuccess = () => {
    setShowWaitlistModal(false);
    setShowThankYou(true);
  };

  return (
    <>
      <ExperienceDeck />
      <WaitlistModal 
        isOpen={showWaitlistModal} 
        onClose={() => setShowWaitlistModal(false)}
        onSuccess={handleWaitlistSuccess}
      />
      <ThankYouModal 
        isOpen={showThankYou} 
        onClose={() => setShowThankYou(false)} 
      />
    </>
  );
};

export default Index;
