import React, { useEffect } from 'react';
import { Box, TextField, Button, Typography, IconButton, Paper, MenuItem } from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

const titleVariants = {
  initial: { 
    opacity: 0,
    y: -20,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2
    }
  }
};

const Education = ({ control }) => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
    rules: {
      minLength: {
        value: 1,
        message: "At least one education entry is required"
      }
    }
  });

  // Generate a list of years from 1970 to current year + 5
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 1990; i <= currentYear + 5; i++) {
    years.push(i);
  }

  // Define months array
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    // Only append if there are no fields and the form is not already initialized
    if (fields.length === 0 && !watch('education')) {
      append({});
    }
  }, [fields.length, append, watch]);

  const handleRemove = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      gap={2}
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
          position: 'relative',
          '& svg': {
            fontSize: '2.5rem',
            color: '#1976d2'
          }
        }}
        component={motion.div}
        variants={titleVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div
          whileHover={{ rotate: 10 }}
          transition={{ duration: 0.3 }}
        >
          <SchoolIcon />
        </motion.div>
        <Typography
          variant="h4"
          sx={{
            color: '#1976d2',
            fontWeight: 'bold',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -5,
              left: 0,
              width: '60px',
              height: '4px',
              backgroundColor: '#1976d2',
              borderRadius: '2px',
              transition: 'width 0.3s ease'
            },
            '&:hover::after': {
              width: '100%'
            }
          }}
        >
          Education
        </Typography>
        <motion.div
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)'
          }}
          animate={{
            x: [0, 5, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#666',
              fontStyle: 'italic'
            }}
          >
            Add your educational background
          </Typography>
        </motion.div>
      </Box>

      {errors.education && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {errors.education.message}
        </Typography>
      )}

      <AnimatePresence>
        {fields.map((item, index) => (
          <Paper
            key={item.id}
            sx={{ 
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              position: 'relative',
              marginBottom: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-2px)'
              }
            }}
            component={motion.div}
            variants={itemVariants}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography 
                variant="h6"
                sx={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -5,
                    left: 0,
                    width: '50px',
                    height: '3px',
                    backgroundColor: '#1976d2',
                    borderRadius: '2px'
                  }
                }}
              >
                Education {index + 1}
              </Typography>
              <IconButton 
                onClick={() => handleRemove(index)}
                disabled={fields.length === 1}
                sx={{
                  color: fields.length === 1 ? 'rgba(0, 0, 0, 0.26)' : '#f44336',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: fields.length === 1 ? 'none' : 'scale(1.1)',
                    backgroundColor: fields.length === 1 ? 'transparent' : 'rgba(244, 67, 54, 0.1)'
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
              <Controller
                name={`education.${index}.degree`}
                control={control}
                defaultValue=""
                rules={{ 
                  required: "Degree is required",
                  minLength: {
                    value: 2,
                    message: "Degree must be at least 2 characters"
                  }
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Degree"
                    error={!!error}
                    helperText={error?.message}
                    InputProps={{
                      startAdornment: (
                        <SchoolIcon sx={{ color: '#1976d2', mr: 1 }} />
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name={`education.${index}.institution`}
                control={control}
                defaultValue=""
                rules={{ 
                  required: "Institution is required",
                  minLength: {
                    value: 2,
                    message: "Institution name must be at least 2 characters"
                  }
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Institution"
                    error={!!error}
                    helperText={error?.message}
                    InputProps={{
                      startAdornment: (
                        <BusinessIcon sx={{ color: '#1976d2', mr: 1 }} />
                      ),
                    }}
                  />
                )}
              />
              <Box display="flex" gap={2}>
                <Controller
                  name={`education.${index}.year`}
                  control={control}
                  defaultValue=""
                  rules={{ 
                    required: "Year is required",
                    validate: (value) => {
                      const currentYear = new Date().getFullYear();
                      const year = parseInt(value);
                      return (year >= 1990 && year <= currentYear + 5) || "Please select a valid year";
                    }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="Year"
                      error={!!error}
                      helperText={error?.message}
                      InputProps={{
                        startAdornment: (
                          <CalendarMonthIcon sx={{ color: '#1976d2', mr: 1 }} />
                        ),
                      }}
                    >
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name={`education.${index}.month`}
                  control={control}
                  defaultValue=""
                  rules={{ 
                    required: "Month is required",
                    validate: (value) => {
                      const months = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];
                      return months.includes(value) || "Please select a valid month";
                    }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="Month"
                      error={!!error}
                      helperText={error?.message}
                      InputProps={{
                        startAdornment: (
                          <CalendarMonthIcon sx={{ color: '#1976d2', mr: 1 }} />
                        ),
                      }}
                    >
                      {months.map((month) => (
                        <MenuItem key={month} value={month}>
                          {month}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Box>
          </Paper>
        ))}
      </AnimatePresence>
      <Button 
        variant="outlined" 
        startIcon={<AddIcon />} 
        onClick={() => append({})}
        sx={{
          alignSelf: 'flex-start',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }
        }}
        component={motion.div}
        variants={itemVariants}
      >
        Add Education
      </Button>
    </Box>
  );
};

export default Education;
