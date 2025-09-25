export function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-2"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-2 animation-delay-200"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse animation-delay-400"></div>
            </div>
            <p className="text-white text-lg">Loading...</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-slate-800/50 rounded-lg p-4">
            <div className="h-4 bg-slate-700 rounded mb-2 animate-pulse"></div>
            <div className="h-8 bg-slate-700 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      <div>
        <div className="h-6 bg-slate-700 rounded w-32 mb-4 animate-pulse"></div>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="h-4 bg-slate-700 rounded mb-3 animate-pulse"></div>
              <div className="w-8 h-8 bg-slate-700 rounded-full mx-auto mb-3 animate-pulse"></div>
              <div className="h-4 bg-slate-700 rounded mb-1 animate-pulse"></div>
              <div className="h-3 bg-slate-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <div className="h-6 bg-slate-700 rounded w-32 mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-slate-700 rounded-full animate-pulse"></div>
                <div className="h-4 bg-slate-700 rounded w-16 animate-pulse"></div>
              </div>
              <div className="h-4 bg-slate-700 rounded w-8 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
