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
  
  async getStockByProductId(id_product) {
    if (!id_product) {
      console.warn('getStockByProductId called with undefined id_product');
      return [];
    }
    try {
      const response = await axios.get(`${this.baseUrl}${id_product}/stock/`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn(`No stock found for product ${id_product}`);
        return [{ size: 'N/A', quantity: 'No stock' }];
      }
      console.error('Error in ProductService getStockByProductId:', error);
      throw error;
    }
  }

  async save(product) {
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("type_category", product.type_category.id_type);
    product.categories.forEach((category) =>
      formData.append("categories", category.id_category)
    );
    
    // Agregar las imágenes al FormData
    product.images.forEach((image) => 
      formData.append('images', image)
    );

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const response = await axios.post(this.baseUrl, formData, config);
      return response.data;
    } catch (error) {
      console.error('Error in ProductService save:', error);
      console.error('Error data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
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
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("type_category", product.type_category);
    product.categories.forEach((category) =>
      formData.append("categories", category)
    );
    product.images.forEach((image) => 
      formData.append('images', image)
    );

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const response = await axios.put(`${this.baseUrl}${id_product}/`, formData, config);
      return response.data;
    } catch (error) {
      console.error('Error in ProductService update:', error);
      throw error;
    }
  }

  async getCategoriesForProduct(productId) {
    try {
      const response = await axios.get(`${this.baseUrl}${productId}/categories/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories for product:', error);
      throw error;
    }
  }


  async uploadImages(productId, images) {
    if (!productId) {
      throw new Error('Product ID is required to upload images');
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post(`${this.baseUrl}${productId}/images/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  }

}

export default new ProductService();