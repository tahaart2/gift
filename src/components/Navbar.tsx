import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { ScreenId } from '../types';
import { playPurrTap } from '../utils/audio';

interface NavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onReset: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
}

export function Navbar({
  currentScreen,
  onNavigate,
  onReset,
  soundOn,
  onToggleSound,
}: NavbarProps) {
  const steps: { id: ScreenId; fullLabel: string; shortLabel: string }[] = [
    { id: 'intro', fullLabel: '1. Hello', shortLabel: '1' },
    { id: 'memes', fullLabel: '2. Memes', shortLabel: '2' },
    { id: 'research', fullLabel: '3. Results', shortLabel: '3' },
    { id: 'final', fullLabel: '4. Message', shortLabel: '4' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#FFF8EF]/95 backdrop-blur-md border-b border-[#F8DCE8] transition-colors">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        {/* Brand Zone */}
        <button
          onClick={() => {
            playPurrTap();
            onNavigate('intro');
          }}
          className="flex items-center gap-1.5 sm:gap-2 text-left font-bold tracking-tight text-[#493A3D] hover:text-[#D88DAA] transition-colors whitespace-nowrap shrink-0"
          aria-label="Go to start: 404 Missing Piece Found"
        >
          <span className="text-xl" role="img" aria-label="cat">🐱</span>
          <span className="text-sm sm:text-base font-bold">
            <span className="hidden sm:inline">404 · Missing Piece</span>
            <span className="sm:hidden">404</span>
          </span>
        </button>

        {/* Navigation Steps */}
        <nav className="flex items-center gap-1 sm:gap-2 shrink-0" aria-label="Journey steps">
          {steps.map((step) => {
            const isActive = currentScreen === step.id;
            return (
              <button
                key={step.id}
                onClick={() => {
                  playPurrTap();
                  onNavigate(step.id);
                }}
                className={`px-2.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 min-h-[36px] transition-all ${
                  isActive
                    ? 'bg-[#F8DCE8] text-[#493A3D] shadow-xs ring-1 ring-[#D88DAA]/40'
                    : 'text-[#493A3D]/70 hover:text-[#493A3D] hover:bg-[#F8DCE8]/50'
                }`}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Step ${step.fullLabel}`}
              >
                <span className="hidden md:inline">{step.fullLabel}</span>
                <span className="md:hidden">{step.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Zone */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onToggleSound}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#493A3D]/80 hover:text-[#493A3D] hover:bg-[#F8DCE8]/70 active:scale-95 transition-all"
            title={soundOn ? 'Mute soothing chimes' : 'Enable soothing chimes'}
            aria-label={soundOn ? 'Mute soothing chimes' : 'Enable soothing chimes'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-[#D88DAA]" /> : <VolumeX className="w-4 h-4 text-[#493A3D]/50" />}
          </button>

          <button
            onClick={() => {
              playPurrTap();
              onReset();
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#493A3D]/80 hover:text-[#493A3D] hover:bg-[#F8DCE8]/70 active:scale-95 transition-all"
            title="Restart research"
            aria-label="Restart the research journey"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
