import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CssBaseline, Container, Box, Typography, Button } from '@mui/material';
import LeadTable from './components/LeadTable';
import LeadForm from './components/LeadForm';
import MatchList from './components/MatchList';
import LeadMatches from './components/LeadMatches';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AppBar from './components/AppBar';
import api from './api';

function App() {
  const [refreshLeads, setRefreshLeads] = useState(false);

  const handleLeadSubmit = async (formData) => {
    try {
      if (formData.id) {
        await api.updateLead(formData.id, formData);
      } else {
        await api.createLead(formData);
      }
      setRefreshLeads(prev => !prev);
    } catch (error) {
      console.error('Submission failed:', error);
      throw error;
    }
  };

  return (
    <AuthProvider>
      <CssBaseline />
      <Router>
        <AppBar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Home Page */}
            <Route path="/" element={
              <ProtectedRoute>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h4" gutterBottom>
                    Real Estate Leads
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link}
                    to="/leads/new"
                  >
                    Create New Lead
                  </Button>
                </Box>
                <LeadTable refresh={refreshLeads} />
              </ProtectedRoute>
            } />

            {/* Create/Edit Lead Page */}
            <Route path="/leads/new" element={
              <ProtectedRoute>
                <LeadForm onSubmit={handleLeadSubmit} />
              </ProtectedRoute>
            } />

            <Route path="/leads/edit/:id" element={
              <ProtectedRoute>
                <LeadForm onSubmit={handleLeadSubmit} />
              </ProtectedRoute>
            } />

            {/* View Matches Page */}
            <Route path="/leads/:id" element={
                <ProtectedRoute>
                  <LeadMatches />
                </ProtectedRoute>
              } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;