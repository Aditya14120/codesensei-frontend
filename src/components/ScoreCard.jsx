function ScoreCard({ score }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-500">
      <h2 className="text-2xl font-bold mb-4">Code Quality Score</h2>

      <div className="text-6xl font-bold text-purple-400">
        {score}/10
      </div>
    </div>
  );
}

export default ScoreCard;