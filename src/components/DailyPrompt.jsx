import React, { useEffect, useState } from 'react'

export default function DailyPrompt() {
  const [prompt, setPrompt] = useState('Loading...')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchPrompt = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/daily-prompt`)
      const data = await res.json()
      setPrompt(data.prompt)
    } catch (e) {
      setPrompt('Unable to load prompt. Check backend.')
    }
  }

  useEffect(() => {
    fetchPrompt()
  }, [])

  return (
    <section className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
      <h2 className="text-white font-semibold mb-2">Daily Prompt</h2>
      <p className="text-blue-200">{prompt}</p>
      <button onClick={fetchPrompt} className="mt-4 text-sm px-3 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white">New prompt</button>
    </section>
  )
}
