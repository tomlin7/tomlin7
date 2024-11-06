export const saveProblems = (problems, historicalProblems) => {
  const uniqueProblems = {};
  const uniqueHistoricalProblems = {};
  for (const section in problems) {
    uniqueProblems[section] = [...new Set(problems[section])];
  }
  for (const section in historicalProblems) {
    uniqueHistoricalProblems[section] = [...new Set(historicalProblems[section])];
  }
  localStorage.setItem('problems', JSON.stringify({ problems: uniqueProblems, historicalProblems: uniqueHistoricalProblems }));
};

export const loadProblems = () => {
  const problems = localStorage.getItem('problems');
  if (!problems) return null;

  const parsedProblems = JSON.parse(problems);
  const uniqueProblems = {};
  const uniqueHistoricalProblems = {};
  for (const section in parsedProblems.problems) {
    uniqueProblems[section] = [...new Set(parsedProblems.problems[section])];
  }
  for (const section in parsedProblems.historicalProblems) {
    uniqueHistoricalProblems[section] = [...new Set(parsedProblems.historicalProblems[section])];
  }
  return { problems: uniqueProblems, historicalProblems: uniqueHistoricalProblems };
};
