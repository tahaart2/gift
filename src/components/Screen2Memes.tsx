import { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, Heart } from 'lucide-react';
import { BASE_MEMES, EXTRA_MEMES } from '../utils/researchMachine';
import { CatMeme } from '../types';
import { playChime, playPurrTap } from '../utils/audio';

interface Screen2MemesProps {
  onNext: () => void;
  onPrev: () => void;
}

export function Screen2Memes({ onNext, onPrev }: Screen2MemesProps) {
  // Current active memes display (initial 3 + user can generate more)
  const [activeMemes, setActiveMemes] = useState<CatMeme[]>(BASE_MEMES);
  const [extraIndex, setExtraIndex] = useState(0);
  const [likes, setLikes] = useState<Record<string, number>>({
    'meme-1': 17,
    'meme-2': 42,
    'meme-3': 99,
  });

  const handleGiveAnotherCat = () => {
    playPurrTap();
    const nextBonus = EXTRA_MEMES[extraIndex % EXTRA_MEMES.length];
    setExtraIndex((prev) => prev + 1);

    // If already in list, put it on top or append with unique key
    const newMeme: CatMeme = {
      ...nextBonus,
      id: `bonus-${Date.now()}`,
    };
    setActiveMemes((prev) => [newMeme, ...prev.slice(0, 5)]);
    setLikes((prev) => ({ ...prev, [newMeme.id]: Math.floor(Math.random() * 20) + 10 }));
  };

  const handleLike = (id: string) => {
    playPurrTap();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleProceed = () => {
    playChime(659.25); // E5
    onNext();
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center text-center">
      {/* Kicker Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9E2FF]/80 text-[#493A3D] text-xs font-semibold mb-3 ring-1 ring-[#D88DAA]/30">
        <Sparkles className="w-3.5 h-3.5 text-[#D88DAA]" />
        <span>Scientific Debugging Humor</span>
        <span>🐾</span>
      </div>

      {/* Main Title & Subtitle */}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#493A3D] mb-2">
        The Cat Meme Corner 🐱
      </h2>
      <p className="text-sm sm:text-base text-[#493A3D]/80 max-w-lg mb-6 font-medium">
        Behind every complex codebase is a kitten wondering why line 14 refuses to run.
      </p>

      {/* "Give me another cat" Simple Button */}
      <div className="mb-8">
        <button
          onClick={handleGiveAnotherCat}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFF8EF] border-2 border-[#D88DAA] text-[#493A3D] font-bold text-sm shadow-xs hover:bg-[#F8DCE8] active:scale-95 transition-all min-h-[44px] cursor-pointer"
          aria-label="Give me another cat"
        >
          <RefreshCw className="w-4 h-4 text-[#D88DAA]" />
          <span>Give me another cat 🐱</span>
        </button>
      </div>

      {/* Meme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10 text-left">
        {activeMemes.slice(0, 3).map((meme, idx) => (
          <article
            key={meme.id}
            className="group rounded-2xl bg-white border border-[#F8DCE8] shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
          >
            {/* Image Box */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-[#FFF8EF]">
              <img
                src={meme.image}
                alt={meme.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#FFF8EF]/90 text-[11px] font-mono-code font-semibold text-[#493A3D] shadow-xs">
                Meme {idx + 1}
              </span>
            </div>

            {/* Meme Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#D88DAA] block mb-1.5">
                  {meme.tag}
                </span>
                <p className="text-base font-bold text-[#493A3D] leading-snug mb-2">
                  "{meme.caption}"
                </p>
                {meme.subtext && (
                  <p className="text-xs text-[#493A3D]/70 italic leading-relaxed">
                    {meme.subtext}
                  </p>
                )}
              </div>

              {/* Heart tap interaction */}
              <div className="pt-4 mt-2 border-t border-[#F8DCE8]/60 flex items-center justify-between">
                <button
                  onClick={() => handleLike(meme.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D88DAA] hover:text-[#B8587A] transition-colors active:scale-90 min-h-[36px] px-2 -ml-2 rounded-lg hover:bg-[#F8DCE8]/40"
                  aria-label={`Like meme: ${meme.caption}`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{likes[meme.id] || 0}</span>
                </button>
                <span className="text-[11px] text-[#493A3D]/50 font-mono-code">100% verified</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <button
          onClick={() => {
            playPurrTap();
            onPrev();
          }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FFF8EF] border border-[#F8DCE8] text-[#493A3D] font-semibold text-sm hover:bg-[#F8DCE8]/50 active:scale-95 transition-all min-h-[48px]"
          aria-label="Back to introduction"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleProceed}
          className="group inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-[#D88DAA] to-[#B8587A] text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[48px] cursor-pointer"
          aria-label="Continue to Research Results"
        >
          <span>Continue to Research Results 🔬</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
