'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CharacterGrid() {
  const router = useRouter();

  const characters = [
    { name: 'Santa', img: '/gallery/one.avif', path: '/characters/santa' },
    { name: 'Alien', img: '/gallery/two.avif', path: '/characters/alien' },
    { name: 'Monk', img: '/gallery/three.avif', path: '/characters/monk' },
    { name: 'Navy Seal', img: '/gallery/four.avif', path: '/characters/navy-seal' },
    { name: 'Tribal Man', img: '/gallery/five.avif', path: '/characters/tribal-man' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-10 flex flex-wrap justify-center gap-5 sm:gap-6">
      {characters.map((char, i) => (
        <div
          key={i}
          onClick={() => router.push(char.path)}
          className="group relative overflow-hidden rounded-2xl border border-gray-200 
                     bg-white shadow-sm hover:shadow-lg transition-all duration-300 
                     hover:-translate-y-1 cursor-pointer w-[45%] sm:w-[30%] md:w-[28%] lg:w-[18%] 
                     max-w-[240px] aspect-[3/4]"
        >
          <Image
            src={char.img}
            alt={char.name}
            width={400}
            height={500}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-lg font-semibold tracking-wide">{char.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
