const CATEGORIES = [
  { key: "security", label: "Security" },
  { key: "readability", label: "Readability" },
  { key: "performance", label: "Performance" },
  { key: "bugPrevention", label: "Bug Prevention" },
  { key: "bestPractices", label: "Best Practices" },
];

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = 108;
const MAX_VALUE = 10;

function pointFor(index, value) {
  const angle = (Math.PI * 2 * index) / CATEGORIES.length - Math.PI / 2;
  const r = (Math.max(0, Math.min(MAX_VALUE, value)) / MAX_VALUE) * RADIUS;
  return [CENTER + r * Math.cos(angle), CENTER + r * Math.sin(angle)];
}

function polygonPoints(values) {
  return CATEGORIES.map((cat, i) => pointFor(i, values[cat.key] ?? 0).join(",")).join(" ");
}

/** Hand-rolled SVG radar chart — no charting library, consistent with ScoreCard's SVG ring. */
function SkillRadarChart({ series }) {
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ overflow: "visible" }}>
      {/* Grid rings */}
      {rings.map((ratio) => (
        <polygon
          key={ratio}
          points={CATEGORIES.map((_, i) => pointFor(i, MAX_VALUE * ratio).join(",")).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {CATEGORIES.map((cat, i) => {
        const [x, y] = pointFor(i, MAX_VALUE);
        return (
          <line
            key={cat.key}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* Series polygons */}
      {series.map((s) => (
        <polygon
          key={s.name}
          points={polygonPoints(s.values)}
          fill={s.color}
          fillOpacity="0.14"
          stroke={s.color}
          strokeWidth="2"
        />
      ))}

      {/* Vertex dots */}
      {series.map((s) =>
        CATEGORIES.map((cat) => {
          const i = CATEGORIES.indexOf(cat);
          const [x, y] = pointFor(i, s.values[cat.key] ?? 0);
          return <circle key={s.name + cat.key} cx={x} cy={y} r="3" fill={s.color} />;
        })
      )}

      {/* Axis labels */}
      {CATEGORIES.map((cat, i) => {
        const [x, y] = pointFor(i, MAX_VALUE + 2.2);
        return (
          <text
            key={cat.key}
            x={x}
            y={y}
            fontSize="11"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fill: "var(--text-secondary)" }}
          >
            {cat.label}
          </text>
        );
      })}
    </svg>
  );
}

export default SkillRadarChart;
