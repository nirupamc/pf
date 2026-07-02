export interface FuzzyResult {
  score: number
  /** matched character indices in the target */
  indices: number[]
}

/**
 * Small VS Code-ish fuzzy matcher: all query chars must appear in order.
 * Bonuses for consecutive matches, word starts and matches after / . - _
 */
export function fuzzyMatch(query: string, target: string): FuzzyResult | null {
  const q = query.toLowerCase()
  const t = target.toLowerCase()
  if (!q) return { score: 0, indices: [] }

  const indices: number[] = []
  let score = 0
  let ti = 0
  let lastMatch = -2

  for (let qi = 0; qi < q.length; qi++) {
    const ch = q[qi]
    let found = -1
    for (; ti < t.length; ti++) {
      if (t[ti] === ch) {
        found = ti
        break
      }
    }
    if (found === -1) return null
    let bonus = 1
    if (found === lastMatch + 1) bonus += 4 // consecutive
    if (found === 0 || '/.-_ '.includes(t[found - 1])) bonus += 3 // word start
    score += bonus
    indices.push(found)
    lastMatch = found
    ti = found + 1
  }
  // prefer shorter targets
  score -= Math.floor(t.length / 10)
  return { score, indices }
}
