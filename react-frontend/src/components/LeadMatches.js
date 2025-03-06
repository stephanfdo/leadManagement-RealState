import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, CircularProgress } from '@mui/material';
import api from '../api';
import MatchList from './MatchList';

const LeadMatches = () => {
  const { id } = useParams();
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        console.log('Fetching matches for lead ID:', id);
        
        // Use the correct API method for matches
        const response = await api.getMatches(id);
        
        console.log('Matches response:', response);
        
        // Adjust based on your API response structure
        const matchesData = response.data.matches || response.data || [];
        
        setMatches(matchesData);
        setError(null);
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError('Failed to load matches. Please try again later.');
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchMatches();
    }
  }, [id]);

  if (loading) {
    return (
      <Paper sx={{ p: 3, mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  return <MatchList matches={matches} />;
};

export default LeadMatches;