import React from 'react';
import { Box, TextField, Button, Typography, IconButton, Paper } from '@mui/material';
import { Controller, useFieldArray } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessIcon from '@mui/icons-material/Business';

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

const Certifications = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications'
  });

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
      }}
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
          Certifications
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
            Add your professional certifications
          </Typography>
        </motion.div>
      </Box>

      <AnimatePresence>
        {fields.map((item, index) => (
          <Paper
            key={item.id}
            sx={{
              p: 3,
              mb: 3,
              border: '1px solid #e0e0e0',
              borderRadius: '15px',
              position: 'relative',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-2px)'
              }
            }}
            component={motion.div}
            variants={itemVariants}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <SchoolIcon sx={{ fontSize: '1.5rem' }} />
                Certification {index + 1}
              </Typography>
              <IconButton
                onClick={() => remove(index)}
                sx={{
                  color: '#f44336',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)'
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Controller
                name={`certifications.${index}.name`}
                control={control}
                defaultValue=""
                rules={{ required: 'Certification name is required' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Certification Name"
                    error={!!error}
                    helperText={error?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1976d2',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#1976d2',
                      },
                    }}
                  />
                )}
              />

              <Controller
                name={`certifications.${index}.provider`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Provider"
                    InputProps={{
                      startAdornment: (
                        <BusinessIcon sx={{ color: '#1976d2', mr: 1 }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1976d2',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#1976d2',
                      },
                    }}
                  />
                )}
              />

              <Controller
                name={`certifications.${index}.date`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Date"
                    type="date"
                    InputProps={{
                      startAdornment: (
                        <CalendarMonthIcon sx={{ color: '#1976d2', mr: 1 }} />
                      ),
                    }}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1976d2',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#1976d2',
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Paper>
        ))}
      </AnimatePresence>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => append({})}
        sx={{
          mt: 2,
          alignSelf: 'flex-start',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(25, 118, 210, 0.04)'
          }
        }}
        component={motion.div}
        variants={itemVariants}
      >
        Add Certification
      </Button>
    </Box>
  );
};

export default Certifications;
