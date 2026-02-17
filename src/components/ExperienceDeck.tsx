import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroCard from "./cards/HeroCard";
import ProblemCard from "./cards/ProblemCard";
import SolutionCard from "./cards/SolutionCard";
import FlowCard from "./cards/FlowCard";
import WaitlistCard from "./cards/WaitlistCard";
import ThankYouModal from "./ThankYouModal";

const cards = [
  { id: "hero", Component: HeroCard },
  { id: "problem", Component: ProblemCard },
  { id: "solution", Component: SolutionCard },
  { id: "flow", Component: FlowCard },
  { id: "waitlist", Component: WaitlistCard },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const ExperienceDeck = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < cards.length) {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
    }
  }, [currentIndex]);

  const goNext = () => paginate(1);
  const goBack = () => paginate(-1);

  const handleWaitlistSuccess = () => {
    setShowThankYou(true);
  };

  const CurrentCard = cards[currentIndex].Component;
  const isLastCard = currentIndex === cards.length - 1;
  const isFirstCard = currentIndex === 0;

  return (
    <div className="fixed inset-0 flex flex-col bg-background overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Back button */}
        <div className="w-24">
          {!isFirstCard && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={goBack}
              className="btn-ghost flex items-center gap-1 text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </motion.button>
          )}
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-foreground hidden sm:block">
            WaybillSafe
          </span>
        </div>

        {/* Progress indicator */}
        <div className="w-24 flex justify-end">
          <div className="flex gap-1.5">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-electric w-6"
                    : index < currentIndex
                    ? "bg-electric/50"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="relative flex-1 flex items-center justify-center px-4 sm:px-6 py-4 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full max-w-md"
          >
            {currentIndex === 0 && <HeroCard />}
            {currentIndex === 1 && <ProblemCard />}
            {currentIndex === 2 && <SolutionCard />}
            {currentIndex === 3 && <FlowCard />}
            {currentIndex === 4 && <WaitlistCard onSuccess={handleWaitlistSuccess} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with navigation */}
      <footer className="relative z-10 px-4 sm:px-6 py-6">
        <div className="max-w-md mx-auto">
          {!isLastCard && (
            <motion.button
              onClick={goNext}
              className="btn-electric w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
          
          {isLastCard && (
            <p className="text-center text-xs text-muted-foreground">
              Fill out the form above to join our pilot program
            </p>
          )}
        </div>
      </footer>

      {/* Thank you modal */}
      <ThankYouModal 
        isOpen={showThankYou} 
        onClose={() => setShowThankYou(false)} 
      />
    </div>
  );
};

export default ExperienceDeck;