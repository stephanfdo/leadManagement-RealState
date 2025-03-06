import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, LinearProgress, Chip, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const MatchItem = styled(ListItem)(({ theme }) => ({
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'scale(1.01)',
    boxShadow: theme.shadows[2]
  }
}));

const MatchList = ({ matches }) => {
  // Check if matches is undefined or null
  if (!matches) {
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          AI-Powered Matches
        </Typography>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No matches available at this time
          </Typography>
        </Box>
      </Paper>
    );
  }

  // Check if matches is empty
  if (matches.length === 0) {
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          AI-Powered Matches
        </Typography>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No matches found for this lead
          </Typography>
        </Box>
      </Paper>
    );
  }

  // If we have matches, render them
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        AI-Powered Matches
      </Typography>
      <List>
        {matches.map((match, index) => (
          <MatchItem key={index} divider={index < matches.length - 1}>
            <ListItemText
              primary={`${match.name || 'Unnamed'} (${match.type || 'Unknown'})`}
              secondary={
                <>
                  <Chip 
                    label={`${match.score || 0}% Match`} 
                    color={
                      (match.score || 0) > 80 ? 'success' :
                      (match.score || 0) > 60 ? 'warning' : 'error'
                    }
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                  {Array.isArray(match.reasons) ? match.reasons.join(', ') : ''}
                </>
              }
            />
            <LinearProgress 
              variant="determinate" 
              value={match.score || 0} 
              sx={{ width: 100 }}
            />
          </MatchItem>
        ))}
      </List>
    </Paper>
  );
};

// Add default props to avoid errors
MatchList.defaultProps = {
  matches: [] // Default to an empty array if not provided
};

export default MatchList;