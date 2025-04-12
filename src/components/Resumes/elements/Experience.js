import React, { useMemo, useEffect } from 'react';
import { Box, TextField, Typography, Paper, Checkbox, FormControlLabel, IconButton, Button } from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
};

const titleVariants = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

const Experience = ({ control }) => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
    rules: {
      minLength: {
        value: 1,
        message: "At least one experience entry is required"
      }
    }
  });

  useEffect(() => {
    const exp = watch('experience');
    if (!Array.isArray(exp) || exp.length === 0) {
      append({
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        project: '',
        present: false
      });
    }
  }, [append, watch]);

  const handleRemove = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
      ]
    }
  }), []);

  return (
    <Box display="flex" flexDirection="column" gap={2} component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
          position: 'relative',
          '& svg': { fontSize: '2.5rem', color: '#1976d2' }
        }}
        component={motion.div}
        variants={titleVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.3 }}>
          <WorkIcon />
        </motion.div>
        <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', position: 'relative', '&::after': { content: '""', position: 'absolute', bottom: -5, left: 0, width: '60px', height: '4px', backgroundColor: '#1976d2', borderRadius: '2px', transition: 'width 0.3s ease' } }}>
          Experience
        </Typography>
      </Box>

      {errors.experience && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {errors.experience.message}
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <AnimatePresence mode="wait">
          {fields.map((item, index) => {
            const presentValue = watch(`experience.${index}.present`, false);
            return (
              <Paper key={item.id} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '10px', position: 'relative', mb: 2, transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', transform: 'translateY(-2px)' } }} component={motion.div} variants={itemVariants}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', position: 'relative', '&::after': { content: '""', position: 'absolute', bottom: -5, left: 0, width: '50px', height: '3px', backgroundColor: '#1976d2', borderRadius: '2px' } }}>
                    Experience {index + 1}
                  </Typography>
                  <IconButton onClick={() => handleRemove(index)} disabled={fields.length === 1} sx={{ color: fields.length === 1 ? 'rgba(0, 0, 0, 0.26)' : '#f44336', transition: 'all 0.3s ease', '&:hover': { transform: fields.length === 1 ? 'none' : 'scale(1.1)', backgroundColor: fields.length === 1 ? 'transparent' : 'rgba(244, 67, 54, 0.1)' } }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Controller
                    name={`experience.${index}.jobTitle`}
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Job title is required",
                      minLength: {
                        value: 2,
                        message: "Job title must be at least 2 characters"
                      }
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField {...field} fullWidth label="Job Title" error={!!error} helperText={error?.message} InputProps={{ startAdornment: <WorkIcon sx={{ color: '#1976d2', mr: 1 }} /> }} />
                    )}
                  />
                  <Controller
                    name={`experience.${index}.company`}
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Company name is required",
                      minLength: {
                        value: 2,
                        message: "Company name must be at least 2 characters"
                      }
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField {...field} fullWidth label="Company" error={!!error} helperText={error?.message} InputProps={{ startAdornment: <BusinessIcon sx={{ color: '#1976d2', mr: 1 }} /> }} />
                    )}
                  />
                  <Controller
                    name={`experience.${index}.location`}
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Location is required",
                      minLength: {
                        value: 2,
                        message: "Location must be at least 2 characters"
                      }
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField {...field} fullWidth label="Location" error={!!error} helperText={error?.message} InputProps={{ startAdornment: <LocationOnIcon sx={{ color: '#1976d2', mr: 1 }} /> }} />
                    )}
                  />
                  <Box display="flex" gap={2}>
                    <Controller
                      name={`experience.${index}.startDate`}
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Start date is required",
                        validate: (value) => {
                          if (!value) return true;
                          const date = new Date(value);
                          return !isNaN(date.getTime()) || "Please enter a valid date";
                        }
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField {...field} fullWidth type="date" label="Start Date" error={!!error} helperText={error?.message} InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <CalendarMonthIcon sx={{ color: '#1976d2', mr: 1 }} /> }} />
                      )}
                    />
                    <Controller
                      name={`experience.${index}.endDate`}
                      control={control}
                      defaultValue=""
                      rules={{
                        required: () => {
                          const present = watch(`experience.${index}.present`);
                          return !present || "End date is required if not present";
                        },
                        validate: (value) => {
                          const startDate = watch(`experience.${index}.startDate`);
                          const present = watch(`experience.${index}.present`);
                          if (present) return true;
                          if (!value || !startDate) return true;
                          return new Date(value) >= new Date(startDate) || "End date must be after start date";
                        }
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField {...field} fullWidth type="date" label="End Date" disabled={presentValue} error={!!error} helperText={error?.message} InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: <CalendarMonthIcon sx={{ color: '#1976d2', mr: 1 }} /> }} />
                      )}
                    />
                  </Box>
                  <Controller
                    name={`experience.${index}.present`}
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.checked);
                              setValue(`experience.${index}.endDate`, e.target.checked ? 'present' : '');
                            }}
                          />
                        }
                        label="Present"
                      />
                    )}
                  />
                  <Controller
                    name={`experience.${index}.project`}
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Project details are required",
                      validate: (value) => {
                        const strippedValue = value.replace(/<[^>]*>/g, '').trim();
                        return strippedValue.length > 0 || "Please add project details";
                      }
                    }}
                    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                      <Box>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                          Project Details
                        </Typography>
                        <Box sx={{ '& .ql-toolbar': { borderTopLeftRadius: '8px', borderTopRightRadius: '8px', backgroundColor: '#f5f5f5' }, '& .ql-container': { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', minHeight: '200px', borderColor: error ? 'error.main' : 'rgba(0, 0, 0, 0.23)' }, '& .ql-editor': { minHeight: '200px' } }}>
                          <ReactQuill value={value} onChange={onChange} onBlur={onBlur} modules={quillModules} theme="snow" />
                          {error && (
                            <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block', animation: 'shake 0.5s ease-in-out', '@keyframes shake': { '0%, 100%': { transform: 'translateX(0)' }, '25%': { transform: 'translateX(-5px)' }, '75%': { transform: 'translateX(5px)' } } }}>
                              {error.message}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )}
                  />
                </Box>
              </Paper>
            );
          })}
        </AnimatePresence>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={() =>
          append({
            jobTitle: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            project: '',
            present: false
          })
        }>
          Add Experience
        </Button>
      </Box>
    </Box>
  );
};

export default Experience;
