import axios from 'axios';

class UserService {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:8000/users/';
    }

    async login(username, password) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const loginData = {
            username,
            password
        };
        try {
            const response = await axios.post(`${this.baseUrl}login/`, JSON.stringify(loginData), config);
            return response.data;
        } catch (error) {
            console.error('Error in UserService login:', error);
            throw error;
        }
    }

    async register(user) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post(`${this.baseUrl}register/`, JSON.stringify(user), config);
            return response.data;
        } catch (error) {
            console.error('Error in UserService register:', error);
            throw error;
        }
    }

    async getUserProfile() {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        try {
            const response = await axios.get(`${this.baseUrl}profile/`, config);
            return response.data;
        } catch (error) {
            console.error('Error in UserService getUserProfile:', error);
            throw error;
        }
    }

    async updateUserProfile(user) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        try {
            const response = await axios.put(`${this.baseUrl}profile/`, JSON.stringify(user), config);
            return response.data;
        } catch (error) {
            console.error('Error in UserService updateUserProfile:', error);
            throw error;
        }
    }
}

export default new UserService();
