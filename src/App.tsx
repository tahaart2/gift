import { useState, useEffect } from 'react';
import { ScreenId } from './types';
import { Navbar } from './components/Navbar';
import { FloatingPetals } from './components/FloatingPetals';
import { Screen1Intro } from './components/Screen1Intro';
import { Screen2Memes } from './components/Screen2Memes';
import { Screen3Research } from './components/Screen3Research';
import { Screen4Final } from './components/Screen4Final';
import { getNextScreen, getPrevScreen, getProgressPercentage } from './utils/researchMachine';
import { isSoundEnabled, setSoundEnabled } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('intro');
  const [soundOn, setSoundOn] = useState<boolean>(true);

  // Parse query params for ?autostart=1 or ?screen=...
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const screenParam = params.get('screen') as ScreenId;
      if (params.get('autostart') === '1') {
        setCurrentScreen('memes');
      } else if (screenParam && ['intro', 'memes', 'research', 'final'].includes(screenParam)) {
        setCurrentScreen(screenParam);
      }
    }
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
  };

  const handleNext = () => {
    setCurrentScreen((curr) => getNextScreen(curr));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setCurrentScreen((curr) => getPrevScreen(curr));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCurrentScreen('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        setCurrentScreen((curr) => getNextScreen(curr));
      } else if (e.key === 'ArrowLeft') {
        setCurrentScreen((curr) => getPrevScreen(curr));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const progress = getProgressPercentage(currentScreen);

  return (
    <div className="min-h-screen bg-[#FFF8EF] text-[#493A3D] flex flex-col relative selection:bg-[#F8DCE8] selection:text-[#493A3D]">
      {/* Delicate floating background petals */}
      <FloatingPetals />

      {/* Top Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onReset={handleReset}
        soundOn={soundOn}
        onToggleSound={handleToggleSound}
      />

      {/* Progress Bar Indicator */}
      <div className="w-full bg-[#F8DCE8]/40 h-1 overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="bg-gradient-to-r from-[#D88DAA] to-[#B8587A] h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center relative z-10 py-4 sm:py-8">
        {currentScreen === 'intro' && <Screen1Intro onNext={handleNext} />}
        {currentScreen === 'memes' && <Screen2Memes onNext={handleNext} onPrev={handlePrev} />}
        {currentScreen === 'research' && <Screen3Research onNext={handleNext} onPrev={handlePrev} />}
        {currentScreen === 'final' && <Screen4Final onRestart={handleReset} onPrev={handlePrev} />}
      </main>

      {/* Quiet Footer */}
      <footer className="w-full py-4 px-6 border-t border-[#F8DCE8]/80 text-center text-xs text-[#493A3D]/60 relative z-10 flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto gap-2">
        <span>404 — Missing Piece Found · Made with care & flowers 🌸</span>
        <div className="flex items-center gap-3">
          <span>Cats: Unlimited 🐱</span>
          <span aria-hidden="true">·</span>
          <span>Bugs: 0 (hopefully)</span>
        </div>
      </footer>
    </div>
  );
}
