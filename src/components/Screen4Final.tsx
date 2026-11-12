import { useState } from 'react';
import { Heart, RotateCcw, Copy, Check, Sparkles, ArrowLeft } from 'lucide-react';
import { ARABIC_DUA_MAIN, ARABIC_DUA_SUB, PERSONAL_MESSAGE, TERMINAL_SIGNATURE } from '../utils/researchMachine';
import { playChime, playPurrTap } from '../utils/audio';

interface Screen4FinalProps {
  onRestart: () => void;
  onPrev: () => void;
}

export function Screen4Final({ onRestart, onPrev }: Screen4FinalProps) {
  const [copied, setCopied] = useState(false);
  const [blessingHearts, setBlessingHearts] = useState(3);

  const handleCopyDua = async () => {
    playPurrTap();
    const fullDuaText = `${ARABIC_DUA_MAIN}\n${ARABIC_DUA_SUB}`;
    try {
      await navigator.clipboard.writeText(fullDuaText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleHeartReaction = () => {
    playPurrTap();
    setBlessingHearts((prev) => prev + 1);
  };

  const handleRestartClick = () => {
    playChime(523.25);
    onRestart();
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-12 flex flex-col items-center text-center">
      {/* Top Floral Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8DCE8]/80 text-[#493A3D] text-xs font-semibold mb-6 ring-1 ring-[#D88DAA]/30 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#D88DAA]" />
        <span>A Gentle Message</span>
        <span>🌸</span>
      </div>

      {/* Cat Hugging Flowers Illustration Card */}
      <div className="w-full max-w-md mb-8 relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-[#F8DCE8] via-[#FFF8EF] to-[#E9E2FF] rounded-3xl blur-md opacity-80" />
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-md border border-[#F8DCE8]">
          <img
            src="/src/assets/images/cat_flowers_final_1794478836081.jpg"
            alt="Sweet smiling white kitten lovingly hugging a lush bouquet of pink roses and garden blossoms"
            referrerPolicy="no-referrer"
            className="w-full h-auto aspect-4/3 object-cover"
          />
          <div className="px-4 py-2 bg-[#FFF8EF] border-t border-[#F8DCE8] flex items-center justify-between text-xs text-[#493A3D]/70 font-mono-code">
            <span>Warm Wishes · Garden of Peace</span>
            <span className="text-[#D88DAA]">Flowers: 100%</span>
          </div>
        </div>
      </div>

      {/* Sincere Reflections Card */}
      <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xs border border-[#F8DCE8] shadow-sm mb-8 space-y-4 text-center">
        <p className="text-lg sm:text-xl font-medium text-[#493A3D]/90 leading-relaxed">
          Maybe some things don't need complicated algorithms.
        </p>

        <p className="text-base sm:text-lg text-[#D88DAA] font-semibold leading-relaxed">
          Sometimes, all you need is a little kindness and good intentions.
        </p>
      </div>

      {/* The Arabic Dua Section with Exquisite Calligraphy Styling */}
      <div className="w-full max-w-xl p-6 sm:p-9 rounded-3xl bg-gradient-to-b from-[#FFF8EF] to-[#F8DCE8]/40 border-2 border-[#D88DAA]/40 shadow-md mb-8 relative overflow-hidden">
        {/* Subtle Decorative Floral Background corners */}
        <div className="absolute top-2 left-2 text-[#D88DAA]/20 text-3xl select-none" aria-hidden="true">
          ❦
        </div>
        <div className="absolute bottom-2 right-2 text-[#D88DAA]/20 text-3xl select-none" aria-hidden="true">
          ❦
        </div>

        {/* Arabic Dua */}
        <div dir="rtl" className="space-y-4 my-2">
          <p className="font-arabic text-2xl sm:text-3xl lg:text-4xl leading-[1.8] text-[#493A3D] font-bold tracking-wide">
            {ARABIC_DUA_MAIN}
          </p>

          <div className="w-16 h-0.5 bg-[#D88DAA]/40 mx-auto my-3" />

          <p className="font-arabic text-xl sm:text-2xl text-[#B8587A] font-semibold leading-[1.8]">
            {ARABIC_DUA_SUB}
          </p>
        </div>

        {/* Copy Dua Action */}
        <div className="pt-4 flex items-center justify-center gap-2">
          <button
            onClick={handleCopyDua}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#F8DCE8] text-xs font-medium text-[#493A3D] hover:text-[#D88DAA] hover:bg-white active:scale-95 transition-all min-h-[36px]"
            aria-label="Copy Arabic dua text"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied with care</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#D88DAA]" />
                <span>Copy Dua</span>
              </>
            )}
          </button>

          <button
            onClick={handleHeartReaction}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#F8DCE8] text-xs font-medium text-[#D88DAA] hover:bg-white active:scale-95 transition-all min-h-[36px]"
            aria-label="Send heart blessing"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{blessingHearts}</span>
          </button>
        </div>
      </div>

      {/* Sincere Personal Message */}
      <div className="w-full max-w-lg mb-8 p-5 rounded-2xl bg-white border border-[#F8DCE8] shadow-xs">
        <p className="text-xl sm:text-2xl font-bold text-[#493A3D] tracking-tight">
          {PERSONAL_MESSAGE}
        </p>
      </div>

      {/* Section 7: Final Small Detail — Terminal Signature */}
      <div className="w-full max-w-md rounded-2xl overflow-hidden bg-[#493A3D] text-[#FFF8EF] shadow-md mb-8 text-left font-mono-code text-xs sm:text-sm border border-[#D88DAA]/40">
        <div className="bg-[#3A2E30] px-3.5 py-2 flex items-center justify-between border-b border-[#493A3D]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D88DAA]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E9E2FF]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#DDEBD8]" />
          </div>
          <span className="text-[11px] text-[#FFF8EF]/60">research_summary.exe</span>
        </div>

        <div className="p-4 sm:p-5 space-y-1.5 leading-relaxed">
          {TERMINAL_SIGNATURE.map((line, idx) => (
            <p
              key={idx}
              className={`min-h-[1rem] ${
                line.startsWith('$')
                  ? 'text-[#DDEBD8] font-bold'
                  : line.includes('FOUND')
                  ? 'text-[#F8DCE8] font-bold'
                  : line.includes('Status')
                  ? 'text-[#E9E2FF] font-semibold pt-2'
                  : 'text-[#FFF8EF]/85'
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Navigation & Restart Button */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <button
          onClick={() => {
            playPurrTap();
            onPrev();
          }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FFF8EF] border border-[#F8DCE8] text-[#493A3D] font-semibold text-sm hover:bg-[#F8DCE8]/50 active:scale-95 transition-all min-h-[48px]"
          aria-label="Back to research results"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleRestartClick}
          className="group inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-[#D88DAA] to-[#B8587A] text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[48px] cursor-pointer"
          aria-label="Start the research again"
        >
          <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" />
          <span>Start the research again ↻</span>
        </button>
      </div>
    </section>
  );
}
