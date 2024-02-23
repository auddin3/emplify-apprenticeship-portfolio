export const fetchUserData = async ({ token }) => {
    const apiUrl = 'http://localhost:5001/authenticate';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        return;
      }
  
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };