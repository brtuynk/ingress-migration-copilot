function scoreIngress(features) {
  let score = 100;
  let blockers = 0;
  let manual = 0;
  let unsupported = 0;

  for (const feature of features) {
    if (feature.status === 'manual') {
      score -= 12;
      manual += 1;
    }
    if (feature.status === 'unsupported') {
      score -= 28;
      unsupported += 1;
    }
    if (feature.risk === 'blocker') {
      blockers += 1;
      score -= 10;
    }
  }

  return {
    score: Math.max(0, score),
    blockers,
    manual,
    unsupported,
  };
}

function aggregateScore(ingressScores) {
  if (ingressScores.length === 0) {
    return { score: 100, blockers: 0, manual: 0, unsupported: 0 };
  }

  const totals = ingressScores.reduce(
    (acc, item) => {
      acc.score += item.score;
      acc.blockers += item.blockers;
      acc.manual += item.manual;
      acc.unsupported += item.unsupported;
      return acc;
    },
    { score: 0, blockers: 0, manual: 0, unsupported: 0 },
  );

  return {
    score: Number((totals.score / ingressScores.length).toFixed(2)),
    blockers: totals.blockers,
    manual: totals.manual,
    unsupported: totals.unsupported,
  };
}

module.exports = {
  scoreIngress,
  aggregateScore,
};
