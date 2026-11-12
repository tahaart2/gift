import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Terminal, CheckCircle2, ArrowRight, ArrowLeft, Heart, Puzzle } from 'lucide-react';
import { playSuccessChime, playPurrTap, playChime } from '../utils/audio';

interface Screen3ResearchProps {
  onNext: () => void;
  onPrev: () => void;
}

export function Screen3Research({ onNext, onPrev }: Screen3ResearchProps) {
  // Terminal logs typing animation state
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [puzzleLocked, setPuzzleLocked] = useState(false);

  const terminalLogs = [
    '> Searching...',
    '> Debugging...',
    '> Testing...',
    '> Searching again...',
    '> Found something interesting! ✨',
  ];

  // Progressive terminal animation
  useEffect(() => {
    if (terminalIndex < terminalLogs.length - 1) {
      const timer = setTimeout(() => {
        setTerminalIndex((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else if (!puzzleLocked) {
      // Trigger puzzle snap after terminal completes
      const snapTimer = setTimeout(() => {
        handleSnapPuzzle();
      }, 800);
      return () => clearTimeout(snapTimer);
    }
  }, [terminalIndex, puzzleLocked]);

  const handleSnapPuzzle = () => {
    setPuzzleLocked(true);
    playSuccessChime();

    // Fire floral petal confetti
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#F8DCE8', '#D88DAA', '#E9E2FF', '#DDEBD8', '#FFCCD5'],
      shapes: ['circle'],
      scalar: 1.2,
      disableForReducedMotion: true,
    });
  };

  const handleProceed = () => {
    playChime(783.99); // G5
    onNext();
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center text-center">
      {/* Research Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDEBD8]/80 text-[#493A3D] text-xs font-semibold mb-4 ring-1 ring-[#D88DAA]/30">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
        <span>Investigation Phase · Complete</span>
      </div>

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#493A3D] mb-4">
        After extensive research...
      </h2>

      {/* Scientist Cat Illustration */}
      <div className="w-full max-w-md mb-6 relative group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D88DAA]/40 via-[#F8DCE8] to-[#E9E2FF] rounded-3xl blur-md opacity-75" />
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-md border border-[#F8DCE8]">
          <img
            src="/src/assets/images/cat_scientist_glasses_1794478834869.jpg"
            alt="Intelligent fluffy researcher kitten wearing tiny round spectacles typing on laptop with cherry blossoms"
            referrerPolicy="no-referrer"
            className="w-full h-auto aspect-4/3 object-cover"
          />
          <div className="px-4 py-2 bg-[#FFF8EF] border-t border-[#F8DCE8] flex items-center justify-between text-xs text-[#493A3D]/70 font-mono-code">
            <span>Dr. Whiskers, Ph.D.</span>
            <span className="text-[#D88DAA]">Senior Bug Detective</span>
          </div>
        </div>
      </div>

      {/* Small Animated Terminal */}
      <div className="w-full max-w-md rounded-xl overflow-hidden bg-[#493A3D] text-[#FFF8EF] shadow-md mb-8 text-left font-mono-code text-xs sm:text-sm border border-[#D88DAA]/30">
        <div className="bg-[#3A2E30] px-3.5 py-2 flex items-center justify-between border-b border-[#493A3D]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D88DAA]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E9E2FF]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#DDEBD8]" />
          </div>
          <span className="text-[11px] text-[#FFF8EF]/60 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-[#D88DAA]" /> deep_analysis.log
          </span>
        </div>

        <div className="p-4 space-y-1.5 min-h-[140px] flex flex-col justify-center">
          {terminalLogs.slice(0, terminalIndex + 1).map((log, i) => (
            <p
              key={i}
              className={`${
                i === terminalLogs.length - 1
                  ? 'text-[#F8DCE8] font-bold text-sm pt-1'
                  : 'text-[#FFF8EF]/80'
              }`}
            >
              {log}
            </p>
          ))}
          {terminalIndex < terminalLogs.length - 1 && (
            <span className="inline-block w-2 h-4 bg-[#D88DAA] animate-pulse" />
          )}
        </div>
      </div>

      {/* The Core Storytelling Reveal Box */}
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-[#F8DCE8] shadow-md mb-8 relative overflow-hidden text-center">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8DCE8]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E9E2FF]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <p className="text-lg sm:text-xl font-medium text-[#493A3D]/90 mb-3 leading-relaxed">
            "I've been doing deep research to find the missing piece of my code..."
          </p>

          <p className="text-xl sm:text-2xl font-bold text-[#D88DAA] mb-6 leading-snug">
            "And I think I finally found it."
          </p>

          {/* Interactive Missing Puzzle Piece Snapping Animation */}
          <div className="flex flex-col items-center justify-center my-4">
            <div
              onClick={handleSnapPuzzle}
              className={`cursor-pointer relative p-5 rounded-2xl transition-all duration-700 flex items-center justify-center gap-3 ${
                puzzleLocked
                  ? 'bg-gradient-to-r from-[#F8DCE8] via-[#FFF8EF] to-[#E9E2FF] border-2 border-[#D88DAA] scale-105 shadow-md'
                  : 'bg-[#FFF8EF] border-2 border-dashed border-[#D88DAA]/60 hover:border-[#D88DAA]'
              }`}
            >
              <div
                className={`transition-transform duration-700 ${
                  puzzleLocked
                    ? 'rotate-0 translate-y-0 scale-100 text-[#D88DAA]'
                    : '-translate-y-4 -rotate-12 scale-90 text-[#493A3D]/40'
                }`}
              >
                <Puzzle className="w-10 h-10 fill-current" />
              </div>

              <div className="text-left">
                <span className="text-xs font-mono-code font-bold text-[#D88DAA] block">
                  {puzzleLocked ? 'STATUS: SNAPPED INTO PLACE' : 'CLICK TO CONNECT'}
                </span>
                <span className="text-sm font-bold text-[#493A3D]">
                  {puzzleLocked ? 'Missing piece: FOUND ❤️' : 'Searching socket #404...'}
                </span>
              </div>

              {puzzleLocked && (
                <Heart className="w-6 h-6 text-[#D88DAA] fill-current animate-bounce" />
              )}
            </div>
            <p className="text-xs text-[#493A3D]/60 mt-2 font-medium">
              {puzzleLocked ? 'Everything fits perfectly now.' : 'Tap the puzzle piece to snap it in!'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <button
          onClick={() => {
            playPurrTap();
            onPrev();
          }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FFF8EF] border border-[#F8DCE8] text-[#493A3D] font-semibold text-sm hover:bg-[#F8DCE8]/50 active:scale-95 transition-all min-h-[48px]"
          aria-label="Back to cat memes"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleProceed}
          className="group inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-[#D88DAA] to-[#B8587A] text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[48px] cursor-pointer"
          aria-label="Read the final message"
        >
          <span>Read the final message 💌</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
