import type { DecodeResultItem } from "../types/vehicle";

type DecodeResultsProps = {
  results: DecodeResultItem[];
};

export default function DecodeResults({ results }: DecodeResultsProps) {
  const filteredResults = results.filter((item) => item.Value);

  if (filteredResults.length === 0) {
    return <p className="rounded-md border border-zinc-800 bg-zinc-900 px-6 py-10 text-center font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">No decoded data yet.</p>;
  }
  return (
    <section>
      <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">Decode results</h2>
      <ul className="bg-zinc-900 px-4 py-4">
        {filteredResults.map((item) => (
          <li className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500"  key={`${item.VariableId}`}>
            <strong>{item.Variable}:</strong> {item.Value}
          </li>
        ))}
      </ul>
    </section>
  );
}
