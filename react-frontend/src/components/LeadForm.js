import React from 'react';
import { useFormik } from 'formik';
import { 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Grid, 
  Paper, 
  Typography,
  FormControl,
  InputLabel,
  Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LeadForm = ({ lead, onSubmit }) => {
  const formik = useFormik({
    initialValues: lead || {
      type: 'buyer',
      name: '',
      location: '',
      budget: '',
      price: '',
      propertyType: 'apartment'
    },
    onSubmit: (values, { setSubmitting }) => {
      // Ensure numbers are properly formatted
      const formattedValues = {
        ...values,
        price: values.type === 'seller' ? Number(values.price) : undefined,
        budget: values.type !== 'seller' ? Number(values.budget) : undefined
      };
      
      onSubmit(formattedValues)
        .finally(() => setSubmitting(false));
    }
  });

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" gutterBottom>
          {lead ? 'Edit Lead' : 'Add New Lead'}
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          Back to List
        </Button>
      </Stack>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* ... existing form fields */}
		<Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                label="Type"
              >
                <MenuItem value="buyer">Buyer</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
                <MenuItem value="renter">Renter</MenuItem>
                <MenuItem value="landlord">Landlord</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {formik.values.type === 'seller' ? (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                required
                inputProps={{ min: 0 }}
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Budget"
                name="budget"
                type="number"
                value={formik.values.budget}
                onChange={formik.handleChange}
                required
                inputProps={{ min: 0 }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting}
              >
                {lead ? 'Update Lead' : 'Create Lead'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LeadForm;