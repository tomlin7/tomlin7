import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
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
  const [historicalProblems, setHistoricalProblems] = useState({
    Design: [],
    'Functionality 1': [],
    'Functionality 2': [],
    'Functionality 3': [],
    'Code Quality': []
  });

  useEffect(() => {
    const loadedProblems = loadProblems();
    if (loadedProblems) {
      setProblems(loadedProblems.problems);
      setHistoricalProblems(loadedProblems.historicalProblems);
    }
  }, []);

  const handleAddProblem = (section, problem) => {
    setProblems(prevProblems => {
      const newProblems = { ...prevProblems, [section]: [...new Set([...prevProblems[section], problem])] };
      saveProblems(newProblems, historicalProblems);
      return newProblems;
    });
    setHistoricalProblems(prevHistoricalProblems => {
      const newHistoricalProblems = { ...prevHistoricalProblems, [section]: [...new Set([...prevHistoricalProblems[section], problem])] };
      saveProblems(problems, newHistoricalProblems);
      return newHistoricalProblems;
    });
  };

  const handleRemoveProblem = (section, index) => {
    setProblems(prevProblems => {
      const newProblems = { ...prevProblems, [section]: prevProblems[section].filter((_, i) => i !== index) };
      saveProblems(newProblems, historicalProblems);
      return newProblems;
    });
  };

  const handleClearSection = (section) => {
    setProblems(prevProblems => {
      const newProblems = { ...prevProblems, [section]: [] };
      saveProblems(newProblems, historicalProblems);
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
    saveProblems(newProblems, historicalProblems);
  };

  const handleCopy = () => {
    const markdown = sections.map(section => problems[section].map(problem => `* ${problem}`).join('\n')).join('\n');
    navigator.clipboard.writeText(markdown);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Problem List
      </Typography>
      <Grid container spacing={3}>
        {sections.map(section => (
          <Grid item xs={12} md={6} key={section}>
            <Section
              section={section}
              problems={problems[section]}
              onAddProblem={handleAddProblem}
              onRemoveProblem={handleRemoveProblem}
              onClearSection={handleClearSection}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleClearAll}>Clear All</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleCopy}>Copy</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
