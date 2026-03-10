type HistoryListProps = {
  history: string[];
  onSelect: (vin: string) => void;
};

export default function HistoryList({history, onSelect}: HistoryListProps ){
  if (history.length === 0) {
    return <p>No history yet.</p>;
  }
  return (<section className="mb-10">
    <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-500" >Last 3 VIN requests</h2>
    <ul className="flex flex-wrap gap-2">
        {history.map((vin) => (
            <li key={vin}>
                <button className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] transition
              
                : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-lime-400 hover:text-lime-400"
            }`} onClick={()=> onSelect(vin)}>{vin}</button>
            </li>
        ))}
        </ul>
  </section>);
}
