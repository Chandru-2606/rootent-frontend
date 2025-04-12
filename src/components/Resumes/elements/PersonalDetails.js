import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionIcon from '@mui/icons-material/Description';

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

function PersonalDetails({ control }) {
  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        width: '100%',
        maxWidth: '90%',
        margin: '0 auto',
        padding: '20px'
      }}
    >
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'nowrap',
          width: '100%',
          mb: 4,
          position: 'relative'
        }}
        component={motion.div}
        variants={titleVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <motion.div
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <PersonIcon sx={{ fontSize: '2.5rem', color: '#1976d2' }} />
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
            Personal Details
          </Typography>
        </Box>
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
              fontStyle: 'italic',
              whiteSpace: 'nowrap'
            }}
          >
            Tell us about yourself
          </Typography>
        </motion.div>
      </Box>

      <Box 
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
          width: '100%'
        }}
      >
        <Box component={motion.div} variants={itemVariants}>
          <Controller
            name="personalDetails.name"
            control={control}
            defaultValue=""
            rules={{ required: 'Full name is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Full Name"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  startAdornment: (
                    <PersonIcon sx={{ color: '#1976d2', mr: 1 }} />
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
        </Box>
        
        <Box component={motion.div} variants={itemVariants}>
          <Controller
            name="personalDetails.email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  startAdornment: (
                    <EmailIcon sx={{ color: '#1976d2', mr: 1 }} />
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
        </Box>

        <Box component={motion.div} variants={itemVariants}>
          <Controller
            name="personalDetails.phone"
            control={control}
            defaultValue=""
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid phone number (10 digits required)'
              }
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label="Phone Number"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  startAdornment: (
                    <PhoneIcon sx={{ color: '#1976d2', mr: 1 }} />
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
        </Box>

        <Box component={motion.div} variants={itemVariants}>
          <Controller
            name="personalDetails.location"
            control={control}
            defaultValue=""
            rules={{ required: 'Location is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Location"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  startAdornment: (
                    <LocationOnIcon sx={{ color: '#1976d2', mr: 1 }} />
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
        </Box>

        <Box component={motion.div} variants={itemVariants}>
          <Controller
            name="personalDetails.linkedin"
            control={control}
            defaultValue=""
            rules={{
              required: 'LinkedIn URL is required',
              pattern: {
                value: /^(https?:\/\/)?([\w\d]+\.)?linkedin\.com\/.+/i,
                message: 'Invalid LinkedIn URL'
              }
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="LinkedIn Profile"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  startAdornment: (
                    <LinkedInIcon sx={{ color: '#1976d2', mr: 1 }} />
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
        </Box>

        <Box component={motion.div} variants={itemVariants}>
          <Controller
            name="personalDetails.github"
            control={control}
            defaultValue=""
            rules={{
              required: 'GitHub URL is required',
              pattern: {
                value: /^(https?:\/\/)?([\w\d]+\.)?github\.com\/.+/i,
                message: 'Invalid GitHub URL'
              }
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="GitHub Profile"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  startAdornment: (
                    <GitHubIcon sx={{ color: '#1976d2', mr: 1 }} />
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
        </Box>

        <Box sx={{ gridColumn: '1 / -1' }} component={motion.div} variants={itemVariants}>
          <Controller
            name="summary"
            control={control}
            defaultValue=""
            rules={{ required: 'Professional summary is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label="Professional Summary"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  startAdornment: (
                    <DescriptionIcon sx={{ color: '#1976d2', mr: 1, mt: 1, alignSelf: 'flex-start' }} />
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
        </Box>
      </Box>
    </Box>
  );
}

export default PersonalDetails;
