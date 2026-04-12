/**
 * search.js — Pure search/filter logic for git-cheatsheet
 */

/**
 * Fuzzy match: all query characters must appear in text in order.
 * Returns 0 if no match, or a positive score (higher = tighter match).
 * @param {string} query
 * @param {string} text
 * @returns {number}
 */
export function fuzzyMatch(query, text) {
  if (query.length === 0) return 1;
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  let qi = 0;
  let firstMatchIdx = -1;
  let lastMatchIdx = -1;

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      if (firstMatchIdx === -1) firstMatchIdx = ti;
      lastMatchIdx = ti;
      qi++;
    }
  }

  if (qi < q.length) return 0; // not all chars matched

  // Score: prefer tight matches (small span between first and last match)
  const span = lastMatchIdx - firstMatchIdx + 1;
  const tightness = q.length / span;
  // Bonus for matching at word start
  const startsAtStart = firstMatchIdx === 0 ? 1 : 0;
  return tightness + startsAtStart;
}

/**
 * Filter commands by optional query string and category.
 * When a query is given, searches command text and description (in specified lang).
 * Returns filtered array sorted by relevance (highest score first).
 * @param {Array} commands
 * @param {string} query
 * @param {string|null} category  — null or 'all' means no category filter
 * @param {string} lang           — 'ja' or 'en'
 * @returns {Array}
 */
export function filterCommands(commands, query, category, lang = 'en') {
  const trimmed = query ? query.trim() : '';

  let filtered = commands;

  // Category filter
  if (category && category !== 'all') {
    filtered = filtered.filter((cmd) => cmd.category === category);
  }

  if (!trimmed) return filtered;

  // Score each command
  const scored = filtered
    .map((cmd) => {
      const descText = cmd.description[lang] || cmd.description.en || '';
      const tagText = (cmd.tags || []).join(' ');

      const scoreCmd = fuzzyMatch(trimmed, cmd.command);
      const scoreDesc = fuzzyMatch(trimmed, descText);
      const scoreTag = fuzzyMatch(trimmed, tagText);
      const scoreId = fuzzyMatch(trimmed, cmd.id);

      const best = Math.max(scoreCmd, scoreDesc, scoreTag, scoreId);
      return { cmd, score: best };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((item) => item.cmd);
}

/**
 * Group an array of commands by their category.
 * Returns an object keyed by category id.
 * @param {Array} commands
 * @returns {Object}
 */
export function groupByCategory(commands) {
  return commands.reduce((acc, cmd) => {
    const cat = cmd.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(cmd);
    return acc;
  }, {});
}
