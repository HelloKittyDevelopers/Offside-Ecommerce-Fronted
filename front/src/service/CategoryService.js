import axios from 'axios';

class CategoryService {
  constructor() {
    this.baseUrl = 'http://127.0.0.1:8000/home/categories/';
  }

  async getAll() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error in CategoryService getAll:', error);
      throw error;
    }
  }

  async getCategoryById(id_category) {
    if (!id_category) {
      console.warn('getCategoryById called with undefined id_category');
      return null;
    }
    try {
      const response = await axios.get(`${this.baseUrl}${id_category}/`);
      return response.data;
    } catch (error) {
      console.error('Error in CategoryService getCategoryById:', error);
      throw error;
    }
  }

  async save(category) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.post(this.baseUrl, JSON.stringify(category), config);
      return response.data;
    } catch (error) {
      console.error('Error in CategoryService save:', error);
      throw error;
    }
  }

  async delete(id_category) {
    try {
      const response = await axios.delete(`${this.baseUrl}${id_category}/`);
      return response.data;
    } catch (error) {
      console.error('Error in CategoryService delete:', error);
      throw error;
    }
  }

  async update(id_category, category) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.put(`${this.baseUrl}${id_category}/`, JSON.stringify(category), config);
      return response.data;
    } catch (error) {
      console.error('Error in CategoryService update:', error);
      throw error;
    }
  }
}

export default new CategoryService();