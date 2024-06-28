import axios from 'axios';

class ProductListingService {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:8000/home/type/';
    }

    async getProductsByType(type, filters = {}) {
        try {
            const { category, minPrice, maxPrice, size } = filters;
            const queryParams = new URLSearchParams();
            if (category) queryParams.append('category', category);
            if (minPrice) queryParams.append('min_price', minPrice);
            if (maxPrice) queryParams.append('max_price', maxPrice);
            if (size) queryParams.append('size', size);

            const response = await axios.get(`${this.baseUrl}${type}/?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error in ProductListingService getProductsByType:', error);
            throw error;
        }
    }
}

export default new ProductListingService();
