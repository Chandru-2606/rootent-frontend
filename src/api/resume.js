import {apiClient} from './http';

 const getResumes = async () => {
    try {
        const response = await apiClient.get('/resumes/user');
        return response;
    } catch (error) {
        throw error;
    }
};

 const createResume = async (resumeData) => {
    try {
        const response = await apiClient.post('/resumes', resumeData);
        return response;
    } catch (error) {
        console.error('Error creating resume:', error);
        throw error;
    }
};  

const getResumeById = async (resumeId) => {
    try {
        const response = await apiClient.get(`/resumes/by-id/${resumeId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

 const updateResume = async (resumeId, resumeData) => {
    try {
        const response = await apiClient.put(`/resumes/${resumeId}`, resumeData);
        return response.data;
    } catch (error) {
        console.error('Error updating resume:', error);
        throw error;
    }
};

const deleteResume = async (resumeId) => {
    try {
        const response = await apiClient.delete(`/resumes/${resumeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const downloadResume = async (resumeId) => {
    try {
      const response = await apiClient.get(`/resumes/${resumeId}/pdf`, { responseType: 'blob' });
      return response;
    } catch (error) {
      throw error;
    }
  };

export { getResumes, createResume, updateResume, deleteResume, getResumeById, downloadResume };




