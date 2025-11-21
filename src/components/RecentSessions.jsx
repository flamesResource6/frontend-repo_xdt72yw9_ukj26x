import React, { useEffect, useState } from 'react'

export default function RecentSessions() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])

  const load = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/sessions?user_id=demo-user&limit=10`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => { load() }, [])

  return (
    <section className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-semibold">Recent Sessions</h2>
        <button onClick={load} className="text-xs px-2 py-1 rounded bg-slate-700 text-white">Refresh</button>
      </div>
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-blue-200">No sessions yet. Log one below.</p>
        )}
        {items.map((s) => (
          <div key={s.id} className="rounded bg-slate-900/50 border border-slate-700 p-3 text-blue-100">
            <div className="text-sm font-semibold">{s.type} • {s.duration_min || 0} min</div>
            {s.notes && <div className="text-xs opacity-80 mt-1">{s.notes}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
