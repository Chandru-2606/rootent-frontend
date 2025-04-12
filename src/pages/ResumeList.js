import React, { useEffect, useState } from 'react';
import { downloadResume, getResumes, deleteResume } from '../api/resume';
import useCustomSnackbar from '../Utils/customSnackbar';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Avatar,
  Link,
  Button,
  IconButton,
  Container,
  Stack,
  Fade,
  Grow,
  Zoom,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.divider}`,
  height: '100%',
  width: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8]
  }
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1)
}));

const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  textAlign: 'center',
  minHeight: '60vh',
  background: theme.palette.background.paper,
  borderRadius: '16px',
  marginTop: theme.spacing(4)
}));

const EmptyStateIcon = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  '& svg': {
    fontSize: '60px',
    color: theme.palette.primary.main
  }
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
    transform: 'scale(1.05)',
  },
  transition: 'all 0.3s ease',
  zIndex: 1000,
  boxShadow: theme.shadows[2],
  borderRadius: '8px',
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

const ResumeList = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const snackbar = useCustomSnackbar();

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const response = await getResumes();
      setResumes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setResumes([]);
    } finally {
        setTimeout(()=>{
            setLoading(false);
        }, 250)
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreateNew = () => {
    navigate('/create');
  };

  const handleEdit = (resumeId) => {
    navigate(`/create/${resumeId}`);
  };

  const handleDelete = async (resumeId) => {
    try {
      await deleteResume(resumeId);
      snackbar('Resume deleted successfully',  'success');
      fetchResumes();
    } catch (error) {
      snackbar(error.response?.data?.message || 'Failed to delete resume',  'error');
    }   
  };

  const handleDownload = async (resumeId) => {
    try {
      const response = await downloadResume(resumeId);
      let pdfData;
      if (response.data instanceof Blob) {
        pdfData = response.data;
      } else if (response.data instanceof ArrayBuffer) {
        pdfData = new Blob([response.data], { type: 'application/pdf' });
      } else {
        pdfData = new Blob([response.data], { type: 'application/pdf' });
      }
      const url = window.URL.createObjectURL(pdfData);
      const link = document.createElement('a');
      link.href = url;
      const resumeItem = resumes.find(r => r._id === resumeId);
      const fileName = `${resumeItem.personalDetails.name.replace(/\s+/g, '_')}_resume.pdf`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      snackbar(error.response?.data?.message || 'Failed to download resume', 'Download Error', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Tooltip title="Logout" placement="left">
        <LogoutButton onClick={handleLogout}>
          <LogoutIcon />
          <Typography variant="button">Logout</Typography>
        </LogoutButton>
      </Tooltip>

      <Stack direction="column" alignItems="center" mb={4}>
        <Fade in timeout={800}>
          <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center' }}>
            My Resumes
          </Typography>
        </Fade>
        {Array.isArray(resumes) && resumes.length > 0 && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
            sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' }, mt: 2 }}
          >
            Create New Resume
          </Button>
        )}
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        </Box>
      ) : !Array.isArray(resumes) || resumes.length === 0 ? (
        <EmptyState>
          <Fade in timeout={1000}>
            <Box>
              <EmptyStateIcon>
                <DescriptionIcon />
              </EmptyStateIcon>
              <Typography variant="h4" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                No Resumes Yet
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '500px', margin: '0 auto' }}>
                Start building your professional profile by creating your first resume.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={handleCreateNew}
                sx={{ mt: 3, px: 4, py: 1.5, fontSize: '1.1rem', backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
              >
                Create Your First Resume
              </Button>
            </Box>
          </Fade>
        </EmptyState>
      ) : (
        <Grid container spacing={3}>
          {resumes.map((resume, index) => (
            <Grid item xs={12} md={6} key={resume._id}>
              <Grow in timeout={1000 + index * 200}>
                <StyledCard elevation={3}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
                          {resume.personalDetails.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Zoom in timeout={500}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                              {resume.personalDetails.name}
                            </Typography>
                          </Zoom>
                          <Fade in timeout={800}>
                            <Typography variant="body2" color="text.secondary">
                              {resume.personalDetails.email}
                            </Typography>
                          </Fade>
                          <Fade in timeout={1000}>
                            <Typography variant="body2" color="text.secondary">
                              {resume.personalDetails.phone} | {resume.personalDetails.location}
                            </Typography>
                          </Fade>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            {resume.personalDetails.linkedin && (
                              <Link href={resume.personalDetails.linkedin} target="_blank" rel="noopener noreferrer">
                                <LinkedInIcon color="primary" />
                              </Link>
                            )}
                            {resume.personalDetails.github && (
                              <Link href={resume.personalDetails.github} target="_blank" rel="noopener noreferrer">
                                <GitHubIcon color="primary" />
                              </Link>
                            )}
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <IconButton onClick={() => handleDownload(resume._id)} color="primary">
                          <DownloadIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(resume._id)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(resume._id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ mb: 3 }}>
                      <SectionHeader>
                        <PersonIcon color="primary" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Summary
                        </Typography>
                      </SectionHeader>
                      <Fade in timeout={1400}>
                        <Typography variant="body2" sx={{ pl: 4 }}>
                          {resume.summary}
                        </Typography>
                      </Fade>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <SectionHeader>
                        <CodeIcon color="primary" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Skills
                        </Typography>
                      </SectionHeader>
                      <Box sx={{ pl: 4 }}>
                        <Fade in timeout={1800}>
                          <div dangerouslySetInnerHTML={{ __html: resume.skills }} />
                        </Fade>
                      </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <SectionHeader>
                        <WorkIcon color="primary" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Experience
                        </Typography>
                      </SectionHeader>
                      {resume.experience.map((exp, i) => (
                        exp.jobTitle && (
                          <Grow in timeout={2200 + i * 200} key={exp._id}>
                            <Box sx={{ mb: 2, pl: 4 }}>
                              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                {exp.jobTitle} at {exp.company}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {exp.location}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {exp.startDate} - {exp.endDate === 'present' ? 'Present' : exp.endDate}
                              </Typography>
                              {exp.project && (
                                <Box sx={{ mt: 1 }}>
                                  <div dangerouslySetInnerHTML={{ __html: exp.project }} />
                                </Box>
                              )}
                            </Box>
                          </Grow>
                        )
                      ))}
                    </Box>
                    <Box>
                      <SectionHeader>
                        <SchoolIcon color="primary" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Education
                        </Typography>
                      </SectionHeader>
                      {resume.education.map((edu, i) => (
                        <Grow in timeout={2600 + i * 200} key={edu._id}>
                          <Box sx={{ pl: 4 }}>
                            <Typography variant="body1">
                              {edu.degree}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {edu.institution}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {edu.month} {edu.year}
                            </Typography>
                          </Box>
                        </Grow>
                      ))}
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grow>
            </Grid>
          ))}
        </Grid>
      )}
      <Loader loading={loading} />
    </Container>
  );
};

export default ResumeList;
