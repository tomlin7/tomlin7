import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Paper, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@mui/icons-material/Clear';
import { loadProblems } from '../utils/localStorage';

const Section = ({ section, problems, onAddProblem, onRemoveProblem, onClearSection }) => {
  const [inputValue, setInputValue] = useState('');
  const [historicalProblems, setHistoricalProblems] = useState([]);

  useEffect(() => {
    const loadedProblems = loadProblems();
    if (loadedProblems) {
      setHistoricalProblems(loadedProblems.historicalProblems[section] || []);
    }
  }, [section]);

  const handleAddProblem = () => {
    if (inputValue.trim() !== '' && !problems.includes(inputValue)) {
      onAddProblem(section, inputValue);
      setInputValue('');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        {section}
      </Typography>
      <List>
        {problems.map((problem, index) => (
          <ListItem key={index} style={{ paddingLeft: '0px' }}>
            <ListItemText primary={problem} />
            <IconButton edge="end" aria-label="delete" onClick={() => onRemoveProblem(section, index)}>
              <ClearIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Autocomplete
        freeSolo
        options={historicalProblems}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add a problem"
            variant="outlined"
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleAddProblem();
                event.preventDefault();
              }
            }}
          />
        )}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Button variant="contained" color="primary" onClick={handleAddProblem}>Add</Button>
        <Button variant="contained" color="secondary" onClick={() => onClearSection(section)}>Clear</Button>
      </div>
    </Paper>
  );
};

export default Section;
