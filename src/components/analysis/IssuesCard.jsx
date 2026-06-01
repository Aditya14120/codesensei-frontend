function IssuesCard({
  pmd,
  checkstyle,
  spotbugs
}) {

  const allIssues = [
    ...(pmd || []),
    ...(checkstyle || []),
    ...(spotbugs || [])
  ];

  return (

    <div className="glass rounded-3xl p-8">

      <h2
        className="
          text-2xl
          font-bold
          text-purple-400
          mb-6
        "
      >
        Static Analysis Issues
      </h2>

      {allIssues.length === 0 ? (

        <p className="text-green-400">
          No issues detected.
        </p>

      ) : (

        <div className="space-y-3">

          {allIssues.map((issue, index) => (

            <div
              key={index}
              className="
                text-gray-300
                border-l-2
                border-purple-500
                pl-4
              "
            >
              {issue}
            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default IssuesCard;