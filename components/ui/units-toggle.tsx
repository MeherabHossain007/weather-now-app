"use client";
import { useState, useRef, useEffect } from "react";
import { Settings, Check, ChevronDown } from "lucide-react";

type Units = "metric" | "imperial";

interface UnitsToggleProps {
  units: Units;
  onUnitsChange: (units: Units) => void;
}

export function UnitsToggle({ units, onUnitsChange }: UnitsToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState<Units>(units);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedUnits(units);
  }, [units]);

  const handleUnitSystemSwitch = () => {
    const newUnits = selectedUnits === "metric" ? "imperial" : "metric";
    setSelectedUnits(newUnits);
    onUnitsChange(newUnits);
  };

  const handleSpecificUnitChange = (newUnits: Units) => {
    setSelectedUnits(newUnits);
    onUnitsChange(newUnits);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-neutral-800 border border-neutral-600 rounded-8 text-white hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Settings className="w-4 h-4" />
        <span className="text-sm">Units</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-neutral-800 border border-neutral-600 rounded-12 px-2 py-1.5 shadow-xl z-50">
          {/* Switch Button */}
          <button
            onClick={handleUnitSystemSwitch}
            className="w-full flex justify-start px-2 py-2.5 text-white font-medium rounded-lg transition-colors hover:bg-neutral-700"
          >
            Switch to {selectedUnits === "metric" ? "Imperial" : "Metric"}
          </button>

          {/* Temperature Section */}
          <div className="px-2 py-2.5 border-b border-slate-700">
            <div className="mb-3">
              <span className="text-sm font-medium text-neutral-400">
                Temperature
              </span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleSpecificUnitChange("metric")}
                className={`flex items-center justify-between w-full text-left text-sm text-white p-3 rounded transition-colors ${
                  selectedUnits === "metric"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                <span>Celsius (°C)</span>
                {selectedUnits === "metric" && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
              <button
                onClick={() => handleSpecificUnitChange("imperial")}
                className={`flex items-center justify-between w-full text-left text-sm text-white p-3 rounded transition-colors ${
                  selectedUnits === "imperial"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                <span>Fahrenheit (°F)</span>
                {selectedUnits === "imperial" && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Wind Speed Section */}
          <div className="px-2 py-2.5 border-b border-slate-700">
            <div className="mb-3">
              <span className="text-sm font-medium text-neutral-400">
                Wind Speed
              </span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleSpecificUnitChange("metric")}
                className={`flex items-center justify-between w-full text-left text-sm text-white p-3 rounded transition-colors ${
                  selectedUnits === "metric"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                <span>km/h</span>
                {selectedUnits === "metric" && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
              <button
                onClick={() => handleSpecificUnitChange("imperial")}
                className={`flex items-center justify-between w-full text-left text-sm text-white p-3 rounded transition-colors ${
                  selectedUnits === "imperial"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                <span>mph</span>
                {selectedUnits === "imperial" && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Precipitation Section */}
          <div className="px-2 py-2.5">
            <div className="mb-3">
              <span className="text-sm font-medium text-neutral-400">
                Precipitation
              </span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleSpecificUnitChange("metric")}
                className={`flex items-center justify-between w-full text-left text-sm text-white p-3 rounded transition-colors ${
                  selectedUnits === "metric"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                <span>Millimeters (mm)</span>
                {selectedUnits === "metric" && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
              <button
                onClick={() => handleSpecificUnitChange("imperial")}
                className={`flex items-center justify-between w-full text-left text-sm text-white p-3 rounded transition-colors ${
                  selectedUnits === "imperial"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                <span>Inches (in)</span>
                {selectedUnits === "imperial" && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Demo component to test the functionality
export default function App() {
  const [units, setUnits] = useState<Units>("metric");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-4">
            Weather Units Settings
          </h1>
          <p className="text-neutral-400">
            Current unit system:{" "}
            <span className="text-white font-medium">{units}</span>
          </p>
        </div>

        <div className="flex justify-center">
          <UnitsToggle units={units} onUnitsChange={setUnits} />
        </div>
      </div>
    </div>
  );
}
