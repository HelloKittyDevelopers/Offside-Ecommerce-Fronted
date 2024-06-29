import axios from 'axios';

class TypeService {
  constructor() {
    this.baseUrl = 'http://127.0.0.1:8000/home/types/';
  }

  async getAll() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error in TypeService getAll:', error);
      throw error;
    }
  }

  async getTypeById(id_type) {
    try {
      const response = await axios.get(`${this.baseUrl}${id_type}/`);
      return response.data;
    } catch (error) {
      console.error('Error in TypeService getTypeById:', error);
      throw error;
    }
  }

  async save(type) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.post(this.baseUrl, JSON.stringify(type), config);
      return response.data;
    } catch (error) {
      console.error('Error in TypeService save:', error);
      throw error;
    }
  }

  async delete(id_type) {
    try {
      const response = await axios.delete(`${this.baseUrl}${id_type}/`);
      return response.data;
    } catch (error) {
      console.error('Error in TypeService delete:', error);
      throw error;
    }
  }

  async update(id_type, type) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.put(`${this.baseUrl}${id_type}/`, JSON.stringify(type), config);
      return response.data;
    } catch (error) {
      console.error('Error in TypeService update:', error);
      throw error;
    }
  }
}

export default new TypeService();