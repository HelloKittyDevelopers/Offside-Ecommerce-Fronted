import axios from 'axios';

class SizeService {
  constructor() {
    this.baseUrl = 'http://127.0.0.1:8000/home/sizes/';
  }

  async getAll() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error in SizeService getAll:', error);
      throw error;
    }
  }

  async save(size) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.post(this.baseUrl, JSON.stringify(size), config);
      return response.data;
    } catch (error) {
      console.error('Error in SizeService save:', error);
      throw error;
    }
  }

  async delete(id_size) {
    try {
      const response = await axios.delete(`${this.baseUrl}${id_size}/`);
      return response.data;
    } catch (error) {
      console.error('Error in SizeService delete:', error);
      throw error;
    }
  }
}

export default new SizeService();
