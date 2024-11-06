export const saveProblems = (problems) => {
  const uniqueProblems = {};
  const historicalProblems = JSON.parse(localStorage.getItem('historicalProblems')) || {};

  for (const section in problems) {
    uniqueProblems[section] = [...new Set(problems[section])];
    historicalProblems[section] = [...new Set([...(historicalProblems[section] || []), ...problems[section]])];
  }

  localStorage.setItem('problems', JSON.stringify(uniqueProblems));
  localStorage.setItem('historicalProblems', JSON.stringify(historicalProblems));
};

export const loadProblems = () => {
  const problems = localStorage.getItem('problems');
  const historicalProblems = localStorage.getItem('historicalProblems');

  if (!problems) return null;

  const parsedProblems = JSON.parse(problems);
  const parsedHistoricalProblems = historicalProblems ? JSON.parse(historicalProblems) : {};
  const uniqueProblems = {};
  const uniqueHistoricalProblems = {};

  for (const section in parsedProblems) {
    uniqueProblems[section] = [...new Set(parsedProblems[section])];
    uniqueHistoricalProblems[section] = [...new Set(parsedHistoricalProblems[section] || [])];
  }

  return { visibleProblems: uniqueProblems, historicalProblems: uniqueHistoricalProblems };
};
