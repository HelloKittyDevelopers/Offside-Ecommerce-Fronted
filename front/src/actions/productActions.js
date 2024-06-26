import ProductService from '../service/ProductService'; // Adjust the path as needed
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

// Acción para listar todos los productos
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    
    const data = await ProductService.getAll();
    
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message || 'An error occurred',
    });
  }
};

// Acción para listar los detalles de un producto por ID
export const listProductDetails = (id_product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const data = await ProductService.getProductById(id_product);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listFilteredProducts = (typeName) => async (dispatch) => {
  try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const data = await ProductService.getByType(typeName);

      dispatch({
          type: PRODUCT_LIST_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: error.message || 'An error occurred',
      });
  }
};
