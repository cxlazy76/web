'use client'

import { useState, useEffect } from 'react'

export default function SantaPage() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5678/webhook-test/generate'

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (loading) {
      setProgress(0)
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 70) return prev + 3
          if (prev < 90) return prev + 1
          if (prev < 97) return prev + 0.2
          return prev
        })
      }, 80)
    }
    return () => clearInterval(interval)
  }, [loading])

  const handleGenerate = async () => {
    if (!name.trim() || !surname.trim()) {
      alert('Please enter both first name and surname')
      return
    }

    setError(null)
    setVideoUrl(null)
    setLoading(true)
    setProgress(0)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname }),
      })

      const data = await res.json()
      if (data.success && data.video_url) {
        setProgress(100)
        setTimeout(() => {
          setVideoUrl(data.video_url)
          setLoading(false)
        }, 500)
      } else {
        setError('Something went wrong while generating your video.')
        setLoading(false)
      }
    } catch (err) {
      setError('Server not reachable.')
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!videoUrl) return
    try {
      const response = await fetch(videoUrl)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = 'Santa_Message.mp4'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(blobUrl)
    } catch (err) {
      console.error('Download failed:', err)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F1F] text-white flex flex-col items-center py-20 px-6">
      <h1 className="text-5xl md:text-6xl font-bold mb-16 text-center">
        Santa Claus
      </h1>

      <div className="w-full max-w-4xl bg-[#11162A] rounded-2xl p-10 flex flex-col md:flex-row items-center justify-center gap-10 shadow-[0_0_25px_rgba(0,0,100,0.25)]">
        {/* Santa image or video with overlay */}
        <div className="flex justify-center md:justify-end flex-shrink-0 relative">
          <div
            className="relative rounded-xl overflow-hidden shadow-[0_0_25px_rgba(80,100,180,0.3)] w-64 md:w-72"
            style={{ minHeight: '360px' }} // keeps consistent size
          >
            {!videoUrl ? (
              <>
                <img
                  src="/images/santa.png"
                  alt="Santa Claus"
                  className="w-full h-full object-cover rounded-xl"
                />
                {loading && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white">
                    <div className="w-12 h-12 border-4 border-white/40 border-t-white rounded-full animate-spin mb-4"></div>
                    <p className="text-lg font-semibold">Generating Video...</p>
                    <p className="text-sm mt-1 opacity-80">
                      {progress.toFixed(0)}%
                    </p>
                  </div>
                )}
              </>
            ) : (
              <video
                src={videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full rounded-xl object-cover"
              />
            )}
          </div>
        </div>

        {/* Right side form */}
        <div className="flex flex-col justify-center items-start w-full md:w-1/2 space-y-5 text-left">
          <p className="text-lg leading-relaxed">
            🎅 <span className="font-semibold">Santa’s ready!</span> Enter your
            first name and surname so he can record a personal message just for you.
          </p>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name"
            className="w-full bg-[#0A0D1C] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Surname"
            className="w-full bg-[#0A0D1C] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-60"
          >
            {loading ? 'Generating...' : 'Generate My Christmas Video'}
          </button>

          {error && <p className="text-rose-400 text-sm">{error}</p>}
          {videoUrl && (
            <button
              onClick={handleDownload}
              className="text-green-400 underline mt-2 hover:text-green-300 transition"
            >
              Download Video
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
