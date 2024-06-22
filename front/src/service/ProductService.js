import axios from 'axios';

class ProductService {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:8000/home/products/';
    }

    async getAll() {
      try {
          const response = await axios.get(this.baseUrl);
          return response.data;
      } catch (error) {
          console.error('Error in ProductService getAll:', error);
          throw error;
      }
    }

    async getProductById(id_product) {
        return axios.get(`${this.baseUrl}${id_product}/`).then(res => res.data);
    }
    async getProductReviews(id_product) {
        try {
            const response = await axios.get(`${this.baseUrl}${id_product}/`);
            return response.data;
        } catch (error) {
            console.error(`Error in ProductService getProductReviews(${id_product}):`, error);
            throw error;
        }
    }
    async getProductReviewAverage(id_product) {
        try {
            const response = await axios.get(`${this.baseUrl}${id_product}/`);
            return response.data;
        } catch (error) {
            console.error(`Error in ProductService getProductReviewAverage(${id_product}):`, error);
            throw error;
        }
    }
    save(product) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return axios.post(this.baseUrl, JSON.stringify(product), config).then(res => res.data);
    }

    delete(id_product) {
        return axios.delete(`${this.baseUrl}${id_product}/`).then(res => res.data);
    }

    update(id_product, product) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return axios.put(`${this.baseUrl}${id_product}/`, JSON.stringify(product), config).then(res => res.data);
    }
}

export default new ProductService();
