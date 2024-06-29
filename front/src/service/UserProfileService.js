const API_BASE_URL = 'http://localhost:8000/home/users';

const UserProfileService = {
  getAllUsers: async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  },

  updateUserStatus: async (userId, isActive) => {
    const response = await fetch(`${API_BASE_URL}/${userId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_active: isActive }),
    });
    if (!response.ok) {
      throw new Error('Failed to update user status');
    }
    return await response.json();
  },


};

export default UserProfileService;
