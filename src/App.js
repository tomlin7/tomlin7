import React, { useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import { saveProblems, loadProblems } from './utils/localStorage';
import Section from './components/Section';

const App = () => {
  const sections = ['Design', 'Functionality 1', 'Functionality 2', 'Functionality 3', 'Code Quality'];
  const [problems, setProblems] = useState({
    Design: [],
    'Functionality 1': [],
    'Functionality 2': [],
    'Functionality 3': [],
    'Code Quality': []
  });

  useEffect(() => {
    const loadedProblems = loadProblems();
    if (loadedProblems) {
      setProblems(loadedProblems);
    }
  }, []);

  const handleAddProblem = (section, problem) => {
    setProblems(prevProblems => {
      const newProblems = { ...prevProblems, [section]: [...prevProblems[section], problem] };
      saveProblems(newProblems);
      return newProblems;
    });
  };

  const handleRemoveProblem = (section, index) => {
    setProblems(prevProblems => {
      const newProblems = { ...prevProblems, [section]: prevProblems[section].filter((_, i) => i !== index) };
      saveProblems(newProblems);
      return newProblems;
    });
  };

  const handleClearSection = (section) => {
    setProblems(prevProblems => {
      const newProblems = { ...prevProblems, [section]: [] };
      saveProblems(newProblems);
      return newProblems;
    });
  };

  const handleClearAll = () => {
    const newProblems = {
      Design: [],
      'Functionality 1': [],
      'Functionality 2': [],
      'Functionality 3': [],
      'Code Quality': []
    };
    setProblems(newProblems);
    saveProblems(newProblems);
  };

  const handleCopy = () => {
    const markdown = sections.map(section => problems[section].map(problem => `* ${problem}`).join('\n')).join('\n');
    navigator.clipboard.writeText(markdown);
  };

  return (
    <Container>
      {sections.map(section => (
        <Section
          key={section}
          section={section}
          problems={problems[section]}
          onAddProblem={handleAddProblem}
          onRemoveProblem={handleRemoveProblem}
          onClearSection={handleClearSection}
        />
      ))}
      <Button variant="contained" color="secondary" onClick={handleClearAll}>Clear All</Button>
      <Button variant="contained" color="primary" onClick={handleCopy}>Copy</Button>
    </Container>
  );
};

export default App;
