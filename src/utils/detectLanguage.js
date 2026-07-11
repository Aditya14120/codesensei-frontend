// Lightweight heuristic language detector — no parser, just weighted syntax
// markers. Good enough to auto-pick the right Monaco language/dropdown value
// for typical snippets; a low/tied score returns null so the caller can leave
// the current selection alone instead of flip-flopping on ambiguous input.
const PATTERNS = {
  python: [
    /^\s*def\s+\w+\s*\(.*\)\s*:/m,
    /^\s*import\s+[\w.]+\s*$/m,
    /^\s*from\s+[\w.]+\s+import\s+/m,
    /^\s*elif\s+.+:/m,
    /\bprint\(/,
    /\bself\./,
    /__init__/,
    /^\s*#(?!include)/m,
  ],
  cpp: [
    /#include\s*<iostream>/,
    /\bstd::/,
    /using\s+namespace\s+std/,
    /\bcout\s*<</,
    /\bcin\s*>>/,
    /::/,
  ],
  c: [
    /#include\s*<stdio\.h>/,
    /\bprintf\s*\(/,
    /\bscanf\s*\(/,
    /\bmalloc\s*\(/,
    /\bint\s+main\s*\(\s*(void)?\s*\)/,
  ],
  java: [
    /public\s+class\s+\w+/,
    /public\s+static\s+void\s+main\s*\(\s*String/,
    /System\.out\.println/,
    /^\s*import\s+java\./m,
    /public\s+(static\s+)?\w+\s+\w+\s*\([^)]*\)\s*\{/,
  ],
};

const MIN_CODE_LENGTH = 20;
const MIN_CONFIDENCE = 2;

export function detectLanguage(code) {
  if (!code || code.trim().length < MIN_CODE_LENGTH) return null;

  const scores = { java: 0, python: 0, c: 0, cpp: 0 };

  for (const [lang, patterns] of Object.entries(PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(code)) scores[lang] += 1;
    }
  }

  // C and C++ share #include/main() conventions; if any C++-specific marker
  // fired, it's C++, not C.
  if (scores.cpp > 0) {
    scores.c = 0;
  }

  const [bestLang, bestScore] = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];

  return bestScore >= MIN_CONFIDENCE ? bestLang : null;
}
