import { useEffect, useState } from "react";
import type { VehicleVariable } from "../types/vehicle";
import { getVariables } from "../api/nhtsaApi";
import { Link } from "react-router-dom";

export default function Variables() {
  const [variables, setVariables] = useState<VehicleVariable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const data = await getVariables();
        setVariables(data.Results);
      } catch {
        setError("Failed to fetch variables");
      } finally {
        setLoading(false);
      }
    };
    fetchVariables();
  }, []);

  if (loading)
    return (
      <p className="rounded-md border border-zinc-800 bg-zinc-900 px-6 py-8 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400">
        Loading variables...
      </p>
    );
  if (error)
    return (
      <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
        {error}
      </p>
    );
  return (
    <div>
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Vehicle <span className="text-lime-400">Variables</span>
      </h1>
      <ul>
        {variables.map((variable) => (
          <li key={variable.ID} className="mb-3">
            <Link to={`/variables/${variable.ID}`}>
              <strong>{variable.Name}</strong>
            </Link>
            <p>{variable.Description || "No description"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
