import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';

const Section = ({ section, problems, onAddProblem, onRemoveProblem, onClearSection }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddProblem = () => {
    if (inputValue.trim() !== '') {
      onAddProblem(section, inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <h2>{section}</h2>
      <List>
        {problems.map((problem, index) => (
          <ListItem key={index}>
            <ListItemText primary={problem} />
            <IconButton edge="end" aria-label="delete" onClick={() => onRemoveProblem(section, index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Autocomplete
        freeSolo
        options={problems}
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
      <Button variant="contained" color="primary" onClick={handleAddProblem}>Add</Button>
      <Button variant="contained" color="secondary" onClick={() => onClearSection(section)}>Clear</Button>
    </div>
  );
};

export default Section;
