import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Link,
  Alert,
  Fade
} from '@mui/material';
import { registerUser } from '../api/auth';
import useCustomSnackbar from '../Utils/customSnackbar';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();
  const password = watch('password');
  const snackbar = useCustomSnackbar();

  const onSubmit = async (data) => {
    try {
      setError('');
      await registerUser(data);
      snackbar("User Register", "success")
      navigate('/login');
    } catch (err) {
      snackbar(err.response?.data?.message || 'Registration failed. Please try again.',  'error');
    }
  };

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(45deg, #e66465, #9198e5, #a1c4fd, #fbc2eb, #ff9a9e)'
  };

  const formStyles = {
    width: { md: '50%', sm: '65%', xs: '85%', lg: '30%' },
    height: { md: '70vh', sm: '70vh', xs: '65vh', lg: '70vh' },
    background: 'white',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.5s',
    p: 3
  };

  const copyrightStyles = {
    fontSize: '12px',
    fontFamily: 'Poppins, sans-serif',
    marginTop: '16px'
  };

  return (
    <Box sx={containerStyles}>
      <Paper component="form" sx={{ ...formStyles, boxShadow: 3 }} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" component="h2" sx={{ p: 1, fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
          Create an Account
        </Typography>
        <Fade in timeout={500}>
          <Box sx={{ 
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2, width: '90%' }}>
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Name"
              {...register('name', {
                required: 'Name is required'
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              required
              sx={{
                width: '90%',
                marginBottom: '16px',
                height: '50px',
                fontFamily: 'Poppins, sans-serif'
              }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email is invalid'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              required
              sx={{
                width: '90%',
                marginBottom: '16px',
                height: '50px',
                fontFamily: 'Poppins, sans-serif'
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              required
              sx={{
                width: '90%',
                marginBottom: '16px',
                height: '50px',
                fontFamily: 'Poppins, sans-serif'
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match'
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              required
              sx={{
                width: '90%',
                marginBottom: '16px',
                height: '50px',
                fontFamily: 'Poppins, sans-serif'
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isSubmitting}
              sx={{
                width: '90%',
                height: '50px',
                fontFamily: 'Poppins, sans-serif',
                backgroundColor: '#8c57ff',
                marginBottom: '16px',
                '&:hover': {
                  backgroundColor: '#8c57ff'
                }
              }}
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </Button>
            <Link 
              component="button" 
              variant="body2"
              onClick={() => navigate('/login')}
              sx={{ 
                color: '#1976d2',
                textAlign: 'center',
                width: '100%'
              }}
            >
              Already have an account? Login
            </Link>
          </Box>
        </Fade>
      </Paper>
    </Box>
  );
}

export default Signup;
