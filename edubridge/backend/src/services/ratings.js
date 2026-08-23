// Computes teacher rating (total likes across all their doubt-answers) and
// rank (1 = highest rating) from the current DB state. Kept as a pure
// function so both the teachers route and the doubts route can reuse it
// without drifting out of sync.

export function computeTeacherRatings(db) {
  const likesByTeacher = {};
  for (const doubt of db.doubts || []) {
    for (const answer of doubt.answers || []) {
      likesByTeacher[answer.teacherId] = (likesByTeacher[answer.teacherId] || 0) + (answer.likes || 0);
    }
  }

  const ranked = [...db.teachers]
    .map((t) => ({ id: t.id, rating: likesByTeacher[t.id] || 0 }))
    .sort((a, b) => b.rating - a.rating);

  const statsById = {};
  ranked.forEach((entry, i) => {
    statsById[entry.id] = { rating: entry.rating, rank: i + 1 };
  });
  return statsById;
}
