export const saveProblems = (problems) => {
  const uniqueProblems = {};
  for (const section in problems) {
    uniqueProblems[section] = [...new Set(problems[section])];
  }
  localStorage.setItem('problems', JSON.stringify(uniqueProblems));
};

export const loadProblems = () => {
  const problems = localStorage.getItem('problems');
  if (!problems) return null;

  const parsedProblems = JSON.parse(problems);
  const uniqueProblems = {};
  for (const section in parsedProblems) {
    uniqueProblems[section] = [...new Set(parsedProblems[section])];
  }
  return uniqueProblems;
};
