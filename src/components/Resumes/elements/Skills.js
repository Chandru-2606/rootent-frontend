import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Paper, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';

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

const ResumeSkillsEditor = ({ control }) => {
  const quillRef = useRef(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
      },
    }),
    []
  );

  return (
    <Box 
      sx={{ p: 3 }}
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
          <CodeIcon />
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
          Skills
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
            List your technical and soft skills
          </Typography>
        </motion.div>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 3,
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
          }
        }}
        component={motion.div}
        variants={itemVariants}
      >
        <Controller
          name="skills"
          control={control}
          defaultValue=""
          rules={{
            required: "Skills are required",
            validate: (value) => {
              const strippedValue = value.replace(/<[^>]*>/g, '').trim();
              return strippedValue.length > 0 || "Please enter at least one skill";
            }
          }}
          render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
            <Box
              sx={{
                '& .ql-toolbar': {
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  backgroundColor: '#f5f5f5',
                },
                '& .ql-container': {
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px',
                  minHeight: '200px',
                  borderColor: error ? 'error.main' : 'rgba(0, 0, 0, 0.23)',
                },
                '& .ql-editor': {
                  minHeight: '200px',
                },
                '& .ql-snow .ql-stroke': {
                  stroke: '#1976d2',
                },
                '& .ql-snow .ql-fill': {
                  fill: '#1976d2',
                },
                '& .ql-snow .ql-picker': {
                  color: '#1976d2',
                },
                '& .ql-snow .ql-picker-options': {
                  backgroundColor: '#fff',
                  border: '1px solid #1976d2',
                },
              }}
            >
              <ReactQuill
                ref={quillRef}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                modules={modules}
                theme="snow"
              />
              {error && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{
                    mt: 1,
                    display: 'block',
                    animation: 'shake 0.5s ease-in-out',
                    '@keyframes shake': {
                      '0%, 100%': { transform: 'translateX(0)' },
                      '25%': { transform: 'translateX(-5px)' },
                      '75%': { transform: 'translateX(5px)' },
                    }
                  }}
                >
                  {error.message}
                </Typography>
              )}
            </Box>
          )}
        />
      </Paper>
    </Box>
  );
};

export default ResumeSkillsEditor;
