const API_BASE_URL = 'http://localhost:5001/api';

export const testHealthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('API health check failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error testing API:', error);
    throw error;
  }
};
