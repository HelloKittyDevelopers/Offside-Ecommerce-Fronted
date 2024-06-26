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
        try {
            const response = await axios.get(`${this.baseUrl}${id_product}/`);
            return response.data;
        } catch (error) {
            console.error('Error in ProductService getProductById:', error);
            throw error;
        }
    }

    async save(product) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post(this.baseUrl, JSON.stringify(product), config);
            return response.data;
        } catch (error) {
            console.error('Error in ProductService save:', error);
            throw error;
        }
    }

    async delete(id_product) {
        try {
            const response = await axios.delete(`${this.baseUrl}${id_product}/`);
            return response.data;
        } catch (error) {
            console.error('Error in ProductService delete:', error);
            throw error;
        }
    }

    async update(id_product, product) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.put(`${this.baseUrl}${id_product}/`, JSON.stringify(product), config);
            return response.data;
        } catch (error) {
            console.error('Error in ProductService update:', error);
            throw error;
        }
    }

    async getByType(type) {
        try {
            const response = await axios.get(`${this.baseUrl}by_type/${type}/`);
            return response.data;
        } catch (error) {
            console.error('Error in ProductService getByType:', error);
            throw error;
        }
    }
}

export default new ProductService();
