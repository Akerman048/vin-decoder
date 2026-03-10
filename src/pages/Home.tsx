import { useEffect, useState } from "react";
import VinForm from "../components/VinForm";
import type { DecodeResultItem } from "../types/vehicle";
import { decodeVin } from "../api/nhtsaApi";
import HistoryList from "../components/HistoryList";
import DecodeResults from "../components/DecodeResults";

const STORAGE_KEY = "vin-history";

export default function Home() {
  const [results, setResults] = useState<DecodeResultItem[]>([]);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (vin: string) => {
    setHistory((prevHistory) => {
      const updatedHistory = [
        vin,
        ...prevHistory.filter((item) => item !== vin),
      ].slice(0, 3);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

      return updatedHistory;
    });
  };

  const handleDecode = async (vin: string) => {
    try {
      setLoading(true);
      setApiError("");

      const data = await decodeVin(vin);

      setResults(data.Results);
      setMessage(data.Message || "");
      saveToHistory(vin);
    } catch {
      setApiError("Failed to fetch VIN data");
      setResults([]);
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
        {" "}
        Decode a <span className="text-lime-400">VIN</span>
      </h1>
      <p className="mb-8 font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
        Vehicle Identification Number · 17 Characters
      </p>
      <VinForm onSubmit={handleDecode} />

      {message && (
        <p className="mb-6 rounded-md border border-lime-400/20 bg-lime-400/5 px-4 py-3 text-sm text-lime-300">
          {message}
        </p>
      )}

      {apiError && <p className="text-red-600">{apiError}</p>}

      <HistoryList history={history} onSelect={handleDecode} />

      {loading ? (
        <p className="rounded-md border border-zinc-800 bg-zinc-900 px-6 py-8 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400">
          Loading...
        </p>
      ) : (
        <DecodeResults results={results} />
      )}
    </div>
  );
}
