import { Search } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Search className="w-16 h-16 text-gray-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Ready to explore the weather?</h3>
      <p className="text-gray-400 max-w-md">
        Search for any city above to get current weather conditions, forecasts, and more.
      </p>
    </div>
  )
}
