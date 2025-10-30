'use client';

import { useState, useEffect } from 'react';

export default function MonkPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const API_URL = '/api/generate';

  // === Progress animation ===
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 70) return prev + 3;
          if (prev < 90) return prev + 1;
          if (prev < 97) return prev + 0.2;
          return prev;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // === Generate video ===
  const handleGenerate = async () => {
    if (!name.trim() || !surname.trim()) {
      alert('Please enter both first name and surname');
      return;
    }

    setError(null);
    setVideoUrl(null);
    setLoading(true);
    setProgress(0);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, character: 'monk' }),
      });

      const data = await res.json();

      const success = data.success ?? data.data?.success ?? false;
      const videoUrl = data.video_url ?? data.data?.video_url ?? null;

      if (success && videoUrl) {
        setProgress(100);
        setTimeout(() => {
          setVideoUrl(videoUrl);
          setLoading(false);
        }, 500);
      } else {
        setError('Something went wrong while generating your video.');
        setLoading(false);
      }
    } catch {
      setError('Server not reachable.');
      setLoading(false);
    }
  };

  // === Download video ===
  const handleDownload = async () => {
    if (!videoUrl) return;
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Monk_Message.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch {
      setError('Download failed.');
    }
  };

  return (
    <div
      className="
        bg-white text-black flex flex-col items-center justify-center
        min-h-screen md:h-screen md:overflow-hidden px-6 py-10
      "
    >
      <div
        className="
          w-full max-w-5xl bg-white border border-gray-200 rounded-3xl shadow-lg
          flex flex-col md:flex-row items-center justify-center
          gap-10 p-6 md:p-10
        "
      >
        {/* === Monk video === */}
        <div className="flex justify-center flex-shrink-0 relative w-full md:w-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-md w-full sm:w-60 md:w-64 aspect-[9/16] bg-gray-100 mx-auto">
            {!videoUrl ? (
              <>
                <img
                  src="/gallery/three.avif"
                  alt="Wise Monk"
                  className="w-full h-full object-cover rounded-2xl"
                />
                {loading && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                    <div className="w-10 h-10 border-4 border-white/40 border-t-white rounded-full animate-spin mb-3"></div>
                    <p className="text-base font-medium">Generating Video...</p>
                    <p className="text-sm mt-1 opacity-80">{progress.toFixed(0)}%</p>
                  </div>
                )}
              </>
            ) : (
              <video
                src={videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full rounded-2xl object-contain bg-black"
              />
            )}
          </div>
        </div>

        {/* === Form Section === */}
        <div className="flex flex-col justify-center items-start w-full md:w-1/2 space-y-4 text-left">
          {/* ✅ Same structure as Santa */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-2">
            The Calm Monk
          </h1>

          <div className="text-gray-700 text-lg leading-relaxed text-left">
            <p className="font-semibold text-black">
              The Monk will deliver a peaceful message to your friend!
            </p>
            <p>Enter your friend's first name and surname.</p>
          </div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name"
            className="w-full bg-gray-100 text-black rounded-lg px-4 py-3 outline-none 
                       border border-gray-300 focus:border-[#e5ff00] focus:ring-2 
                       focus:ring-[#e5ff00] placeholder-gray-500 transition-all"
          />

          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Surname"
            className="w-full bg-gray-100 text-black rounded-lg px-4 py-3 outline-none 
                       border border-gray-300 focus:border-[#e5ff00] focus:ring-2 
                       focus:ring-[#e5ff00] placeholder-gray-500 transition-all"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-[#e5ff00] hover:bg-[#d9f000] text-black 
                       font-semibold text-lg px-6 py-3 rounded-lg transition-all disabled:opacity-60"
          >
            {loading ? 'Generating...' : 'Generate My Monk Video'}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {videoUrl && (
            <button
              onClick={handleDownload}
              className="text-gray-800 underline hover:text-black transition mt-2 text-base"
            >
              Download Video
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
