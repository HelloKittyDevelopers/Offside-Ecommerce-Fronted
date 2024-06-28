import axios from 'axios';

class OrderStateService {
  constructor() {
    this.baseUrl = 'http://127.0.0.1:8000/home/order_states/';
  }

  async getAll() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error in OrderStatesService getAll:', error);
      throw error;
    }
  }

  async getOrderStateById(id_order) {
    try {
      const response = await axios.get(`${this.baseUrl}${id_order}/`);
      return response.data;
    } catch (error) {
      console.error('Error in OrderStatesService getOrderById:', error);
      throw error;
    }
  }
}
export default new OrderStateService();
