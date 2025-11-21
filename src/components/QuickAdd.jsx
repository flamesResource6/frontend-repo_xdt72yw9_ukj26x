import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function QuickAdd() {
  const [intention, setIntention] = useState({ title: '', why: '', category: '' })
  const [affirmation, setAffirmation] = useState('')
  const [session, setSession] = useState({ practice_type: 'visualization', minutes: 10 })
  const [status, setStatus] = useState('')

  const submit = async (path, body) => {
    setStatus('Saving...')
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error('Request failed')
      await res.json()
      setStatus('Saved!')
      setTimeout(() => setStatus(''), 1200)
    } catch (e) {
      setStatus('Error connecting to backend')
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">New Intention</h3>
        <input className="w-full mb-2 px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Title" value={intention.title} onChange={e => setIntention({ ...intention, title: e.target.value })} />
        <input className="w-full mb-2 px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Why" value={intention.why} onChange={e => setIntention({ ...intention, why: e.target.value })} />
        <input className="w-full mb-4 px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Category" value={intention.category} onChange={e => setIntention({ ...intention, category: e.target.value })} />
        <button onClick={() => submit('/api/intentions', intention)} className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-2">Save</button>
      </div>

      <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">New Affirmation</h3>
        <input className="w-full mb-4 px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="I am..." value={affirmation} onChange={e => setAffirmation(e.target.value)} />
        <button onClick={() => submit('/api/affirmations', { text: affirmation })} className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-2">Save</button>
      </div>

      <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Log Session</h3>
        <select className="w-full mb-2 px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" value={session.practice_type} onChange={e => setSession({ ...session, practice_type: e.target.value })}>
          <option value="visualization">Visualization</option>
          <option value="scripting">Scripting</option>
          <option value="SATS">SATS</option>
          <option value="breathwork">Breathwork</option>
        </select>
        <input type="number" min="1" max="240" className="w-full mb-4 px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Minutes" value={session.minutes} onChange={e => setSession({ ...session, minutes: Number(e.target.value) })} />
        <button onClick={() => submit('/api/sessions', session)} className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-2">Save</button>
      </div>

      <div className="md:col-span-3 text-blue-200/80 text-sm text-right">{status}</div>
    </div>
  )
}
