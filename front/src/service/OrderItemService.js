import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/home/order_item/';

class OrderItemService {
  async getAll() {
    try {
      const response = await axios.get(API_URL);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error in OrderItemService getAll:', error.message);
      throw error;
    }
  }

  async getOrderItemById(id_order_item) {
    try {
      const response = await axios.get(`${API_URL}${id_order_item}/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error in OrderItemService getOrderItemById(${id_order_item}):`, error.message);
      throw error;
    }
  }

  async getOrderItemsByOrderId(id_order) {
    try {
      const response = await axios.get(`${API_URL}?order_id=${id_order}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error in OrderItemService getOrderItemsByOrderId(${id_order}):`, error.message);
      throw error;
    }
  }
}

export default new OrderItemService();
