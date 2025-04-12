import React, { useEffect, useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Paper, Typography, useTheme } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalDetails from './elements/PersonalDetails';
import ResumeSkillsEditor from './elements/Skills';
import Experience from './elements/Experience';
import Education from './elements/Education';
import Certifications from './elements/Certifications';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { createResume, getResumeById, updateResume } from '../../api/resume';
import { useNavigate, useParams } from 'react-router-dom';
import useCustomSnackbar from '../../Utils/customSnackbar';
import Loader from '../Loader';
const steps = [
  { label: 'Personal Details', icon: <PersonIcon /> },
  { label: 'Skills', icon: <CodeIcon /> },
  { label: 'Experience', icon: <WorkIcon /> },
  { label: 'Education', icon: <SchoolIcon /> },
  { label: 'Certifications', icon: <CardGiftcardIcon /> }
];

const stepFields = [
  [
    'personalDetails.name',
    'personalDetails.email',
    'personalDetails.phone',
    'personalDetails.location',
    'personalDetails.linkedin',
    'personalDetails.github',
    'summary'
  ],
  [
    'skills'
  ],
  "experience",
  "education",
  [
    'certifications.0.name',
    'certifications.0.provider',
    'certifications.0.date'
  ]
];

function CreateResume() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    defaultValues: {
      personalDetails: {
        name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: ''
      },
      summary: '',
      skills: [],
      experience: [
        {
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          project: '',
          present: false
        }
      ],
      education: [
        {
          degree: '',
          institution: '',
          year: '',
          month: ''
        }
      ],
      certifications: [
        {
          name: '',
          provider: '',
          date: ''
        }
      ]
    }
  });
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const snackbar = useCustomSnackbar();

  const fetchResume = async () => {
    setLoading(true);
    try {
      const response = await getResumeById(resumeId);
      const resumeData = response.data;
      
      // Set form values
      methods.reset({
        personalDetails: {
          name: resumeData.personalDetails.name,
          email: resumeData.personalDetails.email,
          phone: resumeData.personalDetails.phone,
          location: resumeData.personalDetails.location,
          linkedin: resumeData.personalDetails.linkedin,
          github: resumeData.personalDetails.github
        },
        summary: resumeData.summary,
        skills: resumeData.skills,
        experience: resumeData.experience.map(exp => ({
          jobTitle: exp.jobTitle,
          company: exp.company,
          location: exp.location,
          startDate: exp.startDate,
          endDate: exp.endDate,
          project: exp.project,
          present: exp.endDate === 'present'
        })),
        education: resumeData.education.map(edu => ({
          degree: edu.degree,
          institution: edu.institution,
          year: edu.year,
          month: edu.month
        })),
        certifications: resumeData.certifications.map(cert => ({
          name: cert.name,
          provider: cert.provider,
          date: cert.date
        }))
      });
    } catch (error) {
      snackbar(error.response?.data?.message || 'Failed to fetch resume', 'Unexpected Error', 'error');
    } finally {
      setTimeout(()=>{
        setLoading(false);
      }, 250)
    }
  };

  useEffect(() => {
    if (resumeId) {
      fetchResume();
    }
  }, [resumeId]);

  const handleNext = async () => {
    const isValid = await methods.trigger(stepFields[activeStep]);
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (resumeId) {
        await updateResume(resumeId, data);
      } else {
        await createResume(data);
      }
      navigate(-1);
    } catch (error) {
      snackbar(error.response?.data?.message || 'Failed to save resume', 'Unexpected Error', 'error');
    } finally {
      setTimeout(()=>{
        setLoading(false);
      }, 250)
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: 'flex',
          maxWidth: '100%',
          margin: '0 auto',
          backgroundColor: '#f5f5f5',
          minHeight: '100vh'
        }}
      >
        <Box
          sx={{
            width: 200,
            backgroundColor: '#212d59',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: '0 0 10px 10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: 0,
            height: '100vh'
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              mb: 4,
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '50px',
                height: '3px',
                backgroundColor: '#fff',
                borderRadius: '2px'
              }
            }}
          >
            Resume Builder
          </Typography>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              '& .MuiStepConnector-line': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
                minHeight: '40px'
              },
              '& .MuiStepIcon-root': {
                color: 'rgba(255, 255, 255, 0.3)',
                '&.Mui-active': {
                  color: '#ffffff'
                },
                '&.Mui-completed': {
                  color: '#ffffff'
                }
              }
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconProps={{
                    icon: step.icon,
                    sx: {
                      color: activeStep === index ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
                      '& .MuiStepIcon-text': {
                        fill: '#212d59'
                      }
                    }
                  }}
                  sx={{
                    '& .MuiStepLabel-label': {
                      color: activeStep === index ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                      fontWeight: activeStep === index ? 'bold' : 'normal',
                      transition: 'all 0.3s ease',
                      fontSize: '1rem',
                      '&.Mui-active': {
                        color: '#fff',
                        fontWeight: 'bold'
                      }
                    }
                  }}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            flexGrow: 1,
            margin: '20px',
            borderRadius: '10px',
            backgroundColor: '#fff',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 40px)'
          }}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <form onSubmit={methods.handleSubmit(onSubmit)} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeStep === 0 && <PersonalDetails control={methods.control} />}
                  {activeStep === 1 && <ResumeSkillsEditor control={methods.control} />}
                  {activeStep === 2 && <Experience control={methods.control} />}
                  {activeStep === 3 && <Education control={methods.control} />}
                  {activeStep === 4 && <Certifications control={methods.control} />}
                </motion.div>
              </AnimatePresence>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 4,
                padding: '20px 0',
                position: 'sticky',
                bottom: 0,
                backgroundColor: '#fff',
                borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                zIndex: 1
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                sx={{
                  minWidth: '120px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(-5px)',
                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                  }
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={
                  activeStep === steps.length - 1
                    ? methods.handleSubmit(onSubmit)
                    : handleNext
                }
                sx={{
                  minWidth: '120px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(5px)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
      <Loader loading={loading} />
    </FormProvider>
  );
}

export default CreateResume;
