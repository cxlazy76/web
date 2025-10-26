'use client'

import { useRouter } from 'next/navigation'

type CharacterColor = 'red' | 'green' | 'yellow' | 'blue'

interface Character {
  name: string
  color: CharacterColor
  image: string
  path: string
}

export default function CharacterGrid() {
  const router = useRouter()

  const characters: Character[] = [
    { name: 'Santa', color: 'red', image: '/images/santa.png', path: '/characters/santa' },
    { name: 'Alien', color: 'green', image: '/images/alien.png', path: '/characters/alien' },
    { name: 'Monk', color: 'yellow', image: '/images/monk.png', path: '/characters/monk' },
    { name: 'Navy Seal', color: 'blue', image: '/images/navyseal.png', path: '/characters/navy-seal' },
  ]

  const colorStyles: Record<CharacterColor, string> = {
    red: 'from-red-900/30 via-red-800/10 to-red-950/20 border-red-400 shadow-[0_0_25px_rgba(255,90,90,0.6),inset_0_0_20px_rgba(255,120,120,0.2)]',
    green: 'from-emerald-900/30 via-emerald-800/10 to-emerald-950/20 border-emerald-400 shadow-[0_0_25px_rgba(80,255,150,0.6),inset_0_0_20px_rgba(100,255,180,0.2)]',
    yellow: 'from-amber-900/30 via-amber-800/10 to-amber-950/20 border-amber-400 shadow-[0_0_25px_rgba(255,230,120,0.6),inset_0_0_20px_rgba(255,255,150,0.2)]',
    blue: 'from-blue-900/30 via-blue-800/10 to-blue-950/20 border-blue-400 shadow-[0_0_25px_rgba(80,150,255,0.6),inset_0_0_20px_rgba(120,180,255,0.2)]',
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 justify-items-center">
      {characters.map((char) => (
        <div
          key={char.name}
          onClick={() => router.push(char.path)}
          className={`
            relative flex flex-col items-center justify-center 
            h-72 w-56 sm:h-80 sm:w-60 lg:h-84 lg:w-52 
            rounded-3xl border-2 bg-gradient-to-t ${colorStyles[char.color]} 
            transition-transform duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer 
            will-change-transform
          `}
        >
          <div className="relative w-36 h-52 sm:w-40 sm:h-56 mb-4 rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.7)] preserve-3d">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 z-10 pointer-events-none"></div>
            <img
              src={char.image}
              alt={char.name}
              className="w-full h-full object-cover transform-gpu will-change-transform transition-transform duration-300"
            />
          </div>

          <p className="text-white text-base sm:text-lg font-semibold tracking-wide drop-shadow-[0_0_2px_rgba(255,255,255,0.25)] text-center">
            {char.name}
          </p>
        </div>
      ))}
    </div>
  )
}
