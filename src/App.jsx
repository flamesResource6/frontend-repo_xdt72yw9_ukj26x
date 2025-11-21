import Header from './components/Header'
import Summary from './components/Summary'
import QuickAdd from './components/QuickAdd'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen p-6 md:p-10">
        <div className="max-w-5xl mx-auto space-y-8">
          <Header />
          <Summary />
          <QuickAdd />
          <div className="text-center">
            <p className="text-sm text-blue-300/60">Tip: Add an intention, then log a session right after to reinforce momentum.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
 await fetch(`${baseUrl}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    e.currentTarget.reset()
    setShowLog(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative max-w-4xl mx-auto p-6 space-y-6">
        <Header />

        <DailyPrompt />

        <QuickAdd />

        <RecentSessions />

        <section className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">Log a Session</h2>
            <button onClick={() => setShowLog(v=>!v)} className="text-sm px-3 py-1.5 rounded bg-slate-700 text-white">
              {showLog ? 'Close' : 'Open'}
            </button>
          </div>
          {showLog && (
            <form onSubmit={logSession} className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm text-blue-200">Type</label>
                <select name="type" className="w-full rounded bg-slate-900/60 border border-slate-700 px-3 py-2 text-white">
                  <option>visualization</option>
                  <option>SATS</option>
                  <option>scripting</option>
                  <option>meditation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-blue-200">Duration (min)</label>
                <input name="duration" type="number" min="0" className="w-full rounded bg-slate-900/60 border border-slate-700 px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-blue-200">Mood Before (1-10)</label>
                <input name="mood_before" type="number" min="1" max="10" className="w-full rounded bg-slate-900/60 border border-slate-700 px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-blue-200">Mood After (1-10)</label>
                <input name="mood_after" type="number" min="1" max="10" className="w-full rounded bg-slate-900/60 border border-slate-700 px-3 py-2 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-blue-200">Notes</label>
                <textarea name="notes" rows="3" className="w-full rounded bg-slate-900/60 border border-slate-700 px-3 py-2 text-white"></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-white">Save Session</button>
              </div>
            </form>
          )}
        </section>

        <div className="text-center text-blue-300/60 text-sm py-6">
          Tip: Set your backend URL in an env var named VITE_BACKEND_URL for mobile previews.
        </div>
      </div>
    </div>
  )
}

export default App
