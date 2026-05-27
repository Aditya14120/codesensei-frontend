function AnalysisCard({ title, items }) {

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-700">
      <h2 className="text-xl font-bold mb-4 text-purple-400">
        {title}
      </h2>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="bg-zinc-800 p-3 rounded-lg"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalysisCard;