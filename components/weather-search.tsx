"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchCities } from "@/lib/weather-api";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  loading?: boolean;
}

interface CityResult {
  name: string;
  country: string;
  state?: string;
  displayName: string;
}

export function WeatherSearch({
  onSearch,
  loading = false,
}: WeatherSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CityResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 2) {
      setSearchLoading(true);
      try {
        const cities = await searchCities(value);
        setSuggestions(cities);
        setShowSuggestions(cities.length > 0);
      } catch (error) {
        console.error("City search failed:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setSearchLoading(false);
      }
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      setIsSearching(true);
      setShowSuggestions(false);
      onSearch(query.trim());
      setQuery("");

      setTimeout(() => setIsSearching(false), 1000);
    }
  };

  const handleSuggestionClick = (city: CityResult) => {
    setQuery(city.name);
    setShowSuggestions(false);
    setIsSearching(true);
    onSearch(city.name);
    setQuery("");
    setTimeout(() => setIsSearching(false), 1000);
  };

  return (
    <div className="relative max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() =>
              query.trim().length > 2 &&
              suggestions.length > 0 &&
              setShowSuggestions(true)
            }
            placeholder="Search for a place..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-white transition-colors"
          />

          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto"
            >
              {suggestions.map((city, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(city)}
                  className="w-full text-left px-4 py-3 text-white hover:bg-slate-700/50 transition-colors border-b border-slate-700 last:border-b-0"
                >
                  {city.displayName}
                </button>
              ))}
            </div>
          )}

          {searchLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg font-medium transition-colors"
        >
          Search
        </Button>
      </form>

      {isSearching && (
        <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Search in progress</span>
        </div>
      )}
    </div>
  );
}
