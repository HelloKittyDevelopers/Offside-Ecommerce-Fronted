import axios from 'axios';

class ProductService {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:8000/home/products/';
    }

    async getAll() {
      try {
          const response = await axios.get(this.baseUrl);
          console.log('ProductService getAll response:', response.data);
          return response.data;
      } catch (error) {
          console.error('Error in ProductService getAll:', error);
          throw error;
      }
    }

    getProductById(id) {
        return axios.get(`${this.baseUrl}${id}/`).then(res => res.data);
    }

    save(product) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return axios.post(this.baseUrl, JSON.stringify(product), config).then(res => res.data);
    }

    delete(id) {
        return axios.delete(`${this.baseUrl}${id}/`).then(res => res.data);
    }

    update(id, product) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return axios.put(`${this.baseUrl}${id}/`, JSON.stringify(product), config).then(res => res.data);
    }
}

export default new ProductService();
