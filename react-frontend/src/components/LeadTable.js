import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../api';

const columns = (handleDelete) => [
  { field: 'name', headerName: 'Name', width: 200, flex: 1 },
  { field: 'type', headerName: 'Type', width: 150, flex: 1 },
  { field: 'location', headerName: 'Location', width: 150, flex: 1 },
  { 
    field: 'price', 
    headerName: 'Price/Budget', 
    // Add a null/undefined check
    valueFormatter: (params) => {
      // First check if params exists
      if (!params) return '';
      
      // Check if value exists and is a number
      const value = params.value;
      if (value == null) return '';
      
      return `$${Number(value).toLocaleString()}`;
    }
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 300,
    renderCell: (params) => (
      <div>
        <IconButton
          component={Link}
          to={`/leads/edit/${params.row.id}`}
          color="primary"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>

        <IconButton
          color="error"
          aria-label="delete"
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>

        <Button
          component={Link}
          to={`/leads/${params.row.id}`}
          variant="contained"
          size="small"
          sx={{ ml: 1 }}
        >
          View Matches
        </Button>
      </div>
    )
  }
];

const LeadTable = ({ refresh }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.deleteLead(id);
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete lead');
      }
    }
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await api.getLeads();
        
        const processedLeads = response.data.map(lead => ({
          ...lead,
          name: lead.name || '',
          type: lead.type || '',
          location: lead.location || '',
          price: lead.type === 'seller' ? lead.price : lead.budget
        }));
        
        setLeads(processedLeads);
        setError(null);
      } catch (error) {
        console.error('Error fetching leads:', error);
        setError('Failed to load leads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeads();
  }, [refresh]);

  return (
    <div style={{ height: 400, width: '100%', marginTop: 20 }}>
      <DataGrid
        rows={leads}
        columns={columns(handleDelete)}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        loading={loading}
        getRowId={(row) => row.id}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />
    </div>
  );
};

export default LeadTable;