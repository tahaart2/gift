import { Sparkles, Terminal, ArrowRight } from 'lucide-react';
import { playChime, playPurrTap } from '../utils/audio';

interface Screen1IntroProps {
  onNext: () => void;
}

export function Screen1Intro({ onNext }: Screen1IntroProps) {
  const handleProceed = () => {
    playChime(587.33); // D5 chime
    onNext();
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center text-center">
      {/* Decorative Top Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8DCE8]/80 text-[#493A3D] text-xs font-semibold tracking-wide mb-5 ring-1 ring-[#D88DAA]/30 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#D88DAA]" />
        <span>Project: 404 — Missing Piece Found</span>
        <span className="text-[#D88DAA]">🌸</span>
      </div>

      {/* Main Heading & Subtitle */}
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#493A3D] mb-3 leading-tight">
        Hello, little human! <span className="inline-block hover:rotate-12 transition-transform cursor-default" onClick={playPurrTap}>🐱</span>
      </h1>
      <p className="text-base sm:text-lg text-[#493A3D]/80 max-w-xl mb-8 leading-relaxed font-medium">
        I have a very important scientific discovery to share with you.
      </p>

      {/* Cute Cat & Flowers Hero Illustration Card */}
      <div className="w-full max-w-lg mb-8 relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-[#F8DCE8] via-[#E9E2FF] to-[#DDEBD8] rounded-3xl blur-md opacity-60 group-hover:opacity-85 transition-opacity" />
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-md border border-[#F8DCE8]">
          <img
            src="/src/assets/images/cat_intro_flowers_1794478833523.jpg"
            alt="Cute fluffy kitten beside a mini pastel laptop surrounded by blooming pink peonies and roses"
            referrerPolicy="no-referrer"
            className="w-full h-auto aspect-4/3 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* Subtle caption bar */}
          <div className="px-4 py-2.5 bg-[#FFF8EF]/95 border-t border-[#F8DCE8] flex items-center justify-between text-xs text-[#493A3D]/80">
            <span className="font-semibold flex items-center gap-1.5">
              <span>🌸</span> Researcher Cat · In the Garden Office
            </span>
            <span className="font-mono-code text-[11px] text-[#D88DAA]">status: investigating</span>
          </div>
        </div>
      </div>

      {/* Small Terminal Card */}
      <div className="w-full max-w-md rounded-xl overflow-hidden bg-[#493A3D] text-[#FFF8EF] shadow-lg mb-8 text-left border border-[#D88DAA]/40 font-mono-code text-xs sm:text-sm">
        {/* Terminal Header */}
        <div className="bg-[#3A2E30] px-3.5 py-2 flex items-center justify-between border-b border-[#493A3D]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D88DAA]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E9E2FF]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#DDEBD8]" />
          </div>
          <span className="text-[11px] text-[#FFF8EF]/60 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-[#D88DAA]" /> research_terminal.sh
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 space-y-2 leading-relaxed">
          <p className="text-[#DDEBD8] font-bold">
            $ starting_deep_research.exe
          </p>
          <p className="text-[#FFF8EF]/80">
            Searching for missing code...
          </p>
          <p className="text-[#FFF8EF]/80">
            Analyzing possible bugs...
          </p>
          <p className="text-[#FFF8EF]/80">
            Running experiments...
          </p>
          <p className="text-[#F8DCE8] font-semibold pt-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D88DAA] animate-ping" />
            Research status: Almost complete.
          </p>
        </div>
      </div>

      {/* Call to action Button */}
      <button
        onClick={handleProceed}
        className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#D88DAA] to-[#B8587A] text-white font-bold text-base shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[48px] cursor-pointer"
        aria-label="Let's see what you found"
      >
        <span>Let's see what you found 🌸</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </section>
  );
}
