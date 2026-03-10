import { useState } from "react";

type VinFormProps = {
  onSubmit: (vin: string) => void;
};

export default function VinForm({ onSubmit }: VinFormProps) {
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");

  const validateVin = (value: string) => {
    const normalized = value.trim().toUpperCase();

    if (!normalized) {
      return "VIN cannot be empty";
    }

    if (normalized.length > 17) {
      return "VIN cannot be longer than 17 characters";
    }

    if (/[^A-HJ-NPR-Z0-9]/i.test(normalized)) {
      return "VIN contains invalid characters";
    }

    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateVin(vin);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onSubmit(vin.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
       <div className="flex flex-col gap-3 sm:flex-row sm:items-start mb-3">
        <div className="flex-1">
      <input
        type="text"
        value={vin}
        onChange={(e) => {
          const value = e.target.value
            .toUpperCase()
            .replace(/[^A-HJ-NPR-Z0-9]/g, "")
            .slice(0, 17);

          setVin(value);
        }}
        placeholder="Enter VIN"
        className={`w-full rounded-md border bg-zinc-900 px-4 py-3 font-mono text-sm uppercase tracking-[0.18em] text-zinc-100 outline-none transition ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-zinc-700 focus:border-lime-400"
            }`}
      />
         </div>
        </div>
      <button type="submit" className="rounded-md bg-lime-400 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
        >Decode</button>

      {error && <p className="text-red-800">{error}</p>}
    </form>
  );
}
