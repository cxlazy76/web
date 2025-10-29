'use client';

import CharacterGrid from './CharacterGrid';

export default function LandingPage() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-20 max-w-7xl mx-auto">
      {/* ===== Hero Section ===== */}
      <h1
        className="font-extrabold 
                   text-[2.6rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4rem]
                   tracking-tight text-black mb-10 leading-[1.1]"
      >
        Prank your friend with AI characters
      </h1>

      <p className="text-gray-500 text-lg sm:text-lg md:text-xl mb-3">
        Pick a character → Type text → Generate a video
      </p>

      {/* ===== Character Grid ===== */}
      <CharacterGrid />
    </div>
  );
}
