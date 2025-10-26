'use client'

import CharacterGrid from './CharacterGrid'

export default function LandingPage() {
  return (
    <div className="bg-[#0b0d23] text-white min-h-screen flex flex-col items-center justify-center px-6">
      <main className="w-full max-w-5xl text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 leading-tight">
          Create personalised AI videos in seconds
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Pick a character — type a message — we generate your video.
        </p>

        <CharacterGrid />
      </main>
    </div>
  )
}
