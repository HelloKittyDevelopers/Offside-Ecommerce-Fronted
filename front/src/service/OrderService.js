import axios from 'axios';

class OrderService {
  constructor() {
    this.baseUrl = 'http://127.0.0.1:8000/home/orders/';
  }

  async getAll() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error in OrderService getAll:', error);
      throw error;
    }
  }

  async getOrderById(id_order) {
    try {
      const response = await axios.get(`${this.baseUrl}${id_order}/`);
      return response.data;
    } catch (error) {
      console.error('Error in OrderService getOrderById:', error);
      throw error;
    }
  }

  async save(order) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log('Saving order:', order); 
    try {
      const response = await axios.post(this.baseUrl, JSON.stringify(order), config);
      return response.data;
    } catch (error) {
      console.error('Error in OrderService save:', error);
      throw error;
    }
  }

  async delete(id_order) {
    try {
      const response = await axios.delete(`${this.baseUrl}${id_order}/`);
      return response.data;
    } catch (error) {
      console.error('Error in OrderService delete:', error);
      throw error;
    }
  }

  async update(id_order, order) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log('Updating order:', order); 
    try {
      const response = await axios.put(`${this.baseUrl}${id_order}/`, JSON.stringify(order), config);
      return response.data;
    } catch (error) {
      console.error('Error in OrderService update:', error);
      throw error;
    }
  }
}

export default new OrderService();
