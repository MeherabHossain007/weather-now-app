"use client"

import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  message?: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 mb-6 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-gray-400 flex items-center justify-center relative">
          <div className="w-8 h-0.5 bg-gray-400 rotate-45 absolute"></div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-white">Something went wrong</h3>
      <p className="text-gray-400 mb-8 max-w-md text-lg">
        We couldn't connect to the server (API error). Please try again in a few moments.
      </p>

      <Button
        onClick={onRetry}
        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg border border-slate-600"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </Button>
    </div>
  )
}
