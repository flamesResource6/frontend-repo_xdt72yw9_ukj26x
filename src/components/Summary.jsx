import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Summary() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/summary`)
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        setSummary(data)
      } catch (e) {
        setError('Unable to reach backend yet. It may still be starting...')
      } finally {
        setLoading(false)
      }
    }
    fetchSummary()
  }, [])

  if (loading) return (
    <div className="text-blue-200">Loading summary...</div>
  )

  if (error) return (
    <div className="text-red-300">{error}</div>
  )

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">Your Practice Overview</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-slate-900/50 rounded-lg p-4">
          <div className="text-3xl font-bold text-white">{summary?.counts?.intentions ?? 0}</div>
          <div className="text-blue-300/70 text-sm">Intentions</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4">
          <div className="text-3xl font-bold text-white">{summary?.counts?.affirmations ?? 0}</div>
          <div className="text-blue-300/70 text-sm">Affirmations</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4">
          <div className="text-3xl font-bold text-white">{summary?.counts?.sessions ?? 0}</div>
          <div className="text-blue-300/70 text-sm">Sessions</div>
        </div>
      </div>
      {summary?.recent_sessions?.length ? (
        <div className="mt-6">
          <div className="text-blue-200/80 text-sm mb-2">Recent Sessions</div>
          <ul className="space-y-2 max-h-40 overflow-auto pr-2">
            {summary.recent_sessions.map((s) => (
              <li key={s.id} className="flex items-center justify-between bg-slate-900/40 rounded-md px-3 py-2">
                <span className="text-white text-sm">{s.practice_type} • {s.minutes} min</span>
                <span className="text-blue-300/70 text-xs">{new Date(s.created_at || s.updated_at || Date.now()).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
