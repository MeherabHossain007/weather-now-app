"use client"

import { useState, useRef, useEffect } from "react"
import { Settings, Check, ChevronDown } from "lucide-react"
import type { Units } from "@/types/weather"

interface UnitsToggleProps {
  units: Units
  onUnitsChange: (units: Units) => void
}

export function UnitsToggle({ units, onUnitsChange }: UnitsToggleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempUnit, setTempUnit] = useState<"celsius" | "fahrenheit">(units === "metric" ? "celsius" : "fahrenheit")
  const [windUnit, setWindUnit] = useState<"kmh" | "mph">(units === "metric" ? "kmh" : "mph")
  const [precipUnit, setPrecipUnit] = useState<"mm" | "inches">(units === "metric" ? "mm" : "inches")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleUnitChange = () => {
    const newUnits = tempUnit === "celsius" ? "metric" : "imperial"
    onUnitsChange(newUnits)
  }

  useEffect(() => {
    handleUnitChange()
  }, [tempUnit, windUnit, precipUnit])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Settings className="w-4 h-4" />
        <span className="text-sm">Units</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Switch to Imperial</span>
            </div>
          </div>

          {/* Temperature */}
          <div className="p-4 border-b border-slate-700">
            <div className="text-sm font-medium text-gray-300 mb-3">Temperature</div>
            <div className="space-y-2">
              <button
                onClick={() => setTempUnit("celsius")}
                className="flex items-center justify-between w-full text-left text-sm text-white hover:bg-slate-700/50 p-2 rounded"
              >
                <span>Celsius (°C)</span>
                {tempUnit === "celsius" && <Check className="w-4 h-4 text-blue-400" />}
              </button>
              <button
                onClick={() => setTempUnit("fahrenheit")}
                className="flex items-center justify-between w-full text-left text-sm text-white hover:bg-slate-700/50 p-2 rounded"
              >
                <span>Fahrenheit (°F)</span>
                {tempUnit === "fahrenheit" && <Check className="w-4 h-4 text-blue-400" />}
              </button>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="p-4 border-b border-slate-700">
            <div className="text-sm font-medium text-gray-300 mb-3">Wind Speed</div>
            <div className="space-y-2">
              <button
                onClick={() => setWindUnit("kmh")}
                className="flex items-center justify-between w-full text-left text-sm text-white hover:bg-slate-700/50 p-2 rounded"
              >
                <span>km/h</span>
                {windUnit === "kmh" && <Check className="w-4 h-4 text-blue-400" />}
              </button>
              <button
                onClick={() => setWindUnit("mph")}
                className="flex items-center justify-between w-full text-left text-sm text-white hover:bg-slate-700/50 p-2 rounded"
              >
                <span>mph</span>
                {windUnit === "mph" && <Check className="w-4 h-4 text-blue-400" />}
              </button>
            </div>
          </div>

          {/* Precipitation */}
          <div className="p-4">
            <div className="text-sm font-medium text-gray-300 mb-3">Precipitation</div>
            <div className="space-y-2">
              <button
                onClick={() => setPrecipUnit("mm")}
                className="flex items-center justify-between w-full text-left text-sm text-white hover:bg-slate-700/50 p-2 rounded"
              >
                <span>Millimeters (mm)</span>
                {precipUnit === "mm" && <Check className="w-4 h-4 text-blue-400" />}
              </button>
              <button
                onClick={() => setPrecipUnit("inches")}
                className="flex items-center justify-between w-full text-left text-sm text-white hover:bg-slate-700/50 p-2 rounded"
              >
                <span>Inches (in)</span>
                {precipUnit === "inches" && <Check className="w-4 h-4 text-blue-400" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
