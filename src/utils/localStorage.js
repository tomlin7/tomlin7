export const saveProblems = (historicalProblems) => {
  const uniqueHistoricalProblems = {};
  for (const section in historicalProblems) {
    uniqueHistoricalProblems[section] = [...new Set(historicalProblems[section])];
  }
  localStorage.setItem('problems', JSON.stringify({ historicalProblems: uniqueHistoricalProblems }));
};

export const loadProblems = () => {
  const problems = localStorage.getItem('problems');
  if (!problems) return null;

  const parsedProblems = JSON.parse(problems);
  const uniqueHistoricalProblems = {};
  for (const section in parsedProblems.historicalProblems) {
    uniqueHistoricalProblems[section] = [...new Set(parsedProblems.historicalProblems[section])];
  }
  return { historicalProblems: uniqueHistoricalProblems };
};
