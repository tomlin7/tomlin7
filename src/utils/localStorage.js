export const saveProblems = (problems) => {
  localStorage.setItem('problems', JSON.stringify(problems));
};

export const loadProblems = () => {
  const problems = localStorage.getItem('problems');
  return problems ? JSON.parse(problems) : null;
};
